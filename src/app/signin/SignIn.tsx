"use client"

import s from './SignIn.module.scss'
import {useState} from 'react'
import Link from 'next/link'
import {useForm, SubmitHandler} from 'react-hook-form'
import CustomInput from '@/components/UI/CustomInput/CustomInput'
import { ILogin } from '@/types/definitions'

import { useCurrentUser, useLoginMutation } from '@/authentication/auth'
import {useRouter} from 'next/navigation'

import { errorMessage } from '@/authentication/errorMessage'
import CustomBtn from '@/components/UI/CustomBtn/CustomBtn'


const Login = () => {
  console.log("SignIn.tsx отрисовался")

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

const loginUser:SubmitHandler<ILogin> = async (userData) => {
  try {
    await loginMutation.mutateAsync(userData);
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
          />
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
          <CustomBtn text="Вход" width={200} height={45} disabled={!isValid} mg="auto"/>
        </form>
        <div className={s.enter_info}>
          {error && <h3 className={s.enter_info_error}>{error}</h3>}
          <p className={s.enter_info_text}>Нет аккаунта?</p>
          <Link href="/signup" className={s.enter_info_link}>Зарегистрироваться</Link>
        </div>
      </div>
    
    </>
  )
}

export default Login