import { HeroSection, BrandStory, MissionVision, CoreValues } from "../../components/B2C/about";

export default function AboutPage() {
  return (
    <div className="bg-white text-[var(--text-primary)] overflow-hidden">
      <HeroSection />
      <BrandStory />
      {/* <MissionVision /> */}
      {/* <CoreValues /> */}
    </div>
  );
}
