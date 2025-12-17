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

type AddedProduct = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

export default function useProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
    const [addedProducts, setAddedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products', { next: { revalidate: 60 } });
            if (!res.ok) throw new Error('Failed to get products.');

            const data: Product[] = await res.json();
            setProducts(data);
        } catch (e) {
            console.error('Error fetching products.');
        } finally {
            setLoading(false);
        }
    }

    const getProduct = async (id: number) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 60 } });
            if (!res.ok) throw new Error(`Failed to get product with ID ${id}.`);

            const data: Product = await res.json();
            setProduct(data);
        } catch (e) {
            console.error('Error fetching product.');
        } finally {
            setLoading(false);
        }
    }

    const addProduct = async (title: string, price: number, description: string, category: string, image: string) => {
        try {
            const res = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    category,
                    image,
                }),
            });

            if (!res.ok) throw new Error("Failed to add product.");
            const data = await res.json() as AddedProduct;
            if (addedProducts.length > 0) {
                const product = { ...data, id: products.length + addedProducts.length + 1, rating: { rate: 0, count: 0 } };
                setAddedProducts(prev => [product, ...prev]);
                setProducts(prev => [product, ...prev]);

            } else {
                setAddedProducts(prev => [{ ...data, rating: { rate: 0, count: 0 } }, ...prev]);
                setProducts(prev => [{ ...data, rating: { rate: 0, count: 0 } }, ...prev]);
            }
        } catch (e) {
            console.error("Error adding product.");
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (!res.ok) throw new Error(`Failed to delete product with ID ${id}.`);

        } catch (e) {
            console.error(`Error deleting product.`);
        }
    }

    const updateProduct = async (id: number, title: string, price: number, description: string, category: string, image: string) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    price,
                    description,
                    category,
                    image,
                })
            })
            if (!res.ok) throw new Error(`Failed to update product with ID ${id}`);

            const data: Product = await res.json();
            setUpdatedProduct(data);
        } catch (e) {
            console.error(`Error updating product.`)
        }
    }

    return {
        products,
        product,
        updatedProduct,
        addedProducts,
        loading,
        getProduct,
        addProduct,
        deleteProduct,
        updateProduct
    }
}