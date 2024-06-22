import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('access_token')?.value;

    // Страницы регистрации и входа
    if (pathname === '/signin' || pathname === '/signup') {
        if (token) {
            // Если пользователь аутентифицирован, перенаправляем на главную страницу
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    // Все другие страницы
    if (!token) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    // matcher: ['/((?!_next|static|signin|signup).*)'],// middleware будет применяться ко всем маршрутам кроме тех которые начинаются с signin, signup и статические файлы _next, static
    matcher: ['/((?!_next|static).*)'],// middleware будет применяться ко всем маршрутам кроме тех которые начинаются с signin, signup и статические файлы _next, static
    
    
};
