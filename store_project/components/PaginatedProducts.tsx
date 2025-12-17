'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useProduct from "../app/hooks/useProduct";
import { useTheme } from "@/app/context/ThemeContext";

type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

type Props = {
    products: Product[];
}

export default function PaginatedProducts({ products }: Props) {
    const { theme } = useTheme();
    const { loading, deleteProduct } = useProduct();
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setAllProducts(products);
    }, [products])

    const handleDeleteProduct = (id: number) => {
        deleteProduct(id);
        setAllProducts(prev => prev.filter(product => product.id !== id));
    }

    const itemsPerPage = 8;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const currentPage = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return allProducts.slice(start, start + itemsPerPage);
    }, [allProducts, page])

    const next = () => setPage(prev => Math.min(totalPages, prev + 1));
    const prev = () => setPage(prev => Math.max(1, prev - 1));
    const choose = (page: number) => setPage(page);


    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    const [heartClickIdx, setHeartClickIdx] = useState<number[]>([]);
    const handleClickHeart = (id: number) => {
        heartClickIdx.includes(id) ? setHeartClickIdx(prev => prev.filter(num => num !== id)) : setHeartClickIdx(prev => [id, ...prev]);
    }

    return <div className={`PaginatedProducts pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        {loading ? <p className=" text-xl"> Loading...</p> :
            <div>
                <ul className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
                    {
                        currentPage.map(product => <li key={product.id} className=" p-4 flex flex-col justify-between bg-white shadow-md rounded-xl">
                            <div className=" flex justify-between">
                                <h3 className=" font-[500] p-2 pb-0 w-[95%]"> {product.title} </h3>
                                <div onClick={() => handleClickHeart(product.id)} className="cursor-pointer text-cyan-400 w-[5%]">
                                    {
                                        heartClickIdx.includes(product.id) ? <p className=" text-xl">❤︎</p> : <p className=" text-2xl">♡</p>
                                    }
                                </div>
                            </div>
                            <Link href={`/product/${product.id}`}>
                                {product.image && isValidUrl(product.image) ? (
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={200}
                                        height={300}
                                        style={{
                                            objectFit: 'cover',
                                            margin: 'auto',
                                            padding: '20px'
                                        }}
                                    />) : <p>Image URL is not valid.</p>
                                }
                            </Link>
                            <div className=" flex justify-between items-baseline-last">
                                <div>
                                    <p className=" flex items-center">
                                        <strong>Rating: </strong>
                                        <span className="relative text-gray-300 ml-1">
                                            ★★★★★
                                            <span
                                                className="absolute top-0 left-0 text-yellow-300 overflow-hidden"
                                                style={{ width: `${(product.rating.rate / 5) * 100}%` }}
                                            >
                                                ★★★★★
                                            </span>
                                        </span>
                                        <span className="ml-2 text-xs text-gray-500 italic">({product.rating.count} reviews)</span>
                                    </p>
                                    <p className="mr-4">
                                        <strong>Price:</strong> <span className=" text-cyan-500 text-[17px]">{product.price}$</span>
                                    </p>
                                </div>
                                <div className=" flex items-center">
                                    <Link href={`/update_product/${product.id}`} className=" cursor-pointer pr-1">🖋️</Link>
                                    <button onClick={() => handleDeleteProduct(product.id)}
                                        className=" cursor-pointer">❌</button>
                                </div>
                            </div>
                        </li>)
                    }
                </ul>

                <div className="buttons flex justify-center items-center gap-5 pt-4">
                    <button className={page === 1 ? 'text-gray-400 text-2xl' : 'cursor-pointer text-2xl'} onClick={prev} disabled={page === 1}> ← </button>
                    <ul className=" flex items-center gap-4">
                        {
                            pages.map((p, index) => <li key={index}
                                className={p === page ? 'text-xl font-[500]' : 'cursor-pointer'}
                                onClick={() => { choose(p) }}>
                                {p}
                            </li>)
                        }
                    </ul>
                    <button className={page === totalPages ? 'text-gray-400 text-2xl' : 'cursor-pointer text-2xl'} onClick={next} disabled={page === totalPages}> → </button>
                </div>
            </div>
        }
    </div>
}