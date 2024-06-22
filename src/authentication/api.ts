import axios from 'axios'
import Cookies from 'js-cookie';

// добавляем базовый путь для axios
const api = axios.create({
    baseURL: process.env.VITE_BASE_URL || 'https://reactapi.pythonanywhere.com/api/v1/'
})


api.interceptors.request.use( // перехватсчик запросов для дополнения запросов перед отправкой

    // эта функция будет вызываться перед каждой оправкой запроса
    (config) => { // объект конйигураций запроса (URL,метод,заголовки и т.д.)

            // const accessToken = localStorage.access_token // получаем токун доступа с локального хранилища
            const accessToken = Cookies.get('access_token');// получаем токун доступа с cookies
    
            if(accessToken && accessToken != null){
                // к заголовку 'Authorization' добавляется значение токена доступа в формате Bearer token
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config // возвращаем измененные конфигурации запросса
        
    },
    (error) => {
        console.log(error);
    }
)

async function refreshToken() {
    const refreshToken = Cookies.get('refresh_token');
    try {
        const res = await api.post('auth/login/refresh', { refresh: refreshToken })

        // localStorage.setItem('access_token', res.data.access)
        Cookies.set('access_token', res.data.access);

        return res.data.access

    } catch (error) {
        console.log('Ошибка обновления токенов', error);
    }
}  


//  добавляется перехватчик запросов для api, который обрабатывает каждый запрос перед его отправкой
api.interceptors.request.use(

    response => response, // первый параметр перехватчика — это функция, которая просто возвращает ответ (используется для успешных ответов)

    async error => {
        const originalRequest = error.config; //сохраняется оригинальный запрос, который вызвал ошибку

        // проверяется, если статус ответа 401 (неавторизован) и этот запрос ещё не был повторён
        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; //помечается, что запрос будет повторён

            try {
                const accessToken = await refreshToken(); // Обновляем токен
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}` //  новый токен добавляется в заголовки авторизации по умолчанию для всех последующих запросов
                return api(originalRequest) //повторяется оригинальный запрос с новым токеном
            }catch(refreshError){
                //Если возникла ошибка при обновлении токенов, перенаправляем пользователя 
                //на страницу аутентификации или обрабатываем ошибку иным способом
                console.log('Ошибка при обновлении токенов:', refreshError);

                throw refreshError;//Можно обработать ошибку по вашему усмотрению
            }

        }
        return Promise.reject(error); // Возвращаем оригинальную ошибку, если это не 401 или уже была попытка 
        //повторного запроса
    }
)

export default api


