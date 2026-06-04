import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { GettingStarted } from "@/components/getting-started";
import { Demos } from "@/components/demos";
import { EmailCapture } from "@/components/email-capture";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <GettingStarted />
        <Demos />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
