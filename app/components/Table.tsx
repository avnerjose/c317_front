interface ComponentWithChildrenProps {
  children?: React.ReactNode;
  className?: string;
}

export function Table({ children }: ComponentWithChildrenProps) {
  return (
    <table className="border-collapse border rounded-t-sm outline outline-1 outline-gray-100 overflow-hidden">
      {children}
    </table>
  );
}

export function THead({ children }: ComponentWithChildrenProps) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function Th({ children }: ComponentWithChildrenProps) {
  return (
    <th className="border border-gray-200 text-left px-4 py-3">{children}</th>
  );
}

export function Td({ children, className }: ComponentWithChildrenProps) {
  return (
    <td
      className={
        "items-center gap-2 border border-gray-200 px-4 py-3 " + className
      }
    >
      {children}
    </td>
  );
}
