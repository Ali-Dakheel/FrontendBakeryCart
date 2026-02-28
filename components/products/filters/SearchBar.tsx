"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative flex items-center group">
      <Search className="absolute start-4 h-4 w-4 text-muted-foreground group-focus-within:text-sky transition-colors pointer-events-none" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 ps-11 pe-10 border border-sky/25 focus:border-sky bg-white shadow-sm rounded-xl text-sm placeholder:text-muted-foreground/60 hover:border-sky/40 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
        dir="auto"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute end-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
