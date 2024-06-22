"use client"
import dynamic from 'next/dynamic';

import SignIn from './SignIn'
import userStore from '@/stores/userStore';


const SignInVersion1 = dynamic(() => import('@/templates/authentication/version-1/SignIn'), {
  loading: () => <p>Loading...</p>,
});

 function Page() {
  const {test} = userStore();

  return (
    <>
    {test ? <SignInVersion1/> : <SignIn/>}
    </>
  )
}

export default Page 