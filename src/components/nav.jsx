// app/components/Navbar.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 text-black">
      <nav className="bg-white shadow-md">
        <div className="bg-[#f2f3f4] w-full flex justify-end items-center p-1 text-sm text-[#5d6d7e] border border-b-[#d7dbdd]">
          <div className="px-5">Tentang Farmaguru</div>
          <div className="px-5">Mitra Farmaguru</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="ml-16 mr-5 w-12 h-12 items-center flex">
                <img src="/images/logo.png" />
              </div>
              <button
                onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                className="text-muted text-sm inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Kategory
              </button>
              <div className="flex items-center w-1/2">
                <div className="relative" ref={searchRef}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <div
                    className={`absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md mt-1 p-4 transition-all duration-300 ease-in-out ${
                      isSearchFocused
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <p>Extended search container content goes here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        ref={categoryRef}
        className={`absolute left-0 right-0 bg-white shadow-md z-40 transition-all duration-300 ease-in-out ${
          isCategoryExpanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold mb-2">All Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>Category 1</div>
            <div>Category 2</div>
            <div>Category 3</div>
            <div>Category 4</div>
            <div>Category 5</div>
            <div>Category 6</div>
            <div>Category 7</div>
            <div>Category 8</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/*
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
    
    <div>
      <div className={`z-10 bg-white  sticky top-0`}>
        <div className="bg-[#f2f3f4] w-full flex justify-end items-center p-1 text-sm text-[#5d6d7e] border border-b-[#d7dbdd]">
          <div className="px-5">Tentang Farmaguru</div>
          <div className="px-5">Mitra Farmaguru</div>
        </div>
        <div
          className={`duration-50 ease-in-out ${
            scrollY > 10 ? "shadow-md" : ""
          } border border-b-[#ccd1d1] px-5`}
        >
          <div className="flex justify-between items-center py-3">
            <div className="flex flex-row items-center w-full">
              <div className="ml-16 mr-5 w-12 h-12 items-center flex">
                <img src="/images/logo.png" />
              </div>
              <div
                className={`border  ${
                  inputSearchFocus ? "border-primary" : "border-black"
                } rounded-md w-1/2`}
              >
                <div className="flex flex-row items-center w-full">
                  <IoIosSearch className="mx-3 w-6 h-6 text-black" />

                  <input
                    onFocus={() => setInputSearchFocus(true)}
                    onBlur={() => setInputSearchFocus(false)}
                    className="w-full p-2 text-muted text-sm border-none  focus:ring-0 focus:outline-none"
                    placeholder="Cari kebutuhan kamu"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center text-black mr-12">
              <div className="rounded-lg border py-2 px-3 text-sm">Masuk</div>
              <div className="mx-2" />
              <div className="rounded-lg border py-2 px-3 text-sm">Daftar</div>
            </div>
          </div>
        </div>
      </div>
      <div>aaa</div>
    </div>
  );
};
*/
