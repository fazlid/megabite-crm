"use client"
import React, { useEffect, useState, ReactElement} from 'react'
import dynamic from 'next/dynamic';

import SignUp from './SignUp' // оригинальный SignUp

import userStore from '@/stores/userStore';// хранилище
import Loading from '@/components/Loader/Loading';

const MyComponent = dynamic(() => import(`@/templates/authentication/version-1/SignUp`), {//шаблон signUp1
  loading: () => <Loading/>,
});

 function Page() {

  const [Component, setComponent] = useState<ReactElement | null>(null)

  const {signinTemplateCheckbox} = userStore();

  useEffect(()=> {

    if(!signinTemplateCheckbox){
      console.log(1);
      setComponent(<SignUp/>)
    }
    else {
      console.log(2);
      setComponent(<MyComponent/>)
    }

  }, [signinTemplateCheckbox])

  return (
    <>
     {Component ? Component : <Loading/> }
    </>
  )
}
export default Page