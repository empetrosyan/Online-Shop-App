'use client';
import PaginatedProducts from "../../components/PaginatedProducts";
import useProduct from "../hooks/useProduct";

export default function AllProducts() {
    const { products } = useProduct();

    return <div className=" AllProducts">
        <PaginatedProducts products={products} />
    </div>
}