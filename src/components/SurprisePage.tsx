import { useState, useEffect, useRef } from "react";
import FloatingHearts from "./FloatingHearts";

const SurprisePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showError, setShowError] = useState(false);
  const typewriterRef = useRef<number | null>(null);

  const loveLetter = `My Dearest Valentine-ku... 💖
Happy Valentine’s Day, my love… 🌹
Enna dhaan namma sanda potalum, deep down unakkum theriyum, nee dhaan en everything-nu. Namma evalo argue pannalum, illana Maari Maari kalaichukittalum, kadasila en heart ku therinja ore vishayam—idhu unakkaga mattum dhaan. 💌
My Dear Purushaa,
I love you forever… adhu eppovume maaradhu. ❤️ Time may pass , Years may fly, aana un mela vachurukka kadhal mattum dhaan strong-aa grow aagite irukkum. I really want to say a big thank you for giving your " whole life" for me. 🥺 Nee pandra sacrifices, yaarukkum theriyama nee edukura efforts, namma happiness-kaga nee dedicate pandra andha vishayam—edhuvume waste-a pola , pogavum pogathu..!!
💥 En Fighting Partner:
Inga yaarume namma range-ku sanda poda matanga! 😜 Namma podra andha chinna chinna fights pakka dramatic-aa irukkum, aana honest-aa sollanum-na enakkadhu romba pudichirukku… because enna nadandhalum, kadasila namma thirumba onna dhaan seruvom. We choose each other every time. Adhu dhaan namma bond-a innum strong aakkudhu. 💞
🤍 En Caring Purushaa:
En safe place-aa irundhadhukku thanks. Naan weak-aa feel pannumbo enna thangi pidikiradhukku, life kashtama irukkumbo koodave nikkiradhukku... Unnoda care dhaan en biggest strength. Nee kooda irundhale, naan romba safe-aa, loved-aa, oru complete feel-oda irupen. 🫂
Nee illama naan illa. Nee verum husband mattum kedaiyaadhu—nee en partner in crime, en comfort person💑
Ipdye oru tharaya oruthar annoy pannikittu, mokka vishayathukku sirichukittu, sanda pottu thirumba onna serndhu, kanavu kandukitte... kai korthu namma kizhavan kizhavi aaganum. 👴👵 Indha life-oda ella version-um enakku venum... aana adhu un kooda mattum dhaan irukkanum.
Nee dhaan en ulagam, mama. 🌍💘
With all my love,
Un Pondatti 💋
Forever and always yours,
Your Valentine ❤️✨`;

  const handleSubmit = () => {
    const cleaned = inputValue.trim().toLowerCase().replace(/[^a-z\s]/g, "");
    if (cleaned === "i love u" || cleaned === "i love you") {
      setUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  useEffect(() => {
    if (!unlocked) return;
    let i = 0;
    const type = () => {
      if (i <= loveLetter.length) {
        setDisplayedText(loveLetter.slice(0, i));
        i++;
        typewriterRef.current = window.setTimeout(type, 75);
      }
    };
    type();
    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, [unlocked]);

  if (!unlocked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-valentine-blush opacity-50 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-secondary opacity-40 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-fade-in">
          <div className="text-6xl mb-6 bounce-soft">💌</div>

          <h2 className="text-3xl sm:text-4xl font-display text-primary mb-4 text-center">
            One last thing...
          </h2>

          <p className="text-lg text-muted-foreground font-body mb-8 text-center">
            Type <span className="font-bold text-primary">'I love u'</span> to unlock your surprise ❤️
          </p>

          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Type here..."
              className="w-full px-6 py-4 rounded-full border-2 border-primary bg-card text-foreground font-body text-lg text-center focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all"
            />
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-4 rounded-full bg-primary text-primary-foreground font-body font-bold text-lg shadow-lg pulse-glow transition-all hover:brightness-110 active:scale-95"
            >
              Unlock 💝
            </button>
          </div>

          {showError && (
            <p className="mt-4 text-accent font-body animate-fade-in text-center">
              Hmm... that's not quite right! Try again 💕
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <FloatingHearts active />

      <div className="absolute inset-0 bg-gradient-to-b from-valentine-blush/50 via-background to-valentine-blush/30" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl w-full animate-fade-in-scale">
        <h2 className="text-4xl sm:text-5xl font-display shimmer-text mb-8 text-center">
          My Love Letter to You
        </h2>

        <div className="w-full bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-6 sm:p-10">
          <pre className="font-body text-base sm:text-lg text-foreground whitespace-pre-wrap leading-relaxed">
            {displayedText}
            <span className="animate-pulse text-primary">|</span>
          </pre>
        </div>

        <div className="mt-8 text-center">
          <p className="font-display text-2xl text-primary">
            I love you endlessly 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
