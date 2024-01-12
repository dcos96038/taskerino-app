import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      type={props.type || "button"}
      className={cn(
        "py-1 px-2 bg-black rounded-md text-white text-sm font-medium hover:bg-gray-700",
        className,
      )}
      {...props}
    ></button>
  );
};
