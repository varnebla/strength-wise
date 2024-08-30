import type { APIRoute } from 'astro'

import { login } from 'src/services/api/auth'

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
  console.log('oleeee')

  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response("Es necesario añadir un correo electrónico y una contraseña", { status: 400 });
  }

  const session = await login(email, password);
  if(session) {
    cookies.set('session', session, {
      path: '/',
      expires: new Date(session.expire),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });
    return new Response('success', { status: 200 })
  } 
  return new Response('error', { status: 400 })
    
  } catch (error:any) {
    return new Response(JSON.stringify({ error }), { status: error.code })
  }
}