import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  drawerTitle: string;
  drawerContent: React.ReactNode;
  buttonText?: string;
  className?: string;
}

export function ServiceCard({ title, subtitle, drawerTitle, drawerContent, buttonText = "View More", className = "" }: ServiceCardProps) {
  return (
    <div className={`bg-muted-foreground rounded-lg p-5 flex flex-col ${className}`}>
      <h1 className="text-white text-3xl font-bold mb-6">{title}</h1>
      <h2 className="text-white flex-grow mb-4">{subtitle}</h2>
      <Drawer snapPoints={[1.3]} activeSnapPoint={1.3}>
        <DrawerTrigger>
          <div className="mt-auto bg-secondary text-black text-xl p-3 cursor-pointer rounded-lg">{buttonText}</div>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className="overflow-y-auto flex-1">
            <DrawerHeader className="flex flex-col items-center justify-center w-full">
              <DrawerTitle className="text-5xl mb-10">{drawerTitle}</DrawerTitle>
              {drawerContent}
            </DrawerHeader>
          </div>
          <DrawerFooter className="flex-1 flex flex-col items-center justify-center">
            <DrawerClose>
              <Button variant="default" className="p-10 text-lg">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
