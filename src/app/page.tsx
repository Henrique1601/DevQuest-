import { HeroSection } from "@/components/home/HeroSection";
import { MetricsBanner } from "@/components/home/MetricsBanner";
import { TracksPreview } from "@/components/home/TracksPreview";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { ChallengesTeaser } from "@/components/home/ChallengesTeaser";
import { DailyTipWidget } from "@/components/home/DailyTipWidget";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <DailyTipWidget />
      </div>
      <LabsSection />
      <CTASection />
    </div>
  );
}
