import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";

interface AppAvatarProps {
  name: string;
  isSmall?: boolean;
}

export function AppAvatar({ name, isSmall = false }: AppAvatarProps) {
  const initials = name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Avatar.Root
      className={clsx(
        "flex items-center justify-center bg-green-500 rounded-full",
        {
          "w-8 h-8": isSmall,
          "w-14 h-14": !isSmall,
        }
      )}
    >
      <Avatar.Fallback>
        <span
          className={clsx("font-bold text-gray-800", {
            "text-xl": !isSmall,
          })}
        >
          {initials}
        </span>
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
