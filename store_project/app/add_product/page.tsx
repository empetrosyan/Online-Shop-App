'use client';

import PaginatedProducts from "../../components/PaginatedProducts";
import { useTheme } from "../context/ThemeContext";
import useProduct from "../hooks/useProduct";
import { useState } from "react";


export default function AddProduct() {
  const { theme } = useTheme();
  const { products, addedProducts, addProduct } = useProduct();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [seeAll, setSeeAll] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();
    const trimmedCategory = category.trim();
    const trimmedImage = image.trim();
    if (!trimmedTitle || !trimmedDesc || price === '' || !trimmedCategory || !trimmedImage) return;
    await addProduct(trimmedTitle, price, trimmedDesc, trimmedCategory, trimmedImage);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImage('');
  };

  const handleSeeAll = () => {
    setSeeAll(true);
  }

  return <div className={`AddProduct pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
    <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
      Add a new product
    </h1>

    <div className="bg-white shadow-lg rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] mx-auto p-10 pl-6 pr-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mx-auto w-full"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          min={0}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 pl-3 rounded-xl outline-none border border-cyan-600 focus:ring focus:ring-cyan-500 transition h-[120px] resize-none"
          required
        />

        <button
          type="submit"
          className={`w-full text-white py-3 rounded-xl font-semibold transition shadow-md cursor-pointer mt-4 ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
        >
          Add
        </button>
      </form>
    </div>

    {!seeAll && (
      <p
        className={
          addedProducts.length > 0
            ? "text-cyan-900 text-lg text-center mt-6"
            : "hidden"
        }
      >
        Your product has been successfully added. Click here to
        <button
          onClick={handleSeeAll}
          className="text-cyan-600 border-b cursor-pointer pl-1"
        >
          see all products.
        </button>
      </p>
    )}

    {seeAll && addedProducts.length > 0 && (
      <div className="pt-8">
        <PaginatedProducts products={products} />
      </div>
    )}
  </div>

}