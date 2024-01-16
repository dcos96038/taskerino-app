import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "icon";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  ...props
}) => {
  const theme = {
    primary: "bg-black text-white hover:bg-gray-700",
    secondary: "bg-white text-black hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-300",
    icon: "size-8 bg-white text-black hover:bg-gray-400 grid place-items-center",
  };

  return (
    <button
      type={props.type || "button"}
      className={cn(
        "h-8 px-2 rounded-md text-xs font-medium transition-colors flex gap-1 items-center",
        theme[variant],
        className,
      )}
      {...props}
    ></button>
  );
};
