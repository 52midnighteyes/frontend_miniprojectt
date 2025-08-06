"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { logoUrl } from "@/constants";

export default function Navbar() {
  const { isLogin, role, onLogOut } = useAuthStore();

  const isEventOrganizer = role.name === "EVENT_ORGANIZER";
  const isUser = role.name === "USER";

  const buttonClass =
    "bg-white border border-[#FFD700] text-[#4B3B00] hover:bg-[#FFF7CC] font-semibold";

  const renderButtons = (isMobile: boolean) => {
    const fullClass = isMobile ? `w-full ${buttonClass}` : buttonClass;

    if (isLogin) {
      let linkHref = "#";
      let label = "Dashboard";

      if (isUser) {
        linkHref = "/pages/profile";
        label = "Profile";
      } else if (isEventOrganizer) {
        linkHref = "/pages/dashboard";
        label = "Dashboard";
      }

      return (
        <>
          <Link href={linkHref}>
            <Button className={fullClass}>{label}</Button>
          </Link>
          <Button onClick={onLogOut} className={fullClass}>
            Log Out
          </Button>
        </>
      );
    }

    return (
      <>
        <Link href="/pages/auth/login">
          <Button className={fullClass}>Log In</Button>
        </Link>
        <Link href="/pages/auth/register">
          <Button className={fullClass}>Sign Up</Button>
        </Link>
      </>
    );
  };

  return (
    <header className="w-full bg-[#FFD700] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[75px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoUrl || "/fallback-logo.png"}
            alt="better-ticket-logo"
            width={60}
            height={60}
            style={{ height: "auto" }}
          />
          <span className="font-extrabold text-[#2D2D2D] text-lg hidden md:block leading-tight">
            Better Ticket
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 font-semibold text-[#2D2D2D] text-sm">
          <Link href="/pages/about-us">About Us</Link>
          <Link href="/pages/services">Services</Link>
          <Link href="/pages/teams">Teams</Link>
          <Link href="/pages/blog">Blog</Link>
        </nav>

        {/* Buttons - Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {renderButtons(false)}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-[#4B3B00]" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[300px] px-6 py-6"
            >
              <SheetHeader>
                <SheetTitle className="text-xl text-[#4B3B00]">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4 text-sm font-medium text-[#2D2D2D]">
                <Link href="/pages/about-us">About Us</Link>
                <Link href="/pages/services">Services</Link>
                <Link href="/pages/teams">Teams</Link>
                <Link href="/pages/blog">Blog</Link>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                {renderButtons(true)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
