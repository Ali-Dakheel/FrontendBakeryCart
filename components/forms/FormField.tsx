import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  autoComplete?: string;
  helperText?: React.ReactNode;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  register,
  autoComplete,
  helperText,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {helperText}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={Icon ? "pl-10" : ""}
          autoComplete={autoComplete}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
