"use client";
import { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [borderNav, setBorderNav] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const [reachedBottom, setReachedBottom] = useState(false);
  //data product
  const [products, setProducts] = useState([]);
  const [loadProduct, setLoadProduct] = useState(true);
  const [lastPageProduct, setLastPageProduct] = useState(1);
  const [currentPageProduct, setCurrentPageProduct] = useState(1);

  const onScrolling = () => {
    setScrollY(window.scrollY);

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("You've reached the bottom of the page");
      setReachedBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrolling);

    // Cleanup function to remove the event listener when the component unmounts

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        borderNav,
        setBorderNav,
        scrollY,
        setScrollY,
        products,
        setProducts,
        loadProduct,
        setLoadProduct,
        lastPageProduct,
        setLastPageProduct,
        currentPageProduct,
        setCurrentPageProduct,
        reachedBottom,
        setReachedBottom,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useProvider() {
  return useContext(DataContext);
}
