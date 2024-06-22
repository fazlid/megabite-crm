"use client"
import api from "./api"
import { IRegister, ILogin } from "@/types/definitions"
import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from 'js-cookie';

//функция возвращает результат вызова хука useMutation.
// Этот хук выполняет мутацию, отправляя данные о регистрации на сервер
export const useRegisterMutation = () => {
    return useMutation((userData: IRegister) =>api.post("auth/register", userData));
  };
  
  // функция которая также возвращает результат вызова хука useMutation
  export const useLoginMutation = () => {
    return useMutation(
        (userData: ILogin) => api.post("auth/login", userData), // "auth/login" - остаток строчки URL запроса
      //добавили обработчик onSuccess, который вызывается в случае успешного выполнения запроса. 
        {
      onSuccess: ({ data }) => {
          // проверяем наличие поля data.access в ответе от сервера
          if (data && data.access ) {
            console.log(123, data);
              // Если оно есть, то токены доступа и обновления сохраняются в cookies.
              Cookies.set('access_token', data.access);
              Cookies.set('refresh_token', data.refresh);
          }
        },
      }
    );
  };
  


export const useCurrentUser = () => {

  const accessToken = Cookies.get('access_token');

  return useQuery(
    ['currentUser'],
    async () => {
      const res = await api.get('auth/users/profile')

      return res.data
    }, 
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  )

}
