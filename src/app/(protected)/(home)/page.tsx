import CustomHeroCarousel from "@/components/custom/carousel/custom-hero-carousel";
import FreeSessionsSection from "@/components/custom/carousel/free-sessions-section";
import SessionsSection from "@/components/custom/carousel/my-sessions-section";
import TopTutorsSection from "@/components/custom/carousel/top-tutors-section";

import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
  weight: ["700"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="py-10 px-5 w-full">
      <div
        className={`text-3xl font-extrabold ${roboto_mono.className} antialiased`}
      >
        Welcome to ORION
      </div>
      <div className="xl:min-h-[24rem] lg:min-h-[20rem] min-h-[24rem] ">
        <CustomHeroCarousel />
      </div>
      <SessionsSection />
      <TopTutorsSection />
      <FreeSessionsSection />
    </div>
  );
}
