import { useState, useEffect, useRef } from "react";
import ProposalPage from "@/components/ProposalPage";
import MemoryGallery from "@/components/MemoryGallery";
import SurprisePage from "@/components/SurprisePage";
import FloatingHearts from "@/components/FloatingHearts";

type Page = "proposal" | "memories" | "surprise";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("proposal");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}audiofile.mpeg`);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        try {
          audio.muted = true;
          await audio.play();
          setIsMuted(true);
          setIsPlaying(true);
        } catch {
          setAutoplayBlocked(true);
        }
      }
    };

    tryAutoplay();

  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => { });
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const unmuteAudio = async () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setAutoplayBlocked(true));
    }
  };

  const navigateTo = (page: Page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle background hearts on proposal */}
      {currentPage === "proposal" && <FloatingHearts active />}

      {/* Page transitions */}
      <div
        className={`transition-all duration-500 ${isTransitioning
          ? "opacity-0 scale-95 translate-y-4"
          : "opacity-100 scale-100 translate-y-0"
          }`}
      >
        {currentPage === "proposal" && (
          <ProposalPage
            onAccept={() => {
              if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch((err) => {
                    console.log("Play error:", err);
                    setAutoplayBlocked(true);
                  });
              }
              navigateTo("memories");
            }}
          />
        )}
        {currentPage === "memories" && (
          <MemoryGallery
            onComplete={() => navigateTo("surprise")}
            audioControls={{
              playAudio,
              pauseAudio,
              isPlaying,
              unmuteAudio,
              autoplayBlocked,
              isMuted,
            }}
          />
        )}
        {currentPage === "surprise" && <SurprisePage />}
      </div>
    </div>
  );
};

export default Index;
