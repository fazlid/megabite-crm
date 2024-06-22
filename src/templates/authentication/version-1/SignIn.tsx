"use client"


// import CustomInput from '@/templates/UI/CustomInput/version-1/CustomInput'
// import CustomBtn from '@/templates/UI/CustomBtn/version-1/CustomBtn'
import s from './Auth.module.scss'

import CustomInput from '@/components/UI/CustomInput/CustomInput'
import CustomBtn from '@/components/UI/CustomBtn/CustomBtn'

import {useState} from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic';

import {useForm, SubmitHandler} from 'react-hook-form'
import { ILogin } from '@/types/definitions'

import { useLoginMutation } from '@/authentication/auth'
import {useRouter} from 'next/navigation'

import { errorMessage } from '@/authentication/errorMessage'
import userStore from '@/stores/userStore'

const DynamicInput = dynamic(() => import('@/templates/UI/CustomInput/version-1/CustomInput'), {
  loading: () => <p>Loading...</p>,
});
const DynamicBtn = dynamic(() => import('@/templates/UI/CustomBtn/version-1/CustomBtn'), {
  loading: () => <p>Loading...</p>,
});



const Login = () => {
  const {test} = userStore()
  const [error, setError] = useState('')
  const loginMutation = useLoginMutation()
  const router = useRouter();

 const {
  register, 
  handleSubmit, 
  reset, 
  watch,
  formState: {
    errors,
    isValid,
  }
 } = useForm<ILogin>({mode: 'onChange'})

const loginUser:SubmitHandler<ILogin> = async (data) => {
  try {
    await loginMutation.mutateAsync(data);
    setError('')
    router.push('/')
  } catch (error) {
    setError('')
    setError(errorMessage(error, 'login'))
    console.log(error);
  }
  reset();
}
  return (
    <>
      <div className={s.enter}>
        <h1 className={s.enter_title}>Вход</h1>
        <form className={s.enter_form} onSubmit={handleSubmit(loginUser)}>
         {test === true ? <DynamicInput 
            label="Ваше username"
            type='text'
            holder="Username"
            errors={errors.username}
            register={
              register('username', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа'
                }
              })
            }
          />
        : 
        <CustomInput 
            label="Ваше username"
            type='text'
            holder="Username"
            errors={errors.username}
            register={
              register('username', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа'
                }
              })
            }
          />}
          {
            test === true ? <DynamicInput 
            label="Ваше пароль"
            type='password'
            holder="Пароль"
            errors={errors.password}
            register={
              register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })
            }
          />
          : 
          <CustomInput 
            label="Ваше пароль"
            type='password'
            holder="Пароль"
            errors={errors.password}
            register={
              register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })
            }
          />
          }
          
          {
            test ? <DynamicBtn text="Вход" width={200} height={45} disabled={!isValid} mg="auto"/> 
            : <CustomBtn text="Вход" width={200} height={45} disabled={!isValid} mg="auto"/> 
          }
          
        </form>
        <div className={s.enter_info}>
          {error && <h3 className="enter__info-error text-[red] text-center">{error}</h3>}
          <p className={s.enter_info_text}>Нет аккаунта?</p>
          <Link href="/signup" className={s.enter_info_link}>Зарегистрироваться</Link>
        </div>
      </div>
    
    </>
  )
}

export default Login