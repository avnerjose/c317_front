interface HasAccessProps {
  children: React.ReactNode;
  roles?: string[];
  allowedRoles: string[] | string;
}

export function HasAccess({ children, allowedRoles, roles }: HasAccessProps) {
  if (typeof allowedRoles === "string") {
    if (roles?.includes(allowedRoles)) {
      return <>{children}</>;
    }
  } else {
    const hasAccess = allowedRoles.some((role) => roles?.includes(role));
    if (hasAccess) {
      return <>{children}</>;
    }
  }

  return null;
}
