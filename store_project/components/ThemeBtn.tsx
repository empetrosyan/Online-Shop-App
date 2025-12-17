'use client';

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeBtn() {
    const { toggleTheme } = useTheme();

    return <div className="">
        <button onClick={toggleTheme} className=" cursor-pointer ">
            <img src="/theme-icon.png" alt="theme-icon" className=" w-9" />
        </button>
    </div>
}