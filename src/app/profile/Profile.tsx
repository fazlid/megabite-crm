"use client";
import userStore from "@/stores/userStore";
import Link from "next/link";
import s from "./Profile.module.scss";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import CustomBtn from "@/components/UI/CustomBtn/CustomBtn";
import Cookies from "js-cookie";
import clsx from "clsx";

function Profile() {
  console.log("Profile.tsx отрисовался");
  const router = useRouter();
  const { 
    isAuth, 
    logout, 
    user,
    profileLinkActive,
    setProfileLinkActive,
    signinTemplateCheckbox, 
    setSigninTemplateCheckbox 
  } = userStore();

  const links = [
    { id: 1, title: "Мои заказы" },
    { id: 2, title: "Настройки" },
  ];

  // запоминаем checkbox
  useEffect(()=> {

    const statusCheckbox = document.querySelector(`input[name='template'][value='template-1']`) as HTMLInputElement
    if(statusCheckbox){ 
      statusCheckbox.checked = signinTemplateCheckbox
    }

  }, [signinTemplateCheckbox, profileLinkActive]);
  

  const logoutUser = useCallback(() => {
    logout();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    router.push("/signin");
  }, [logout, router]);

  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const checkbox = e.target as HTMLInputElement;
    setSigninTemplateCheckbox(checkbox.checked)
    
  };  

  return (
    <div className={s.profile}>
      <div className="container">
        <h1 className={s.profile_title}>{user?.username}</h1>
        <div className={s.profile_content}>
          <div className={s.profile_left}>
            <ul className={s.profile_list}>
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href=""
                    className={clsx(s.profile_link, {
                      "active !text-[#545457] !font-black":
                        profileLinkActive == link.title,
                    })}
                    onClick={() => setProfileLinkActive(link.title)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.profile_right}>
            <div className={s.profile_orders}></div>
            {profileLinkActive == "Настройки" && (
              <>
                <div className={s.profile_settings}>
                  <CustomBtn
                    text="Выйти из системы"
                    width={217}
                    height={43}
                    mt="auto"
                    onClick={logoutUser}
                  />
                  <label>
                    <span>сменить шаблон </span>
                    <input type="checkbox" name="template" value="template-1" onChange={e => changeCheckBox(e)} />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Profile);

