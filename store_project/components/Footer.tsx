'use client';

import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";

export default function Footer() {
    const { theme } = useTheme();

    return <div className={`Footer p-4 z-10 text-white ${theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-900'}`}>
        <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={0}
            className=" ml-2"
        />
        <div className=" flex justify-between items-baseline-last text-[15px]">
            <ul>
                <li className=" flex items-center gap-2 pt-2"><img src="/location-icon.png" alt="location" className=" w-5" />Yerevan, Armenia</li>
                <li className=" flex items-center gap-2 pt-1 pb-1"><img src="/phone-icon.jpg" alt="phone" className=" w-5" />+374(33) 33-33-33</li>
                <li className=" flex items-center gap-2"><img src="/email-icon.png" alt="email" className=" w-5" />shopnow@gmail.com</li>
            </ul>
            <ul className=" flex items-baseline-last gap-2">
                <li><a href="https://www.instagram.com/" target="_blank"><img src="/instagram-logo.png" alt="instagram" className=" w-6 transition-transform duration-200 hover:scale-115" /></a></li>
                <li><a href="https://www.facebook.com/" target="_blank"><img src="/facebook-logo.png" alt="facebook" className=" w-6 transition-transform duration-200 hover:scale-115" /></a></li>
                <li><a href="https://www.tiktok.com/en/" target="_blank"><img src="/tiktok-logo.png" alt="tiktok" className=" w-6 transition-transform duration-200 hover:scale-115" /></a></li>
            </ul>
        </div>
        <p className=" text-center pt-2 text-[13px] text-gray-300">©{new Date().getFullYear()} Copyright by <strong>ShopNow</strong>. All Rights Reserved.</p>
    </div>
}