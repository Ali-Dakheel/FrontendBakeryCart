"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 h-10 rounded-full border border-sky/25 bg-white px-4 shadow-sm hover:border-sky/50 focus-within:border-sky transition-colors">
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="auto"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 min-w-0"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
