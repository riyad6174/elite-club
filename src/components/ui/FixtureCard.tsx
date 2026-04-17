interface FixtureCardProps {
  sport: string;
  league: string;
  date: string;
  team1: string;
  team2: string;
  team1Logo: string;
  icon: string;
  accent: "tertiary" | "primary";
}

const FixtureCard = ({ sport, league, date, team1, team2, team1Logo, icon, accent }: FixtureCardProps) => {
  return (
    <div className="bg-surface-container-low p-8 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-1 h-full ${accent === "tertiary" ? "bg-tertiary" : "bg-primary"}`}></div>
      <div className="flex justify-between items-start mb-12">
        <span className="bg-surface-bright px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
          {sport} • {league}
        </span>
        <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{date}</span>
      </div>
      
      <div className="flex items-center justify-between gap-4 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center rounded-sm mb-2 group-hover:scale-110 transition-transform">
            <img alt={team1} className="w-10 h-10 opacity-80" src={team1Logo} />
          </div>
          <p className="text-[10px] font-bold tracking-widest">{team1}</p>
        </div>
        
        <span className="text-white/20 font-headline font-black text-3xl italic">VS</span>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center rounded-sm mb-2 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl text-outline">{icon}</span>
          </div>
          <p className="text-[10px] font-bold tracking-widest">{team2}</p>
        </div>
      </div>
      
      <button className={`w-full ${accent === "tertiary" ? "bg-on-primary-container text-on-primary-fixed" : "border border-outline-variant/30 text-white"} font-headline font-black py-4 rounded-sm tracking-widest uppercase text-sm hover:brightness-110 transition-all`}>
        {accent === "tertiary" ? "GET TICKETS" : "REMIND ME"}
      </button>
    </div>
  );
};

export default FixtureCard;
