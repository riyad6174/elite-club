import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BoardOfDirectors from "@/components/home/BoardOfDirectors";

const teamImages = [
  { src: "/assets/team-images/FRR00778.jpg", alt: "Team match action", span: "md:col-span-7", height: "h-[420px] md:h-[600px]" },
  { src: "/assets/team-images/FRR00782.jpg", alt: "Players in action", span: "md:col-span-5", height: "h-[300px] md:h-[420px]" },
  { src: "/assets/team-images/elite-winter-2026-1.png", alt: "Elite Winter 2026", span: "md:col-span-5", height: "h-[300px] md:h-[420px]" },
  { src: "/assets/team-images/ELITE-WINTER-20262-1536x864.png", alt: "Winter tournament", span: "md:col-span-7", height: "h-[300px] md:h-[450px]" },
  { src: "/assets/team-images/FRR00783.jpg", alt: "Team celebration", span: "md:col-span-6", height: "h-[300px] md:h-[400px]" },
  { src: "/assets/team-images/FRR00795.jpg", alt: "Match day", span: "md:col-span-6", height: "h-[300px] md:h-[400px]" },
  { src: "/assets/team-images/elite-winter-2026-2.png", alt: "Elite Winter squad", span: "md:col-span-7", height: "h-[300px] md:h-[420px]" },
  { src: "/assets/team-images/ELITE-WINTER-20264-1536x864.png", alt: "Winter cup action", span: "md:col-span-5", height: "h-[300px] md:h-[380px]" },
];

const teamLogos = [
  { src: "/assets/teams/LION.png", alt: "Lions" },
  { src: "/assets/teams/WARRIORS.png", alt: "Warriors" },
  { src: "/assets/teams/THUNDRS.png", alt: "Thunders" },
  { src: "/assets/teams/gladitors.png", alt: "Gladiators" },
  { src: "/assets/teams/chagers.png", alt: "Chargers" },
  { src: "/assets/teams/knigt.png", alt: "Knights" },
];

const members = [
  { id: "2023-002", name: "Muhammad Khaza Ahmed", img: "/assets/members/2023-002_ Muhammad Khaza Ahmed.png" },
  { id: "2023-003", name: "Md Mizanur Rahman", img: "/assets/members/2023-003_Md Mizanur Rahman.jpg" },
  { id: "2023-004", name: "Golam Kabir", img: "/assets/members/2023-004_Golam Kabir.jpg" },
  { id: "2023-005", name: "Syed Mahedi Hasan", img: "/assets/members/2023-005_Syed Mahedi Hasan.jpg" },
  { id: "2023-006", name: "Moinul Haque Opu", img: "/assets/members/2023-006_Moinul Haque Opu.jpeg" },
  { id: "2023-007", name: "Obaidul Haque Ripon", img: "/assets/members/2023-007_Obaidul Haque Ripon.jpg" },
  { id: "2023-008", name: "KBM Ismail Noor", img: "/assets/members/2023-008_KBM Ismail Noor.jpeg" },
  { id: "2023-009", name: "Ruhul Amin", img: "/assets/members/2023-009_Ruhul Amin.jpg" },
  { id: "2023-010", name: "Koyes Noman Saki", img: "/assets/members/2023-010_Koyes Noman Saki.jpeg" },
  { id: "2023-011", name: "Ashraful Islam Leepu", img: "/assets/members/2023-011_Ashraful Islam Leepu.jpeg" },
  { id: "2023-012", name: "Hamzah Shaikh", img: "/assets/members/2023-012_Hamzah Shaikh.jpeg" },
  { id: "2023-013", name: "Rayhan Tohur", img: "/assets/members/2023-013_Rayhan Tohur.jpeg" },
  { id: "2023-014", name: "AFM Mehadi Hasan", img: "/assets/members/2023-014_AFM Mehadi Hasan.jpg" },
  { id: "2023-015", name: "Kazi Zahid Ahmed", img: "/assets/members/2023-015_KazI Zahid Ahmed.jpg" },
  { id: "2023-017", name: "Jianxin Zhu Alvin", img: "/assets/members/2023-017_Jianxin Zhu Alvin.JPG" },
  { id: "2023-018", name: "Shahin Kamal", img: "/assets/members/2023-018_Shahin Kamal.jpg" },
  { id: "2023-019", name: "Olufemi", img: "/assets/members/2023-019_Olufemi.jpeg" },
  { id: "2023-022", name: "AKM Shiful Islam Polash", img: "/assets/members/2023-022_AKM Shiful Islam Polash.jpg" },
  { id: "2023-024", name: "Syed M Reza Ispahani", img: "/assets/members/2023-024_Syed M Reza Ispahani.jpg" },
  { id: "2023-025", name: "Shah Erfan Reza", img: "/assets/members/2023-025_Shah Erfan Reza.jpg" },
  { id: "2023-026", name: "Yousuf Iftekhar", img: "/assets/members/2023-026_Yousuf Iftekhar.jpg" },
  { id: "2023-027", name: "Syed Mohammad Kazem", img: "/assets/members/2023-027_Syed Mohammad Kazem.jpg" },
  { id: "2023-029", name: "Sameem Arefin", img: "/assets/members/2023-029_Sameem Arefin.jpg" },
  { id: "2023-033", name: "Mohammad Mahmud Hasan", img: "/assets/members/2023-033_Mohammad Mahmud Hasan.jpg" },
  { id: "2023-034", name: "Jewel Obaidul", img: "/assets/members/2023-034_Jewel Obaidul.jpeg" },
  { id: "2023-035", name: "Jobayed Hasan", img: "/assets/members/2023-035_Jobayed Hasan.jpeg" },
  { id: "2023-041", name: "Md Adnan Adib", img: "/assets/members/2023-041_Md Adnan Adib.jpg" },
  { id: "2023-051", name: "Nafis Ahmed", img: "/assets/members/2023-051_Nafis Ahmed.jpeg" },
  { id: "2023-055", name: "Arafin Islam Jony", img: "/assets/members/2023-055_Arafin Islam Jony.jpg" },
];

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Page Header */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-4">SQUAD ROSTER</span>
            <h1 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">
              THE ELITE<br />
              <span className="kinetic-text">TEAMS</span>
            </h1>
          </div>
        </section>

        {/* Team Action Images */}
        <section className="pb-24 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {teamImages.map((img, index) => (
                <div
                  key={index}
                  className={`${img.span} relative group overflow-hidden ${index % 2 === 1 ? "md:-translate-y-10" : ""}`}
                >
                  <div className={`relative ${img.height} overflow-hidden clip-slant`}>
                    <img
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      src={img.src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <BoardOfDirectors />

        {/* Team Logos */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-12">
              <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">OUR SQUADS</span>
              <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">TEAM LOGOS</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
              {teamLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 md:p-8 bg-surface-container/40 hover:bg-surface-container transition-colors duration-300 group gap-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full max-w-[120px] h-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="text-white/50 group-hover:text-white font-headline font-bold text-[10px] uppercase tracking-widest text-center transition-colors">
                    {logo.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-12">
              <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">CLUB ROSTER</span>
              <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">OUR MEMBERS</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {members.map((member) => (
                <div key={member.id} className="group relative overflow-hidden bg-surface-container-highest/40 hover:bg-surface-container-highest transition-colors duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-3 border-t border-outline-variant/10">
                    <p className="text-white font-headline font-bold text-xs uppercase tracking-tight leading-tight">
                      {member.name}
                    </p>
                    <p className="text-tertiary text-[10px] font-bold tracking-widest mt-0.5">
                      {member.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
