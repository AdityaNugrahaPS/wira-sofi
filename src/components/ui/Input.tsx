import { twMerge } from "tailwind-merge";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge("border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400", className)}
      {...props}
    />
  );
}
