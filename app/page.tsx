import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ParticleBackground from "@/app/components/ParticleBackground";
import HeroSection from "@/app/sections/HeroSection";
import AboutSection from "@/app/sections/AboutSection";
import SkillsSection from "@/app/sections/SkillsSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import ExperienceSection from "@/app/sections/ExperienceSection";
import AchievementsSection from "@/app/sections/AchievementsSection";
import ContactSection from "@/app/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen noise-bg">
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>

    </main>
  );
}
