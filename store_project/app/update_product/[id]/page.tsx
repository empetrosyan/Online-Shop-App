'use client';

import { useTheme } from "@/app/context/ThemeContext";
import useProduct from "@/app/hooks/useProduct";
import PaginatedProducts from "@/components/PaginatedProducts";
import Image from "next/image";
import { useEffect, useState } from "react";

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

type Params = {
    params: Promise<{ id: string }>
}

export default function UpdateProduct({ params }: Params) {
    const { theme } = useTheme();
    const { product, loading, getProduct, updateProduct, products, updatedProduct } = useProduct();
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [seeAll, setSeeAll] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProd = async () => {
            const { id } = await params;
            if (Number(id) <= 20) getProduct(Number(id));
        }
        getProd();
    }, []);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setImage(product.image);
        }
    }, [product])

    useEffect(() => {
        if (updatedProduct && products.length > 0) {
            setAllProducts(products.map(prod =>
                prod.id === updatedProduct.id ? { ...prod, title: updatedProduct.title, price: updatedProduct.price, description: updatedProduct.description, category: updatedProduct.category, image: updatedProduct.image } : prod
            ));
        } else {
            setAllProducts(products);
        }
    }, [products, updatedProduct]);


    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { id } = await params;
        const trimmedTitle = title.trim();
        const trimmedDesc = description.trim();
        const trimmedCategory = category.trim();
        const trimmedImage = image.trim();
        if (!trimmedTitle || !trimmedDesc || price === '' || !trimmedCategory || !trimmedImage) return;
        await updateProduct(Number(id), title, price, description, category, image);
    }

    const handleSeeAll = () => {
        setSeeAll(true);
    }

    return <div className={`UpdateProduct pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        {loading ? <p className=" text-xl"> Loading...</p> : <div>
            <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
                Update the product
            </h1>
            <div className=" flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-2xl w-[90%] md:w-[80%] mx-auto pt-15 pb-15 p-4">
                {image && isValidUrl(image) ?
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={400}
                        style={{
                            objectFit: 'cover',
                            margin: 'auto',
                            padding: '20px'
                        }}
                    /> :
                    <p>Image URL is not valid.</p>
                }
                <form onSubmit={handleUpdateProduct} className=" flex flex-col gap-5 mx-auto w-[90%] lg:w-[50%] mt-8">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition" />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition" min={0} />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition" />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition" />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition w-full h-[120px] resize-none" />
                    <button type="submit" className="w-full bg-cyan-700 text-white py-3 rounded-xl font-semibold hover:bg-cyan-800 transition shadow-md cursor-pointer mt-4">Save</button>
                </form>
            </div>
        </div >
        }
        {
            !seeAll &&
            <p className={updatedProduct ? 'text-cyan-900 text-lg ml-4 mt-4' : 'hidden'}>
                Your product has been successfully updated. Click here to
                <button onClick={handleSeeAll} className=" text-cyan-600 border-b-1 cursor-pointer pl-1"> see all products.</button>
            </p>
        }
        {
            seeAll && updatedProduct &&
            <div className=" pt-8"> <PaginatedProducts products={allProducts} /> </div>
        }
    </div >
}