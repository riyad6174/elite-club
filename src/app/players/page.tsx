import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Players from "@/components/home/Players";

const allMembers = [
  { name: "MOHAMMAD ZAKIRUL HASAN",     id: "2023-001", sport: "SOCCER", status: "ACTIVE" },
  { name: "MUHAMMAD KHAZA AHMED",        id: "2023-002", sport: "SOCCER", status: "ACTIVE" },
  { name: "MD MIZANUR RAHMAN",           id: "2023-003", sport: "SOCCER", status: "ACTIVE" },
  { name: "GOLAM KABIR",                 id: "2023-004", sport: "SOCCER", status: "ACTIVE" },
  { name: "SYED MAHEDI HASAN",           id: "2023-005", sport: "SOCCER", status: "ACTIVE" },
  { name: "MOINUL HAQUE OPU",            id: "2023-006", sport: "SOCCER", status: "ACTIVE" },
  { name: "OBAIDUL HAQUE RIPON",         id: "2023-007", sport: "SOCCER", status: "ACTIVE" },
  { name: "KBM ISMAIL NOOR",             id: "2023-008", sport: "SOCCER", status: "ACTIVE" },
  { name: "RUHUL AMIN",                  id: "2023-009", sport: "SOCCER", status: "ACTIVE" },
  { name: "KOYES NOMAN SAKI",            id: "2023-010", sport: "SOCCER", status: "ACTIVE" },
  { name: "ASHRAFUL ISLAM LEEPU",        id: "2023-011", sport: "SOCCER", status: "ACTIVE" },
  { name: "HAMZAH SHAIKH",               id: "2023-012", sport: "SOCCER", status: "ACTIVE" },
  { name: "RAYHAN TOHUR",                id: "2023-013", sport: "SOCCER", status: "ACTIVE" },
  { name: "AFM MEHADI HASAN",            id: "2023-014", sport: "SOCCER", status: "ACTIVE" },
  { name: "KAZI ZAHID AHMED",            id: "2023-015", sport: "SOCCER", status: "ACTIVE" },
  { name: "MD SOHEL HOWLADER",           id: "2023-016", sport: "SOCCER", status: "ACTIVE" },
  { name: "JIANXIN ZHU ALVIN",           id: "2023-017", sport: "SOCCER", status: "ACTIVE" },
  { name: "SHAHIN KAMAL",                id: "2023-018", sport: "SOCCER", status: "ACTIVE" },
  { name: "OLUFEMI",                     id: "2023-019", sport: "SOCCER", status: "ACTIVE" },
  { name: "NOOR BURKI",                  id: "2023-020", sport: "SOCCER", status: "ACTIVE" },
  { name: "AKM SHIFUL ISLAM POLASH",     id: "2023-022", sport: "SOCCER", status: "ACTIVE" },
  { name: "SYED M REZA ISPAHANI",        id: "2023-024", sport: "SOCCER", status: "ACTIVE" },
  { name: "SHAH ERFAN REZA",             id: "2023-025", sport: "SOCCER", status: "ACTIVE" },
  { name: "YOUSUF IFTEKHAR",             id: "2023-026", sport: "SOCCER", status: "ACTIVE" },
  { name: "SYED MOHAMMAD KAZEM",         id: "2023-027", sport: "SOCCER", status: "ACTIVE" },
  { name: "SAMEEM AREFIN",               id: "2023-029", sport: "SOCCER", status: "ACTIVE" },
  { name: "ABDUL HIE EVEN",              id: "2023-031", sport: "SOCCER", status: "ACTIVE" },
  { name: "MOHAMMAD ZAWAD BIN HABIB",    id: "2023-032", sport: "SOCCER", status: "ACTIVE" },
  { name: "MOHAMMAD MAHMUD HASAN",       id: "2023-033", sport: "SOCCER", status: "ACTIVE" },
  { name: "JEWEL OBAIDUL",               id: "2023-034", sport: "SOCCER", status: "ACTIVE" },
  { name: "JOBAYED HASAN",               id: "2023-035", sport: "SOCCER", status: "ACTIVE" },
  { name: "MD EMRAN HOSSAIN KHAN",       id: "2023-038", sport: "SOCCER", status: "ACTIVE" },
  { name: "ARPON KHAN",                  id: "2023-040", sport: "SOCCER", status: "ACTIVE" },
  { name: "MD ADNAN ADIB",               id: "2023-041", sport: "SOCCER", status: "ACTIVE" },
  { name: "AYAN HOWLADER",               id: "2023-044", sport: "SOCCER", status: "ACTIVE" },
  { name: "RUHAN UDDIN",                 id: "2023-046", sport: "SOCCER", status: "ACTIVE" },
  { name: "SAZZAD ENAM",                 id: "2023-047", sport: "SOCCER", status: "ACTIVE" },
  { name: "RASEL AHAMED",                id: "2023-049", sport: "SOCCER", status: "ACTIVE" },
  { name: "NAFIS AHMED",                 id: "2023-051", sport: "SOCCER", status: "ACTIVE" },
  { name: "HAMZE BESHIR",                id: "2023-053", sport: "SOCCER", status: "ACTIVE" },
  { name: "ARAFIN ISLAM JONY",           id: "2023-055", sport: "SOCCER", status: "ACTIVE" },
  { name: "AQIB KHAN",                   id: "2023-060", sport: "SOCCER", status: "ACTIVE" },
];

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Players />
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-16 italic">MEMBER DIRECTORY</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 uppercase font-headline font-bold text-xs tracking-widest text-white/40">
                    <th className="py-6 px-4">PLAYER</th>
                    <th className="py-6 px-4">RESC ID</th>
                    <th className="py-6 px-4">SPORT</th>
                    <th className="py-6 px-4">JOINED</th>
                    <th className="py-6 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-white font-headline font-black uppercase text-xl md:text-2xl tracking-tighter">
                  {allMembers.map((member, idx) => (
                    <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors group">
                      <td className="py-8 px-4 group-hover:text-primary transition-colors">{member.name}</td>
                      <td className="py-8 px-4 text-tertiary text-base">{member.id}</td>
                      <td className="py-8 px-4 text-white/60">{member.sport}</td>
                      <td className="py-8 px-4 text-white/60">2023</td>
                      <td className="py-8 px-4 text-right">
                        <span className="text-[10px] tracking-widest px-3 py-1 border border-tertiary text-tertiary">
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
