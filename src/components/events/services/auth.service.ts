import { API_STUB_LOCAL } from '../../../consts';
import type { UserSession } from '../types/user-session.type';
import type { ApiCall } from './types';
import { jwtDecode } from "jwt-decode";

export type AuthData = {
  email: string;
  password: string;
}
export type SessionResponse= {
  accessToken: string;
  refreshToken: string;
};

export async function authLogin(authData: AuthData): Promise<UserSession | string | null> {
  console.debug("Logging in...");
  const endpoint = `${API_STUB_LOCAL}/api/auth/session`;

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const apiResp = await resp.json() as ApiCall<SessionResponse>;

    if (apiResp.code === 200) {
      return jwtDecode<UserSession>(apiResp.data.accessToken);
    }
    
    if (apiResp.code === 401) {
      return apiResp.message;
    }
    
  } catch (error) {
    console.log(error);
  }
  return null;
}
