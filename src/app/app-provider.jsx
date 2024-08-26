"use client";
import { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [borderNav, setBorderNav] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  const onScrolling = () => {
    setScrollY(window.scrollY);
    // You can also perform other actions here based on the scroll position
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useProvider() {
  return useContext(DataContext);
}
