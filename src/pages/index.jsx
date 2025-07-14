import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/landing/Hero";
import ProdukFavorit from "@/components/landing/ProdukFavorit";
import MenuKopi from "@/components/landing/MenuKopi";
import Keunggulan from "@/components/landing/Keunggulan";
import ReviewSection from "@/components/landing/ReviewSection";
import Subscribe from "@/components/landing/Subscribe";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <Hero />
        {/* <ProdukFavorit />
        <MenuKopi />
        <Keunggulan />
        <ReviewSection />
        <Subscribe /> */}
      </main>

      <Footer />
    </>
  );
}
