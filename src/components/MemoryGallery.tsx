import { useState } from "react";
import coupleRomantic from "@/assets/couple-proposal.png";
import memory1 from "@/assets/1.jpeg";
import memory2 from "@/assets/2.jpeg";
import memory3 from "@/assets/3.jpeg";
import memory4 from "@/assets/4.jpeg";
import memory5 from "@/assets/5.jpeg";
import memory6 from "@/assets/6.jpeg";
import memory7 from "@/assets/7.jpeg";

interface MemoryGalleryProps {
  onComplete: () => void;
  audioControls?: {
    playAudio: () => void;
    pauseAudio: () => void;
    isPlaying: boolean;
    unmuteAudio: () => void;
    autoplayBlocked: boolean;
    isMuted: boolean;
  };
}

const memories = [
  { img: memory1, caption: "2nd pongal with special moments 🥰" },
  { img: memory2, caption: "Our thala diwali😘" },
  { img: memory3, caption: "With love 💕" },
  { img: memory4, caption: "Our 1st yr anniversary" },
  { img: memory5, caption: "Yercard trip with no fear" },
  { img: memory6, caption: "First day out" },
  { img: memory7, caption: "First Pic of After marriage" },
];

const MemoryGallery = ({ onComplete, audioControls }: MemoryGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    // trigger audio on first user interaction if controls provided
    if (audioControls && !audioControls.isPlaying) {
      audioControls.playAudio();
    }

    if (currentIndex >= memories.length - 1) {
      onComplete();
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-valentine-blush opacity-40 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-secondary opacity-30 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full animate-fade-in">
        {/* Top couple image */}
        <img
          src={coupleRomantic}
          alt="Romantic couple"
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-primary shadow-lg mb-6"
        />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-primary mb-2 text-center">
          Be my Valentine forever ❤️
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground font-body mb-8 text-center">
          I want to relive some of our beautiful memories together.
        </p>

        {/* Image slider */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            <div
              className={`transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={memories[currentIndex].img}
                  alt={memories[currentIndex].caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <p className="font-display text-xl sm:text-2xl text-foreground">
                  {memories[currentIndex].caption}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-body">
                  {currentIndex + 1} / {memories.length}
                </p>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-body font-bold text-lg shadow-lg pulse-glow transition-all hover:brightness-110 active:scale-95"
          >
            {currentIndex >= memories.length - 1 ? "Continue 💌" : "Next →"}
          </button>

          {/* Progress dots */}
          <div className="flex gap-2 mt-4">
            {memories.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex
                  ? "bg-primary scale-125"
                  : i < currentIndex
                    ? "bg-valentine-rose opacity-50"
                    : "bg-muted"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGallery;
