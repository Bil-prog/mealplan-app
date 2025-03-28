import { FaInstagram, FaLinkedin, FaMeta, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../public/logo.png"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-indigo-200 to-indigo-50 text-indigo-950 text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before-w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD98,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} alt="logo" height={40} className="relative"/>
        </div>  
        <div className="flex justify-center gap-6 mt-6">
          <FaInstagram />
          <FaLinkedin />
          <FaMeta />
          <FaXTwitter />
        </div>
        <p className="mt-6">&copy; 2025 Meals For You. All rights reserved.</p>
      </div>
    </footer>
  );
}
