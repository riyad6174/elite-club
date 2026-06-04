"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-surface-container-high/40 border border-outline-variant/20 rounded-sm flex items-center justify-center">
      <span className="text-white/40 text-xs font-headline uppercase tracking-widest">
        LOADING EDITOR...
      </span>
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start writing your story...",
      height: 450,
      theme: "dark",
      toolbarAdaptive: false,
      toolbarSticky: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      // Register the custom "Reset Format" control before listing it in buttons
      controls: {
        resetFormat: {
          tooltip: "Reset Format",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5v3.5L10.5 12 6 15.5V19h12v-3.5L13.5 12 18 8.5V5H6zm10 9.08V17H8v-2.92l4-3.08 4 3.08zM8 6.92V7h8v-.08L12 10 8 6.92z"/></svg>`,
          exec(editor: any) {
            // Select all if nothing is selected so the whole block resets
            if (editor.selection.isCollapsed()) {
              editor.execCommand("selectall");
            }
            editor.execCommand("removeFormat");
            // Strip leftover inline style attributes on every element in the selection
            const fragment = editor.selection.current();
            if (fragment) {
              (fragment as HTMLElement).querySelectorAll?.("[style]").forEach((el: Element) => {
                (el as HTMLElement).removeAttribute("style");
              });
            }
          },
        },
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "resetFormat",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "|",
        "lineHeight",
        "|",
        "superscript",
        "subscript",
        "|",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "image",
        "|",
        "hr",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "source",
        "fullsize",
      ],
      image: {
        openOnDblClick: true,
        editSrc: true,
        useImageEditor: false,
        editTitle: true,
        editAlt: true,
        editLink: true,
        editSize: true,
        editBorderRadius: true,
        editMargins: true,
        editStyle: true,
        editClass: false,
        editId: false,
        openInNewTabCheckbox: true,
      },
      uploader: {
        insertImageAsBase64URI: false,
        url: "none",
        isSuccess: () => false,
      },
      style: {
        background: "rgb(30, 30, 30)",
        color: "#e0e0e0",
      },
      editorStyle: {
        background: "rgb(30, 30, 30)",
        color: "#e0e0e0",
        fontSize: "14px",
        lineHeight: "1.7",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      },
    }),
    [placeholder]
  );

  return (
    <div className="rich-text-editor-wrapper">
      <JoditEditor
        ref={editorRef}
        value={value}
        config={config}
        onBlur={(newContent: string) => onChange(newContent)}
      />

      <style jsx global>{`
        .rich-text-editor-wrapper .jodit-container {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 2px !important;
          overflow: hidden;
        }
        .rich-text-editor-wrapper .jodit-toolbar__box {
          background: rgb(25, 25, 25) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .rich-text-editor-wrapper .jodit-toolbar-button__button {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .rich-text-editor-wrapper .jodit-toolbar-button__button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }
        .rich-text-editor-wrapper .jodit-toolbar-button__trigger {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .rich-text-editor-wrapper .jodit-toolbar__box:after {
          display: none !important;
        }
        .rich-text-editor-wrapper .jodit-status-bar {
          background: rgb(25, 25, 25) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.4) !important;
        }
        .rich-text-editor-wrapper .jodit-workplace {
          background: rgb(30, 30, 30) !important;
        }
        .rich-text-editor-wrapper .jodit-wysiwyg {
          background: rgb(30, 30, 30) !important;
          color: #e0e0e0 !important;
          padding: 16px !important;
        }
        .rich-text-editor-wrapper .jodit-wysiwyg h1,
        .rich-text-editor-wrapper .jodit-wysiwyg h2,
        .rich-text-editor-wrapper .jodit-wysiwyg h3,
        .rich-text-editor-wrapper .jodit-wysiwyg h4 {
          color: white !important;
          margin-bottom: 0.5em !important;
        }
        .rich-text-editor-wrapper .jodit-wysiwyg a {
          color: #4fc3f7 !important;
        }
        .rich-text-editor-wrapper .jodit-wysiwyg blockquote {
          border-left: 3px solid rgba(255, 255, 255, 0.2) !important;
          padding-left: 12px !important;
          color: rgba(255, 255, 255, 0.6) !important;
          font-style: italic !important;
        }
        .rich-text-editor-wrapper .jodit-popup {
          background: rgb(40, 40, 40) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .rich-text-editor-wrapper .jodit-popup__content {
          background: rgb(40, 40, 40) !important;
        }
        .rich-text-editor-wrapper .jodit-ui-input__wrapper {
          background: rgb(50, 50, 50) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
        .rich-text-editor-wrapper .jodit-ui-input__input {
          color: white !important;
        }
        .rich-text-editor-wrapper .jodit-dialog__panel {
          background: rgb(35, 35, 35) !important;
        }
        .rich-text-editor-wrapper .jodit-dialog__header {
          background: rgb(30, 30, 30) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .rich-text-editor-wrapper .jodit-dialog__header-title {
          color: white !important;
        }
      `}</style>
    </div>
  );
}
