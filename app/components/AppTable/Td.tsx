interface ComponentWithChildrenProps {
  children?: React.ReactNode;
  className?: string;
}

export function Td({ children, className }: ComponentWithChildrenProps) {
  return (
    <td
      className={
        "items-center gap-2 border border-gray-200 px-4 py-3 text-gray-800 " +
        className
      }
    >
      {children}
    </td>
  );
}
