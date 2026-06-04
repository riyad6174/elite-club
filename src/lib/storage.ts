import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const r2Endpoint = process.env.R2_ENDPOINT;
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const r2BucketName = process.env.R2_BUCKET_NAME;
const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

export function isR2Configured(): boolean {
  return !!(r2Endpoint && r2AccessKeyId && r2SecretAccessKey && r2BucketName && r2PublicUrl);
}

let s3Client: S3Client | null = null;
if (isR2Configured()) {
  s3Client = new S3Client({
    region: "auto",
    endpoint: r2Endpoint,
    credentials: {
      accessKeyId: r2AccessKeyId!,
      secretAccessKey: r2SecretAccessKey!,
    },
  });
}

/**
 * Deletes a file from R2 or local storage based on its public URL.
 */
export async function deleteFile(fileUrl: string): Promise<void> {
  const key = fileUrl.split("/").pop();
  if (!key) throw new Error("Could not extract file key from URL");

  const cleanPublicUrl = r2PublicUrl?.endsWith("/") ? r2PublicUrl.slice(0, -1) : r2PublicUrl;

  if (s3Client && r2BucketName && cleanPublicUrl && fileUrl.startsWith(cleanPublicUrl)) {
    await s3Client.send(new DeleteObjectCommand({ Bucket: r2BucketName, Key: key }));
  } else if (fileUrl.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", "uploads", key);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

/**
 * Uploads a file (Buffer) to R2 or Local Storage depending on configuration.
 * Returns the public URL of the uploaded asset.
 */
export async function uploadFile(
  fileBuffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const fileExt = path.extname(filename);
  const baseName = path.basename(filename, fileExt).replace(/[^a-zA-Z0-9]/g, "-");
  const uniqueFilename = `${baseName}-${Date.now()}${fileExt}`;

  if (s3Client && r2BucketName && r2PublicUrl) {
    try {
      const command = new PutObjectCommand({
        Bucket: r2BucketName,
        Key: uniqueFilename,
        Body: fileBuffer,
        ContentType: contentType,
      });

      await s3Client.send(command);

      const cleanPublicUrl = r2PublicUrl.endsWith("/") ? r2PublicUrl.slice(0, -1) : r2PublicUrl;
      return `${cleanPublicUrl}/${uniqueFilename}`;
    } catch (error) {
      console.error("Error uploading to Cloudflare R2, falling back to local storage:", error);
      // Fall through to local storage if R2 fails
    }
  }

  // Local storage fallback
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFilename);
    await fs.promises.writeFile(filePath, fileBuffer);
    return `/uploads/${uniqueFilename}`;
  } catch (error) {
    console.error("Error saving file locally:", error);
    throw new Error("Failed to upload/save file.");
  }
}
