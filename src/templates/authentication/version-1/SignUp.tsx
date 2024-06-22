"use client"
// import CustomInputVersion1 from '@/templates/UI/CustomInput/version-1/CustomInput'
// import CustomBtnVersion1 from '@/templates/UI/CustomBtn/version-1/CustomBtn'
import s from './Auth.module.scss'

import CustomInput from '@/components/UI/CustomInput/CustomInput'
import CustomBtn from '@/components/UI/CustomBtn/CustomBtn'

import dynamic from 'next/dynamic';
import {useState} from 'react'
import Link from 'next/link'

import {useRouter } from 'next/navigation'


import {useForm, SubmitHandler} from 'react-hook-form'
import { IRegister } from '@/types/definitions'

import { useRegisterMutation } from '@/authentication/auth'

import { errorMessage } from '@/authentication/errorMessage'


import userStore from '@/stores/userStore'


const DynamicInput = dynamic(() => import('@/templates/UI/CustomInput/version-1/CustomInput'), {
  loading: () => <p>Loading...</p>,
});
const DynamicBtn = dynamic(() => import('@/templates/UI/CustomBtn/version-1/CustomBtn'), {
  loading: () => <p>Loading...</p>,
});


const Register = () => {
  const {test} = userStore()

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
          
          {test  ? <DynamicInput 
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
        : <CustomInput 
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
        }

        {
          test ? 
          <DynamicInput 
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
          : 
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
        }
          {test ? <DynamicInput 
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
        
          {test ? <DynamicInput 
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
        :
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
        }
        {test === true ? <DynamicBtn text="Зарегистрироваться" width={248} height={60} disabled={!isValid} mg="auto"/> : <CustomBtn text="Зарегистрироваться" width={248} height={60} disabled={!isValid} mg="auto"/> }
        </form>
        <div className={s.enter_info}>
          {error && <h3 className={s.enter_info_error}>{error}</h3>}
          <p className={s.enter_info_text}>Есть аккаунт?</p>
          <Link href="/signin" className={s.enter_info_link}>Войти</Link>
        </div>
      </div>
    </>
  )
}

export default Register