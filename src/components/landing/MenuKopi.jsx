import { useState } from "react";
import Image from "next/image";
import produk from "@/constants/produk";
import clsx from "clsx";

// Buat daftar kategori unik dari produk
const kategoriList = Array.from(new Set(produk.map((item) => item.category)));

// Buat mapping produk berdasarkan kategori
const produkByKategori = kategoriList.reduce((acc, kategori) => {
    acc[kategori] = produk.filter((item) => item.category === kategori);
    return acc;
}, {});

// Ambil semua komposisi unik
const semuaKomposisi = Array.from(
    new Set(produk.flatMap((item) => item.composition))
);

export default function MenuKopi() {
    const [kategoriAktif, setKategoriAktif] = useState(kategoriList[0]);
    const [itemTerpilih, setItemTerpilih] = useState(produkByKategori[kategoriAktif][0]);

    const handleKategoriClick = (kategori) => {
        setKategoriAktif(kategori);
        setItemTerpilih(produkByKategori[kategori][0]);
    };

    const handleKomposisiClick = (bahan) => {
        const itemDitemukan = produk.find((item) =>
            item.composition.includes(bahan)
        );
        if (itemDitemukan) {
            setItemTerpilih(itemDitemukan);
        }
    };

    return (
        <section className="bg-[#F9F9F9] px-4 lg:px-0 py-0">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row">
                {/* Kiri: Gambar Produk */}
                <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative">
                    <Image
                        src={itemTerpilih.image}
                        alt={itemTerpilih.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Kanan: Daftar Menu */}
                <div className="w-full lg:w-1/2 bg-[#D1B48C] px-8 py-10 space-y-8 overflow-y-auto">
                    {/* Kategori */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {kategoriList.map((kategori) => (
                            <button
                                key={kategori}
                                onClick={() => handleKategoriClick(kategori)}
                                className={clsx(
                                    "py-2 font-bold border",
                                    kategoriAktif === kategori
                                        ? "bg-[#F9C06A] border-black"
                                        : "bg-transparent border-gray-500"
                                )}
                            >
                                {kategori}
                            </button>
                        ))}
                    </div>

                    {/* Menu Item */}
                    <div className="grid grid-cols-2 gap-4">
                        {produkByKategori[kategoriAktif].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setItemTerpilih(item)}
                                className="text-left border-b border-dotted border-black py-1 hover:font-semibold"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Komposisi */}
                    <div className="pt-6">
                        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
                            100% Biji Kopi Arabika
                        </h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {semuaKomposisi.map((bahan) => (
                                <button
                                    key={bahan}
                                    onClick={() => handleKomposisiClick(bahan)}
                                    className={clsx(
                                        "border text-xs px-3 py-1 text-center transition-colors duration-200",
                                        itemTerpilih.composition.includes(bahan)
                                            ? "border-black font-semibold"
                                            : "border-gray-400 text-gray-600 hover:border-black hover:text-black"
                                    )}
                                >
                                    {bahan}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
