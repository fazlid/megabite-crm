"use client";
import userStore from "@/stores/userStore";
import Link from "next/link";
import s from "./Profile.module.scss";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import CustomBtn from "@/components/UI/CustomBtn/CustomBtn";
import Cookies from 'js-cookie';

function Profile() {
  console.log("Profile.tsx отрисовался")
  const router = useRouter();
  const { isAuth, logout, user, test, setTest } = userStore();

  const links = [
    { id: 1, title: "Мои заказы" },
    { id: 2, title: "Настройки" },
  ];

  const logoutUser = useCallback(() => {
    
    logout();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/signin");
  }, [logout, router])

  
  
  const changeTemplate =() => {
    setTest(!test)
  }

  return (
    <div className={s.profile}>
      <div className="container">
        <h1 className={s.profile_title}>{user?.username}</h1>
        <ul className={s.profile_list}>
          {links.map((link) => (
            <li key={link.id}>
              <Link href="" className={s.profile_link}>{link.title}</Link>
            </li>
          ))}
        </ul>
        {isAuth && (
          <CustomBtn
            text="Выйти"
            width={117}
            height={43}
            mt="auto"
            onClick={logoutUser}
          />
        )}
        <input type="checkbox" onClick={changeTemplate} />
      </div>
    </div>
  );
}
export default React.memo(Profile);

