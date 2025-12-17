'use client';
import Image from "next/image";
import AutocompleteProducts from "./AutocompleteProducts";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeBtn from "./ThemeBtn";
import { useTheme } from "@/app/context/ThemeContext";


export default function Header() {
    const { theme } = useTheme();
    const [searching, setSearching] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const refSearch = useRef<HTMLDivElement>(null);
    const refMenu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickSearch = (e: MouseEvent) => {
            if (refSearch.current && !refSearch.current.contains(e.target as Node)) {
                setSearching(false);
            }
        }

        const onClickMenu = (e: MouseEvent) => {
            if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', onClickSearch);
        document.addEventListener('mousedown', onClickMenu);


        return () => {
            document.removeEventListener('mousedown', onClickSearch);
            document.removeEventListener('mousedown', onClickMenu);
        };
    }, []);

    const navItems = [
        { name: "Products", href: "/all_products" },
        { name: "Add", href: "/add_product" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Auth", href: "/auth" },
    ];


    return <div className={`Header px-5 h-18 fixed top-0 left-0 right-0 z-10 flex items-center justify-between ${theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-900'}`}>
        <Link href={'/'} className={`Logo transition duration-200 hover:scale-105 sm:flex ${searching ? 'hidden' : ''}`}>
            <Image
                src="/logo.png"
                alt="logo"
                width={120}
                height={0}
                className=" ml-2"
            /></Link>
        <ul className={`NavBar hidden gap-10 items-center text-white font-bold text-lg ${searching ? 'hidden xl:flex' : 'lg:flex'}`}>
            {navItems.map((item, idx) => (
                <li key={idx} className="transition duration-200 hover:scale-105">
                    <Link href={item.href}>{item.name}</Link>
                </li>
            ))}
        </ul>

        <div className=" flex items-center justify-between">
            <div ref={refSearch} className="Search relative flex items-center">
                <button
                    className="cursor-pointer pr-3 transition duration-200 hover:scale-105"
                    onClick={() => setSearching(true)} >
                    <img src="/search-icon.png" alt="search" className="w-6" />
                </button>

                <div
                    className={` absolute sm:right-0 size-min left-0 transition-all duration-400 ease-out transform mr-2 mx-auto 
                    ${searching ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0 "} `} >
                    <AutocompleteProducts />
                </div>
            </div>

            <div ref={refMenu} className="NavMenu lg:hidden flex pr-3">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className={`flex flex-col gap-1 p-2 rounded-lg cursor-pointer transition duration-200 hover:scale-105 sm:flex ${searching ? 'hidden' : ''}`}
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>

                <ul className={` text-white text-md w-45 py-2 px-2 rounded-2xl shadow-2xl absolute right-3 top-16 transition-all duration-300 ease-out transform opacity-0 ${theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-900'} ${showMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 "}`}>
                    {navItems.map((item, idx) => (
                        <Link key={idx} href={item.href}><li
                            className={`p-1 pl-3 mt-1 rounded-2xl border-b border-gray-400 hover:scale-105 cursor-pointer transition-colors duration-200 shadow-lg ${theme === 'light' ? 'hover:bg-cyan-500' : 'hover:bg-cyan-800'}`}
                            onClick={() => setShowMenu(false)}
                        >
                            {item.name}
                        </li></Link>
                    ))}
                </ul>
            </div>

            <div className={` sm:flex ${searching ? 'hidden' : ''}`}>
                <ThemeBtn />
            </div>
        </div>
    </div >
}