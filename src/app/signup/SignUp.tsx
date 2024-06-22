"use client"
import s from './SignUp.module.scss'
import {useState} from 'react'
import Link from 'next/link'

import {useRouter } from 'next/navigation'


import {useForm, SubmitHandler} from 'react-hook-form'
import CustomInput from '@/components/UI/CustomInput/CustomInput'
import { IRegister } from '@/types/definitions'

import { useRegisterMutation } from '@/authentication/auth'

import { errorMessage } from '@/authentication/errorMessage'
import CustomBtn from '@/components/UI/CustomBtn/CustomBtn'

const Register = () => {

  console.log("SignUp.tsx отрисовался")

  const [error, setError] = useState('')
  const registerMutation = useRegisterMutation()

  const router = useRouter();

 const {
  register, // функция которая позволяет регистрировать поле
  handleSubmit, // функция для подтверждения формы
  reset, //функция которая сбрасывает форму
  watch,
  formState: {
    errors,
    isValid,
  } // Объект с информацией об ошибках
 } = useForm<IRegister>({mode: 'onChange'})

 const password = watch('password')
 const password2 = watch('password2')

const registerUser:SubmitHandler<IRegister> = async (data) => {

  try {
    await registerMutation.mutateAsync(data);
    setError('')
    router.push('/signin')
  } catch (error) {
    console.log(error);
    setError('')
    setError(errorMessage(error))
  }
  reset();
}
  return (
    <>
      <div className={s.enter}>
        <h1 className={s.enter_title}>Регистрация</h1>
        <form className={s.enter_form} onSubmit={handleSubmit(registerUser)}>
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
            label="Ваше email"
            type='email'
            holder="Email"
            errors={errors.email}
            register={
              register('email', {
                required: 'Поле обязательно для заполнения',
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
          <CustomInput 
            label="Подтвердите пароль"
            type='password'
            holder="Пароль"
            errors={errors.password2}
            register={
              register('password2', {
                required: 'Поле обязательно для заполнения',
                validate: value => value === password || 'Пароли не совпадают',
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })
            }
          />
          <CustomBtn text="Зарегистрироваться" width={200} height={60} disabled={!isValid} mg="auto"/>
        </form>
        <div className={s.enter_info}>
          {error && <h3 className="enter__info-error text-[red] text-center">{error}</h3>}
          <p className={s.enter_info_text}>Есть аккаунт?</p>
          <Link href="/signin" className={s.enter_info_link}>Войти</Link>
        </div>
      </div>
    </>
  )
}

export default Register