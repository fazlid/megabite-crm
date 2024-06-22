"use client";

import Link from "next/link";
import React from "react";

import { UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import userStore from "@/stores/userStore";
import NavSearch from "../NavSearch/NavSearch";

function Navbar() {
  console.log("Navbar отрисовался");

  const { isAuth, user } = userStore();

  return (
    <nav className="nav border-b border-black py-[20px]">
      <div className="container flex justify-between items-center">
        <Link href="/">Logo</Link>
        {isAuth && <NavSearch />}
        {isAuth && (
          <ul className="nav__list flex gap-[50px]">
            <li>
              <Link
                className="nav__link flex items-center gap-[10px]"
                href="/profile"
              >
                <UserIcon className="w-[25px]" />
                <span>{user?.username}</span>
              </Link>
            </li>
            <li>
              <Link
                className="nav__link flex items-center gap-[10px]"
                href="/favorites"
              >
                <HeartIcon className="w-[25px]" />
                <span>favorites</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
