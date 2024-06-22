"use client"
import dynamic from 'next/dynamic';
import React, {useState, useEffect, ReactElement} from 'react'

import SignIn from './SignIn'
import userStore from '@/stores/userStore';
import Loading from '@/components/Loader/Loading';

const MyComponent = dynamic(() => import(`@/templates/authentication/version-1/SignIn`), {//шаблон signUp1
  loading: () => <Loading/>,
});

 function Page() {

  const [Component, setComponent] = useState<ReactElement | null>(null)

  const {signinTemplateCheckbox} = userStore();

  useEffect(()=> {

    if(!signinTemplateCheckbox){
      setComponent(<SignIn/>)
    }
    else {
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