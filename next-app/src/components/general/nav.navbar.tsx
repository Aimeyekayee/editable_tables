import React from "react";
import denso from "@/assets/denso.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div style={{ height: "5rem",padding:"1rem"}}>
      <Image src={denso} alt="denso" width={100} height={50} />
    </div>
  );
};

export default Navbar;
