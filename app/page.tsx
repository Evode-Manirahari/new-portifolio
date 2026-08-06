import { Hero } from "@/components/hero";
import { RecruiterSummary } from "@/components/recruiter-summary";
import { SelectedWork } from "@/components/selected-work";
import { Capabilities } from "@/components/capabilities";
import { CurrentFocus } from "@/components/current-focus";
import { ExperienceSummary } from "@/components/experience-summary";
import { ProjectIndex } from "@/components/project-index";
import { AboutPreview } from "@/components/about-preview";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecruiterSummary />
      <SelectedWork />
      <Capabilities />
      <CurrentFocus />
      <ExperienceSummary />
      <ProjectIndex />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
