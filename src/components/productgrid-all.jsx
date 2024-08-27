"use client";
import { API_PINEAPPLE } from "@/utils/constans";
import { useState, useEffect, useRef, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useInView } from "@/hooks/inview";
import { useProvider } from "@/app/app-provider";
import { IoMdStar } from "react-icons/io";
import { CiShop } from "react-icons/ci";

const ProductCard = ({ product }) => (
  <div className=" rounded-lg shadow-md group">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover bg-muted rounded-t-md"
    />
    <div className="p-1 mb-3">
      <h3 className="mt-2 text-sm overflow-hidden text-ellipsis line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm font-bold">
        Rp {new Intl.NumberFormat("de-DE").format(Math.round(product.rate))}
      </p>
      <span className="text-xs bg-blurgreen p-1 rounded-sm">Diskon 3%</span>
      <div className="flex flex-row items-top">
        <CiShop className="text-success h-6 w-6" />
        <div className=" text-xs text-muted group mt-1 ml-1 relative w-64 h-6   overflow-hidden">
          <div className="transform transition-all duration-500 group-hover:-translate-y-full ">
            Denpasar
          </div>

          <div className="absolute top-full h-full transform transition-all duration-500 group-hover:-translate-y-full">
            Bhakti Widya Farma
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <IoMdStar className="text-secondary" />
        <div className="text-xs text-muted">4.9 | 50+ terjual</div>
      </div>
    </div>
  </div>
);

const ProductSkeleton = () => (
  <div className=" rounded-lg  shadow-md">
    <Skeleton height={192} className="mb-2" />
    <div className="p-2">
      <Skeleton width={150} />
      <Skeleton width={100} />
    </div>
  </div>
);

export const ProductGridAll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [ref, isInView, hasBeenSeen] = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  const { reachedBottom } = useProvider();
  const maxLimit = 3;
  const [currentLimit, setCurrentLimit] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(`${API_PINEAPPLE}/products?page=${page}`);
      const newProduct = await response.json();
      const newProducts = newProduct.data;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      //setHasMore(newProducts.length === 10);
      setPage((prevPage) => prevPage + 1);
      setCurrentLimit((prev) => prev + 1);
      console.log(newProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Only run on initial mount

  useEffect(() => {
    if (hasBeenSeen && currentLimit <= maxLimit) {
      fetchProducts();
      setCurrentLimit((prev) => prev + 1);
    }
    console.log("refresh");
  }, [hasBeenSeen]);

  /*
  useEffect(() => {
    if (reachedBottom && currentLimit <= maxLimit) {
      fetchProducts();
      setCurrentLimit((prev) => prev + 1);
      console.log("refresh");
    }
  }, [reachedBottom]);
*/
  return (
    <div className="space-y-6 mb-3 mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
        {loading &&
          [...Array(7)].map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
      <div ref={ref} className="mt-[2000px]"></div>

      {currentLimit > maxLimit && (
        <div className="text-center">
          <button
            onClick={() => {
              fetchProducts();
            }}
            disabled={loading}
            className="px-4 py-2 border  rounded-md hover:text-muted disabled:text-muted"
          >
            {loading ? "Loading..." : "Muat lebih banyak"}
          </button>
        </div>
      )}
      {/*
        <div>
        <div ref={ref} className="mt-[2000px]">
         
          <p>This is the text at the bottom of the page.</p>
          <p>Is it currently in view? {isInView ? "Yes" : "No"}</p>
          <p>Has it been seen? {hasBeenSeen ? "Yes" : "No"}</p>
        </div>
      </div>
        */}
    </div>
  );
};
