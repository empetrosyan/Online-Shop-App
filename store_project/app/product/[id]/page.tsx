'use client';

import { useTheme } from "@/app/context/ThemeContext";
import useProduct from "@/app/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Params = {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Params) {
    const { theme } = useTheme();
    const { product, loading, getProduct } = useProduct();

    useEffect(() => {
        const getProd = async () => {
            const { id } = await params;
            if (Number(id) <= 20) getProduct(Number(id));
        }
        getProd();
    }, []);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    return <div className={`ProductPage pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        {loading ? <p className=" text-xl"> Loading...</p> : product &&
            <div>
                <h1 className="font-semibold text-3xl text-center text-cyan-900 pt-6 pb-8 pl-4">{product.title}</h1>
                <div className=" shadow-lg rounded-2xl w-[90%] md:w-[80%] mx-auto pt-15 pb-8 p-4 flex flex-col">
                    <div className=" flex flex-col lg:flex-row items-center justify-center gap-20">

                        {product.image && isValidUrl(product.image) ? (
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={300}
                                height={400}
                                style={{
                                    objectFit: 'cover',
                                    margin: 'auto',
                                    padding: '20px'
                                }}
                            />) : <p>Image URL is not valid.</p>
                        }
                        <div className=" lg:w-[50%] lg:pl-4 flex flex-col gap-2">
                            <p className=" flex items-center md:pr-4"><strong className=" pr-1">Rating:</strong>
                                <span className="relative text-gray-300 text-2xl">
                                    ★★★★★
                                    <span
                                        className="absolute top-0 left-0 text-yellow-300 overflow-hidden"
                                        style={{ width: `${(product.rating.rate / 5) * 100}%` }}
                                    >
                                        ★★★★★
                                    </span>
                                </span>
                                <span className="ml-2 text-sm text-gray-500 italic whitespace-nowrap">({product.rating.count} reviews)</span>
                            </p>
                            <p> <strong>Price:</strong> <span className=" text-cyan-500 text-lg">{product.price}$</span></p>
                            <p> <strong>Code:</strong> <span>{product.id}</span> </p>
                            <p> <strong>Category:</strong> <span>{product.category}</span> </p>
                            <p> <strong>Description:</strong> <span className=" italic">{product.description}</span> </p>
                        </div>
                    </div>
                    <Link href={`/update_product/${product.id}`} className=" cursor-pointer ml-auto mr-6 mt-6 p-1 pl-2 pr-3 rounded-xl text-cyan-600 border hover:bg-cyan-700 hover:text-white transition">🖋️ Edit Product</Link>
                </div>
            </div>
        }
    </div>
}