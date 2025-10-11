"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoHomeButton() {
    const router = useRouter();

    return (<Button variant="outline" className="ml-10 mb-10 " onClick={() => router.push("/")}><ChevronLeft /> Go Home</Button>);
}