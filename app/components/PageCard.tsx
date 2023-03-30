import type { PropsWithChildren } from "react";

interface PageCardProps extends PropsWithChildren {
  title: string;
}

export function PageCard({ children, title }: PageCardProps) {
  return (
    <div className="bg-white drop-shadow-default mt-4 rounded-lg">
      <div className="py-6 px-16 border-b border-gray-200">
        <h3 className="text-2xl text-gray-800 ">{title}</h3>
      </div>
      {children}
    </div>
  );
}
