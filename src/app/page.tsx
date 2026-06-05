import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SectionCards } from "@/components/section-cards";
import { EmailCapture } from "@/components/email-capture";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <SectionCards />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
