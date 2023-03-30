import { createCookieSessionStorage, redirect } from "@remix-run/node";

type UserSession = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  password: string;
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
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      roles: ["admin"],
      password: "johndoe123",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@email.com",
      roles: ["professor"],
      password: "janedoe456",
    },
  ];

  const loggedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!loggedUser) {
    throw new Error("E-mail ou senha inválidos");
  }

  const loggedUserSession: UserSession = {
    ...loggedUser,
    accessToken: Math.random().toString(36),
  };

  return loggedUserSession;
}

export async function getUserSession(request: Request) {
  const session = await getSession(request);
  const user: User | undefined = session.get("user");
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
