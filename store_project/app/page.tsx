'use client';
import PaginatedProducts from "../components/PaginatedProducts";
import useProduct from "./hooks/useProduct";


export default function HomePage() {
  const { products } = useProduct();

  return <div className="HomePage">
    <PaginatedProducts products={products} />
  </div>
}
