"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, X, Home, User, Briefcase, Mail, PictureInPicture } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Me", href: "/about", icon: User },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Gallery", href: "/gallery", icon: PictureInPicture },
    { name: "Get in Contact", href: "/contact", icon: Mail, primary: true },
  ];

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-7 left-4 z-50 md:hidden h-15 w-15 shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col justify-between h-auto">
        <DrawerHeader className="pt-4">
          <DrawerTitle className="text-xl sm:text-2xl font-bold">Let&#39;s Make it Monumental</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-3 mt-6 px-4 flex-grow">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={item.primary ? "default" : "ghost"}
              className={`w-full justify-start text-base sm:text-lg ${
                item.primary ? "py-6 sm:py-8 my-4 sm:mt-6" : "hover:bg-secondary py-6 sm:py-8"
              }`}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </nav>
      
        <DrawerClose asChild className="mx-3 pb-4 pt-4 my-4">
          <Button variant="destructive" className="py-6 sm:py-8" onClick={() => setOpen(false)}>
            <X className="mr-2 h-5 w-5" />
            Close
          </Button>
        </DrawerClose>
   
      </DrawerContent>
      
    </Drawer>
  );
}
