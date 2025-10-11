import Header from "./header";
import LandingSection from "./landing";
import AboutSnippet from "./about-snippet";
import ImagesSection from "@/components/ImagesSection";
import HomeContent from "./home-content";
import WhyClientsLoveUs from "@/components/WhyClientsLoveUs";

export default function Home() {
  return (
    <HomeContent>
      <Header />
      <LandingSection />
      <ImagesSection />
      <WhyClientsLoveUs />
      <AboutSnippet />
      <div className="h-30" />
    </HomeContent>
  );
}
