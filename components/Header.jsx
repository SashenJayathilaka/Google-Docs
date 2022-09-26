/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import Image from "next/image";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <IconButton className="hidden md:inline-flex h-20 w-20 border-0">
        <MenuIcon className="text-gray-500 text-3xl" />
      </IconButton>
      <Image
        height="50"
        width="40"
        src="https://i.postimg.cc/sXXJzSPt/Google-Docs-max-1100x1100.png"
        objectFit="contain"
      />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl font-semibold">
        Docs
      </h1>

      <div
        className="mx-5 md:mx-20  flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg 
      focus-within:text-gray-600 focus-within:shadow-md"
      >
        <SearchIcon className="text-3xl text-gray-500" />
        <input
          placeholder="search"
          type="text"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <IconButton className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-0">
        <AppsIcon className="text-gray-500 text-3xl" />
      </IconButton>

      <img
        loading="lazy"
        src={user?.photoURL}
        alt=""
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        onClick={logout}
      />
    </header>
  );
};

export default Header;
