import { About } from "@/components/About";
import { BrandsStrip } from "@/components/BrandsStrip";
import { Contact } from "@/components/Contact";
import { FeaturedWorks } from "@/components/FeaturedWorks";
import { Filmography } from "@/components/Filmography";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <BrandsStrip />
      <About />
      <Services />
      <Filmography />
      <Contact />
    </>
  );
}
