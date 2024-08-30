import type { APIRoute } from 'astro'
import { createSession } from 'src/services/api/auth'

export const GET: APIRoute = async (context) => {
  try {
    console.log( context.url.searchParams);
    const userId = context.url.searchParams.get("userId");
  const secret = context.url.searchParams.get("secret");
  console.log(userId, secret);

    // const session = await createSession(token);

    // console.log(session);
    return new Response(JSON.stringify({ userId, secret }), { status: 200, statusText: 'OK' })  
    return context.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Error al crear la sesión.' }), { status: 400, statusText: 'Error al crear la sesión.' })
  }
}