interface HasAccessProps {
  children: React.ReactNode;
  role?: string;
  allowedRoles: string[] | string;
}

export function HasAccess({ children, allowedRoles, role }: HasAccessProps) {
  if (typeof allowedRoles === "string") {
    if (role === allowedRoles) {
      return <>{children}</>;
    }
  } else {
    const hasAccess = allowedRoles.some((item) => item === role);
    if (hasAccess) {
      return <>{children}</>;
    }
  }

  return null;
}
