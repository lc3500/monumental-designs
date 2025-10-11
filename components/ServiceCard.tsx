"use client";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  drawerTitle: string;
  drawerContent: React.ReactNode;
  buttonText?: string;
  className?: string;
}

export function ServiceCard({ title, subtitle, drawerTitle, drawerContent, buttonText = "View More", className = "" }: ServiceCardProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div className={`bg-muted-foreground rounded-lg p-5 flex flex-col pt-10 pl-10${className}`}>
      <h1 className="text-white text-3xl font-bold mb-6 font-serif text-left">{title}</h1>
      <h2 className="text-white flex-grow mb-4 text-left">{subtitle}</h2>
      <Drawer snapPoints={[1]} activeSnapPoint={1} onOpenChange={(open) => {
        if (open && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }}>
        <DrawerTrigger>
          <div className="mt-auto bg-secondary text-black text-xl p-3 cursor-pointer rounded-lg">{buttonText}</div>
        </DrawerTrigger>
        <DrawerContent className="w-screen">
          <div ref={scrollContainerRef} className="overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-10">
            <DrawerHeader className="flex flex-col items-center justify-center">
              <DrawerTitle className="text-5xl mb-10">{drawerTitle}</DrawerTitle>
            </DrawerHeader>
            <div className="w-[80%]">{drawerContent}</div>
          </div>
          <DrawerFooter className="flex flex-row items-center justify-center ">
            <Button variant="secondary" className="mr-10 text-black shadow-2xl" onClick={() => router.replace("/contact")}>Get in Contact</Button>
            <DrawerClose>
              <div className="text-lg">Close</div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
