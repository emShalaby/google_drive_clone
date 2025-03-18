import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Spinner({ size = "md", className = "", text }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <Loader2
          className={`animate-spin text-purple-500 ${sizeClasses[size]}`}
        />
        {text && <p className="mt-2 text-sm text-gray-400">{text}</p>}
      </div>
    </div>
  );
}
