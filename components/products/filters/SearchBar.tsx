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
    <div className="relative group">
      <Search className="absolute left-4 rtl:right-4 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-sky/60 transition-colors group-focus-within:text-sky" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 rtl:pr-12 rtl:pl-4 h-14 text-base bg-white/80 backdrop-blur-sm border-2 border-sky/20 focus:border-sky focus:bg-white shadow-sm hover:shadow-md transition-all"
        dir="auto"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-sky/10 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-navy/60" />
        </button>
      )}
    </div>
  );
}
