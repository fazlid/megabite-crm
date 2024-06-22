"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/authentication/auth';
import userStore from '@/stores/userStore';

export default function useAuthorization() {
  const { isAuth, user, setUser } = userStore();
  const { data } = useCurrentUser() || {};
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const router = useRouter();
  
  useEffect(() => {
    console.log('called useAuthorization', data);
    if (data) {
      setUser(data);
      console.log(isAuth, 'isAuth');
      console.log(user, 'user');
    }
  }, [data]);

  useEffect(() => {
    if (!accessToken) {
      router.push('/signin');
    }
  }, []);
}

