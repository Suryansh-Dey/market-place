"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./common/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import { Search, Calendar, Ticket, Map, Briefcase, LayoutDashboard, Shield, Home, Package } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Role-based navigation items
  const getNavigationItems = () => {
    if (!session) {
      return [
        { href: "/explore", label: "Explore", icon: Map },
        { href: "/destinations", label: "Destinations", icon: Home },
      ];
    }

    const userRole = session.user?.role || "user";
    
    switch (userRole) {
      case "user":
        return [
          { href: "/trips/upcoming", label: "My Trips", icon: Calendar },
          { href: "/bookings", label: "Bookings", icon: Ticket },
          { href: "/explore", label: "Explore", icon: Map },
          { href: "/saved", label: "Saved", icon: Home },
        ];
      case "vendor":
        return [
          { href: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/vendor/trips", label: "My Packages", icon: Package },
          { href: "/vendor/bookings", label: "Bookings", icon: Ticket },
          { href: "/vendor/analytics", label: "Analytics", icon: Briefcase },
        ];
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Admin Panel", icon: Shield },
          { href: "/admin/users", label: "Users", icon: Home },
          { href: "/admin/vendors", label: "Vendors", icon: Briefcase },
          { href: "/admin/reports", label: "Reports", icon: LayoutDashboard },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavigationItems();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div
        className={`
          mx-auto max-w-7xl rounded-full transition-all duration-500
          ${scrolled 
            ? "backdrop-blur-xl bg-background/60 shadow-2xl border border-border/40" 
            : "backdrop-blur-lg bg-background/40 shadow-lg border border-border/20"
          }
        `}
      >
        <div className="px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg hover:scale-105 transition-transform duration-200 shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explorify
            </span>
          </Link>

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 hover:scale-105
                    ${isActive 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div 
              className={`
                relative w-full transition-all duration-300
                ${searchFocused ? "scale-105" : ""}
              `}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="
                  w-full pl-10 pr-4 py-2.5 rounded-full
                  bg-background/50 backdrop-blur-sm
                  border border-border/50
                  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                  placeholder:text-muted-foreground/70 text-sm
                  transition-all duration-200
                "
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 shrink-0">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              <>
                {/* Show vendor button only for regular users */}
                {session.user?.role === "user" && (
                  <Link href="/vendor" className="hidden sm:block">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-full hover:bg-accent/50 transition-all duration-200"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Become a Vendor
                    </Button>
                  </Link>
                )}
                <ProfileMenu user={session.user} />
              </>
            ) : (
              <>
                <Link href="/vendor" className="hidden sm:block">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="rounded-full hover:bg-accent/50 transition-all duration-200"
                  >
                    Become a Vendor
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button 
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Sign in
                  </Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      {session && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/40 px-4 py-2">
          <nav className="flex items-center justify-around">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center gap-1 p-2 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
