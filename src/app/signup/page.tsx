"use client"
import React, { useEffect, useState, ReactElement} from 'react'
import dynamic from 'next/dynamic';

import SignUp from './SignUp' // оригинальный SignUp

import userStore from '@/stores/userStore';// хранилище

const MyComponent = dynamic(() => import('@/templates/authentication/version-1/SignUp'), {//шаблон signUp1
  loading: () => <p>Loading...</p>,
});

 function Page() {
  const {test} = userStore();

  return (
    <>
     {test === true ? <MyComponent/> : test === false ? <SignUp /> : <p>loading...</p> }
    </>
  )
}
export default Page