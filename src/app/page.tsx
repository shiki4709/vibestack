import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhatIsVibeCoding } from "@/components/what-is-vibe-coding";
import { GettingStarted } from "@/components/getting-started";
import { Demos } from "@/components/demos";
import { CommunityFeed } from "@/components/community-feed";
import { EmailCapture } from "@/components/email-capture";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatIsVibeCoding />
        <GettingStarted />
        <Demos />
        <CommunityFeed />
        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
