import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Players from "@/components/home/Players";

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Players />
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-16 italic">PLAYER DIRECTORY</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 uppercase font-headline font-bold text-xs tracking-widest text-white/40">
                    <th className="py-6 px-4">PLAYER</th>
                    <th className="py-6 px-4">SPORT</th>
                    <th className="py-6 px-4">RANKING/LVL</th>
                    <th className="py-6 px-4">TENURE</th>
                    <th className="py-6 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-white font-headline font-black uppercase text-xl md:text-2xl tracking-tighter">
                  {[
                    { name: "ELIAS VORTEX", sport: "SOCCER", rank: "PRO", tenure: "5 YRS", status: "ACTIVE" },
                    { name: "JAXON KINETIC", sport: "CRICKET", rank: "ELITE", tenure: "3 YRS", status: "ACTIVE" },
                    { name: "SARAH SWIFT", sport: "BADMINTON", rank: "#3 GLOBAL", tenure: "2 YRS", status: "ACTIVE" },
                    { name: "LEO STRIKE", sport: "RUGBY", rank: "PRO", tenure: "4 YRS", status: "RECOVERING" },
                    { name: "AVA VOLLEY", sport: "TENNIS", rank: "TOP 50", tenure: "1 YR", status: "ACTIVE" }
                  ].map((player, idx) => (
                    <tr key={idx} className="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors group">
                      <td className="py-8 px-4 group-hover:text-primary transition-colors">{player.name}</td>
                      <td className="py-8 px-4 text-tertiary">{player.sport}</td>
                      <td className="py-8 px-4 text-white/60">{player.rank}</td>
                      <td className="py-8 px-4 text-white/60">{player.tenure}</td>
                      <td className="py-8 px-4 text-right">
                        <span className={`text-[10px] tracking-widest px-3 py-1 border ${player.status === 'ACTIVE' ? 'border-tertiary text-tertiary' : 'border-primary text-primary'}`}>
                          {player.status}
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
