import React from "react";

const partners = [
  {
    name: "AMIKOM",
    img: "https://www.technogis.co.id/wp-content/uploads/2024/12/Universitas-Amikom-Yogyakarta-Logo.png",
  },
  {
    name: "UAD",
    img: "https://upload.wikimedia.org/wikipedia/id/0/08/Logo_UAD.png",
  },
  {
    name: "UIN SUKA",
    img: "https://lpm.uin-suka.ac.id/media/dokumen_akademik/011_20211205_UIN%20Sunan%20Kalijaga.png",
  },
  {
    name: "UGM",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/UNIVERSITAS_GADJAH_MADA%2C_YOGYAKARTA.png",
  },
  {
    name: "UII",
    img: "https://upload.wikimedia.org/wikipedia/id/thumb/7/7a/UII_LOGO.svg/1200px-UII_LOGO.svg.png",
  },
  {
    name: "UI",
    img: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/800px-Makara_of_Universitas_Indonesia.svg.png",
  },
];

const PartnerLogoRow = () => (
  <div className="flex flex-wrap justify-center items-center gap-12 py-6">
    {partners.map((p, idx) => (
      <img
        key={idx}
        src={p.img}
        alt={p.name}
        className="h-12 md:h-16 w-auto object-contain"
        title={p.name}
      />
    ))}
  </div>
);

export default PartnerLogoRow;
