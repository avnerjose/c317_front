import { createCookieSessionStorage, redirect } from "@remix-run/node";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { api } from "~/services/api";

type UserSession = {
  id: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
};

type User = Omit<UserSession, "accessToken">;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "school_app_session",
    secure: process.env.NODE_ENV === "production",
    secrets: ["fasdfa"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  userSession,
}: {
  request: Request;
  userSession: UserSession;
}) {
  const session = await getSession(request);
  session.set("user", userSession);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

export async function verifyLogin(email: string, password: string) {
  try {
    const { data } = await api.post<{ token: string }>("/login", {
      email,
      password,
    });
    const user = jwtDecode(data.token) as User;

    const loggedUserSession: UserSession = {
      ...user,
      accessToken: data.token,
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    return loggedUserSession;
  } catch (e) {
    throw new Error("E-mail ou senha inválidos");
  }
}

export async function getUserSession(request: Request) {
  const session = await getSession(request);
  const user: UserSession | undefined = session.get("user");
  return user;
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
