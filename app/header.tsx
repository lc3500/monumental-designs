"use client";
import Image from "next/image";
import Logo from "../public/logo.svg";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Header() {
    const router = useRouter();
    const { scrollY } = useScroll();
    const background = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.3)"]);
    const backdropFilter = useTransform(scrollY, [0, 100], ["none", "blur(10px)"]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.9]);
    const borderRadius = useTransform(scrollY, [0, 100], ["0px", "15px"]);

    return (
        <motion.header style={{ background, backdropFilter, scale, borderRadius }} className="flex items-center justify-center w-screen top-0 z-50 fixed">


            <div id="container" className="flex items-center justify-around h-full w-[90%]">
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/about">About Me</NavigationMenuLink>
                            
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                
                    <Image src={Logo} alt="Logo" width={250} draggable={false} onClick={() => router.push("/")}/>
                
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/services">Services</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>

        </motion.header>
    );
}