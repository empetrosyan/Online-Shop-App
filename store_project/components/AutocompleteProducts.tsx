'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useProduct from "../app/hooks/useProduct";



export default function AutocompleteProducts() {
    const { products } = useProduct();
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        if (!query) return [];
        return products.filter(product => (product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || (product.id.toString() === query))).slice(0, 5)
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return (() => {
            document.removeEventListener('mousedown', handleClickOutside);
        })
    }, [])

    return <div ref={wrapperRef} className=" max-w-[500px] relative">
        <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true) }}
            onFocus={() => setShowDropdown(true)}
            className=" outline-0 border-0 pl-4 pr-4 p-1 rounded-2xl bg-white xl:w-[300px] w-[250px]"
        />
        {showDropdown && filtered.length > 0 && <ul className=" absolute bg-white overflow-y-auto max-h-[300px] border border-gray-200 rounded-sm xl:w-[300px] w-[250px] mt-0.5" >
            {
                filtered.map(item => <Link href={`/product/${item.id}`} key={item.id}
                    className=" flex items-center gap-4 pb-4 pt-4 border-b-1 last:border-0 border-cyan-800 w-[92%] mx-auto"
                    onClick={() => { setShowDropdown(false) }}>
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={40}
                    />
                    <h2>{item.title.length < 20 ? item.title : item.title.slice(0, 20) + '...'}</h2>
                </Link>)
            }
        </ul>}
    </div>
}