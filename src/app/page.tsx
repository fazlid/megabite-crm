"use client";
import userStore from "@/stores/userStore";
import { useCurrentUser, useLoginMutation } from '@/authentication/auth'
import React, { useEffect, useState, useCallback } from "react";

function Home() {
  console.log('Home отрисовался');

  const {data} = useCurrentUser();
  const {setUser} = userStore();

  useEffect(()=>{

      setUser(data);

  }, [data])

  return <main className="main">
    
  </main>;
}

export default React.memo(Home);
