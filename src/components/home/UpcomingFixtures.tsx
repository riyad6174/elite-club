import FixtureCard from "../ui/FixtureCard";

const UpcomingFixtures = () => {
  const fixtures = [
    {
      sport: "SOCCER",
      league: "PREMIER LEAGUE",
      date: "OCT 24, 2024",
      team1: "ELITES",
      team2: "WANDERERS",
      team1Logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUZlAEESbf9VSWcVk02MStHGJZKqnGNoQCx-nmVHegrj994o889kSXVjvP-Fg8I5AFYuu66lXV0DVptoaVrhWS9yFSyvmk_rgyFyqj4gls6aASoeKh7SgkEdFWRJZx9JWYKsmCpu2vLGa_9RArLOtZcfFfE3cXTu8c6RQjMIoYOv94zds2XAPpgi7H7-_36iJnirmEtTgnvHW_fTWF_mOZSTZpDLBiaUcFeflpvZnHV_9sPlN9LY6GGjhqOPYXImpfHrIzyg7GJa4H",
      icon: "sports_soccer",
      accent: "tertiary" as const,
    },
    {
      sport: "CRICKET",
      league: "ELITE CUP",
      date: "OCT 28, 2024",
      team1: "ELITES",
      team2: "STRIKERS",
      team1Logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeC6EbxzD-vv6yQEiIFuC4RoHDDr_SY_53a68ML02ZMRKMws0dQsyNYUpvuJ8ak-waBnK531VCgXshCy_L8dC84s2yytm5fvrx9cH8CKi7aVd-N2Xev4hajlvItG9IglVYL0doV0hgrYdGlWptu5xwYT_SADdnNR2LmhG5otJkV7PC-JpItVhsLkDlWw7qMVoUkXjGQ2q43bGqZbRSWHtma_5Pr37hL9VFCKhuRD1kG-PeglCbRPd1_1Tg9n_ZQx-zTDdDuEYDqZPh",
      icon: "sports_cricket",
      accent: "primary" as const,
    },
    {
      sport: "BADMINTON",
      league: "OPEN",
      date: "NOV 02, 2024",
      team1: "ELITES",
      team2: "TITANS",
      team1Logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAosTr4OhCZZoBgtOVfxrHibrogrBV0xXguMFh-nj-4tWoA-MjJSMMWBIsJWFAb27wxgg3LWHqe3zihaioTs3yJLjYumoe4JrAjiqpG1w0bsmiMUWonvfKPaHjUBmJTYlGxPhKVwSmoB8bRA60Rl14VNFMb2tX4wpeBJz2uDuOdVh1Xa4F0PFzj8FlyiyPvNZdQ4ZKWNi-q7iEr6z2kQj4VuPHZBDnjzok9_yzkdgq4L7mh-txuE1xFO9L2T-3JAtU8ts3KdHUJImGB",
      icon: "sports_tennis",
      accent: "tertiary" as const,
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="space-y-2">
          <span className="text-tertiary font-headline font-bold tracking-widest text-[10px] md:text-xs uppercase">MATCH DAY</span>
          <h2 className="text-white font-headline font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-none">UPCOMING FIXTURES</h2>
        </div>
        <button className="text-on-primary-container font-headline font-bold hover:underline underline-offset-8 text-sm md:text-base">
          VIEW FULL CALENDAR
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fixtures.map((fixture, index) => (
          <FixtureCard key={index} {...fixture} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingFixtures;
