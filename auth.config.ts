import Google from "@auth/core/providers/google"
import Resend from '@auth/core/providers/resend';
import { defineConfig } from 'auth-astro';
import { XataAdapter } from '@auth/xata-adapter';
import { XataClient } from 'src/xata'; 

const client = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.AUTH_GOOGLE_ID,
      clientSecret: import.meta.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: import.meta.env.AUTH_RESEND_KEY,
    })
  ],
  adapter: XataAdapter(client),
});
