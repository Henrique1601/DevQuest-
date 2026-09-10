import { HeroSection } from "@/components/home/HeroSection";
import { MetricsBanner } from "@/components/home/MetricsBanner";
import { TracksPreview } from "@/components/home/TracksPreview";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { ChallengesTeaser } from "@/components/home/ChallengesTeaser";
import { LabsSection } from "@/components/home/LabsSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      <MetricsBanner />
      <TracksPreview />
      <ProjectsShowcase />
      <ChallengesTeaser />
      <LabsSection />
      <CTASection />
    </div>
  );
}
