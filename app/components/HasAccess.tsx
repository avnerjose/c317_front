interface HasAccessProps {
  children: React.ReactNode;
  roles?: string[];
  allowedRole: string;
}

export function HasAccess({ children, allowedRole, roles }: HasAccessProps) {
  if (roles?.includes(allowedRole)) {
    return <>{children}</>;
  }

  return null;
}
