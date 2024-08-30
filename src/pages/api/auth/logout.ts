import type { APIRoute } from 'astro'
import { logout } from 'src/services/api/auth'

export const POST: APIRoute = async ({  cookies }) => {
  try {
  
  await logout();
  cookies.delete('session');
  return new Response('success', { status: 200 })
    
  } catch (error:any) {
    return new Response(JSON.stringify({ error }), { status: error.code })
  }
}