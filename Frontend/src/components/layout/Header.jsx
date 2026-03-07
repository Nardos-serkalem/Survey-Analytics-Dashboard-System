import React from 'react'
import { MdDarkMode } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from "react";
function Header() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    setDarkMode(true);
  } else {
    document.documentElement.classList.remove("dark");
    setDarkMode(false);
  }
}, []);

  const darkmodeToggle = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);

  }
  return (
    <header className="h-16 w-full bg-primary shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-textprimary" >
        Dashboard
      </h1>

      <div className="flex items-center space-x-6">
        

        <input
          type="text"
          placeholder="Search..."
          className="w-[400px] px-3 py-1.5 text-textprimary border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MdDarkMode onClick={darkmodeToggle} className='h-[30px] w-[30px]' />  
        <VscAccount className='h-[30px] w-[30px]' />
      </div>

    </header>
  )
}

export default Header