import type { APIRoute } from 'astro'
import { register, login } from 'src/services/api/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Es necesario añadir un correo electrónico y una contraseña.' }), { status: 400, statusText: 'Error al registrar el usuario' })
    }

    //email validation

    const user = await register(email, password);
    const session = await login(email, password);

    if(user && session) {
      cookies.set('session', session, {
        path: '/',
        expires: new Date(session.expire),
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
      });
      return new Response(
        'success',
        { status: 201, statusText: 'OK' })
    }
    return new Response(JSON.stringify({ error: 'Error al registrar el usuario. Contacta con el administrador.' }), { status: 400, statusText: 'Error al registrar el usuario' })
    
  } catch (error: any) {
    let errorMessage = 'Ha habido un error al registrarte. Por favor, inténtalo más tarde.';
    if(error.response.type === 'error') {
      errorMessage = 'El correo electrónico ya está registrado.';
    }
    if(error.response.type === 'general_rate_limit_exceeded') {
      errorMessage = 'Has superado el límite de peticiones. Por favor, inténtalo más tarde.';
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: error.response.code, statusText:  errorMessage })
  }
}