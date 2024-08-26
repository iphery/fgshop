"use client";

import { useLayoutEffect, useState } from "react";
import { useProvider } from "@/app/app-provider";
import { IoIosSearch } from "react-icons/io";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useProvider();
  const [inputSearchFocus, setInputSearchFocus] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`z-50 bg-white  sticky top-0`}>
      <div className="bg-gray w-full flex justify-end items-center p-1 text-sm">
        <div className="px-5">Tentang Farmaguru</div>
        <div className="px-5">Mitra Farmaguru</div>
      </div>
      <div
        className={`duration-50 ease-in-out ${
          scrollY > 10 ? "border-b border-gray shadow-sm" : ""
        } border-border px-5`}
      >
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-row items-center w-full">
            <div className="mr-5 w-12 h-12 items-center flex">
              <img src="/images/logo.png" />
            </div>
            <div
              className={`border  ${
                inputSearchFocus ? "border-primary" : "border-black"
              } rounded-lg w-1/2`}
            >
              <div className="flex flex-row items-center">
                <IoIosSearch className="mx-3 w-6 h-6" />
                <div className="text-sm p-2">
                  <input
                    onFocus={() => setInputSearchFocus(true)}
                    onBlur={() => setInputSearchFocus(false)}
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
                    placeholder="Cari"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="rounded-lg border py-2 px-3 text-sm">Masuk</div>
            <div className="mx-2" />
            <div className="rounded-lg border py-2 px-3 text-sm">Daftar</div>
          </div>
        </div>
        <div className="flex  flex-row text-sm space-x-5 mb-3">
          <div>Kategori 1</div>
          <div>Kategori 2</div>
          <div>Kategori 3</div>
          <div>Kategori 4</div>
        </div>
      </div>
    </div>
  );
};
