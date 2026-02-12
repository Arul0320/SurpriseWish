import { useState } from "react";
import ProposalPage from "@/components/ProposalPage";
import MemoryGallery from "@/components/MemoryGallery";
import SurprisePage from "@/components/SurprisePage";
import FloatingHearts from "@/components/FloatingHearts";

type Page = "proposal" | "memories" | "surprise";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("proposal");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
          <ProposalPage onAccept={() => navigateTo("memories")} />
        )}
        {currentPage === "memories" && (
          <MemoryGallery onComplete={() => navigateTo("surprise")} />
        )}
        {currentPage === "surprise" && <SurprisePage />}
      </div>
    </div>
  );
};

export default Index;
