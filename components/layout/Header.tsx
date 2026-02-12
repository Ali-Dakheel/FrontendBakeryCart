"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCart } from "@/lib/hooks/useCart";
import { useUser, useLogout } from "@/lib/hooks/useAuth";
import { useMounted } from "@/lib/hooks/useMounted";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header() {
  const mounted = useMounted();
  const { openCart } = useUIStore();
  const { data: cart } = useCart();
  const { data: user } = useUser();
  const logout = useLogout();

  // Prevent hydration mismatch by only calculating on client
  const cartItemsCount = mounted ? (cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0) : 0;

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-sky/10 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20 gap-4">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Easy Bake Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl md:text-2xl font-bold leading-tight">
                <span className="text-navy">Easy</span>{" "}
                <span className="text-sky">Bake</span>
              </h1>
              <span className="text-[10px] text-navy/60 font-medium hidden sm:block">
                Artisan Bakery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/categories"
              className="text-base font-semibold text-navy hover:text-sky transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/products"
              className="text-base font-semibold text-navy hover:text-sky transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-base font-semibold text-navy hover:text-sky transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-base font-semibold text-navy hover:text-sky transition-colors"
            >
              Contact
            </Link>
            {user && (
              <Link
                href="/orders"
                className="text-base font-semibold text-navy hover:text-sky transition-colors"
              >
                Orders
              </Link>
            )}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end space-x-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Cart Button - Available to all users (guests can add items, login at checkout) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative text-navy hover:text-sky hover:bg-sky/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-sky text-white font-bold"
              >
                {cartItemsCount}
              </Badge>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-navy hover:text-sky hover:bg-sky/10"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              {user ? (
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-navy/60">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/addresses">Addresses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {logout.isPending ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-navy hover:text-sky hover:bg-sky/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetHeader>
                <SheetTitle className="font-display text-navy">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/categories"
                  className="text-base font-medium text-navy hover:text-sky transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/products"
                  className="text-base font-medium text-navy hover:text-sky transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-navy hover:text-sky transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium text-navy hover:text-sky transition-colors"
                >
                  Contact
                </Link>
                {user && (
                  <>
                    <Link
                      href="/orders"
                      className="text-base font-medium text-navy hover:text-sky transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/account/profile"
                      className="text-base font-medium text-navy hover:text-sky transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/account/addresses"
                      className="text-base font-medium text-navy hover:text-sky transition-colors"
                    >
                      Addresses
                    </Link>
                  </>
                )}
                {!user && (
                  <>
                    <Link
                      href="/login"
                      className="text-base font-medium text-navy hover:text-sky transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-base font-medium text-navy hover:text-sky transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
