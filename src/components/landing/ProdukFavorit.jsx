import Image from "next/image";
import Button from "../ui/Button";
import produkFavorit from "@/constants/produk"; // pastiin ada dummy datanya

export default function ProdukFavorit() {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-[#603809]">Kopi Terenak</h2>
            <p className="text-[#6B6B6B] text-base mt-2">
              Jelajahi kopi terenak di kopiso, di jamin bikin semua aktivitas kamu makin gaspoll!!
            </p>
          </div>
          <Button className="bg-[#F9C06A] text-[#1E1E1E] px-5 py-2 rounded-md">
            Lihat Semua
          </Button>
        </div>

        {/* Kartu Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {produkFavorit.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
            >
              {/* Gambar Produk */}
              <div className="bg-gray-200 w-full h-48 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Detail */}
              <div className="px-6 py-6 text-center">
                <h3 className="font-semibold text-[#1E1E1E]">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] mt-2">{item.composition}</p>
                <p className="font-bold text-[#1E1E1E] mt-5">{item.price}</p>
                <Button className="bg-[#F9C06A] text-[#1E1E1E] w-full py-2 mt-5 rounded-md text-sm">
                  + Keranjang
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
