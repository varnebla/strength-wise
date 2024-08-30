import { account } from '@lib/appwrite';
import { ID, OAuthProvider } from 'appwrite';

export const register = async (email: string, password: string) => {
  try {
    const response = await account.create(ID.unique(),email, password);
    return response;
    
  } catch (error: any) {
    throw new Error('error');
  }
}

export const login = async (email: string, password: string) => {
  const response = await account.createEmailPasswordSession(email, password);
  return response;
}

export const logout = async () => {
  await account.deleteSessions();
}

export const googleOAuth = () => {

}

  export const createSession = async (token: string) => {
    const response = await account.createSession(
      ID.unique(),
      token
    );
    return response
  }

  export const getUser = async () => {
    const user = await account.get();
    return user;
  }

  export const getSession = async () => {
    const session = await account.getSession('current') 
    return session
  }