import type { APIRoute } from 'astro'
import { accountService } from '@lib/appwrite' 
import {toast} from 'vue-sonner'

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('oleeee')
    const formData = await request.formData();
    console.log(formData, 'formdata')
  
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return new Response("Es necesario añadir un correo electrónico y una contraseña", { status: 400 });
    }
    toast('El email de verificación ha sido enviado.')
  
    const response = await accountService.createVerification(import.meta.env.BASE_URL);
    return new Response(JSON.stringify({
      token: response
    }), {
      status: 200
    })
  } catch (error) {
    toast.error('Ha ocurrido un error con el envío del email de confirmación. Por favor, inténtalo más tarde.');
    return new Response(null, { status: 400 });
  }
}