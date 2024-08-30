import { Client, Account } from 'appwrite';
import type { AstroCookies } from 'astro';

const client: Client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('669ed6e4001888564282');

export const account: Account = new Account(client);