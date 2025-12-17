'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: '',
    toggleTheme: () => { }
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);