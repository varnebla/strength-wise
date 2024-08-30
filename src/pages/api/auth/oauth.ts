// src/pages/oauth.js
import { OAuthProvider } from "appwrite";
import type { APIRoute } from 'astro';
import { googleOAuth } from 'src/services/api/auth';

export const POST : APIRoute= async ({ redirect, url }) => {


  // Create an OAuth token
  const redirectUrl = await googleOAuth() as string
  console.log(redirectUrl, 'redireect');

  // Redirect the end-user to the OAuth2 provider authentication
  return redirect(redirectUrl );
};