"use client";
import Header from "../header";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CoverImage from "@/public/2.webp";
import Image from "next/image";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function ServicesPage() {
    const router = useRouter();
    const services = [
        {
            title: "Consultation Services",
            subtitle: "Whether you're selecting the perfect paint palette or planning a full-scale remodel, our design consultations are tailored to your unique project needs. Here's how we can help:",
            drawerTitle: "Consultation Services",
            drawerContent: (
                <ul className="text-lg text-left flex flex-col gap-5">
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Color Consultations (Interior & Exterior): </span>
                        Struggling to choose the right shade? We'll help you create a cohesive, balanced color scheme that complements your style, lighting, and architectural features—inside and out.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Remodel Design Support: </span>
                        From kitchen and bath updates to complete home transformations, we'll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">New Construction Design Guidance: </span>
                        Starting from the ground up? We'll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
                    </li>
                </ul>
            ),
        },
        {
            title: "Space Planning & Selections",
            subtitle: "Designing a space isn't just about what looks good—it's about how everything flows, functions, and feels. Our Space Planning Services focus on creating layouts that are both beautiful and practical, tailored to your lifestyle and vision. Whether you're building new or remodeling, we help you plan your space from the ground up with every detail in mind:",
            drawerTitle: "Space Planning & Selections",
            drawerContent: (
                <ul className="text-lg text-left flex flex-col gap-5">
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Flooring: </span>
                        We help you choose materials that are not only stylish but also suit your home's layout, lighting, and daily wear.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Tile & Backsplashes: </span>
                        From kitchen and bath updates to complete home transformations, we'll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Furniture & Rugs: </span>
                        Starting from the ground up? We'll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Fixtures, Finishes & More: </span>
                        Lighting, hardware, paint colors, cabinetry, and more—we'll make sure each element fits seamlessly into your plan.
                    </li>
                </ul>
            ),
        },
        {
            title: "Designed With Intention",
            subtitle: "We consider all the elements that will live in your space from day one, not as an afterthought. Our goal is to help you make confident decisions early in the process, so your finished space feels cohesive, comfortable, and uniquely yours. Let's bring your vision to life—floor to ceiling, room by room.",
            drawerTitle: "We Do It All",
            drawerContent: (
                <ul className="text-lg text-left flex flex-col gap-5">
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Layouts & Floor Plans</span>
                        We’ll map out the perfect flow for your space so it feels functional, balanced, and welcoming.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Elevations & Renderings</span>
                        From kitchen and bath updates to complete home transformations, we'll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Material & Finish Selections</span>
                        Starting from the ground up? We'll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Personalized Design Guidance</span>
                        Think of us as your design partner—offering inspiration, expert advice, and creative solutions every step of the way.
                    </li>
                </ul>
            ),
        },
    ];

    return (
        <main className="pt-20 w-screen">
            <Header />
            <div className="relative w-full flex flex-col md:flex-row  justify-center items-center mt-10 p-20 bg-primary">
                <Image src={CoverImage} alt="Cover Image" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0" />
                <h1 className="relative z-10 flex flex-wrap md:flex-row items-center gap-5 text-6xl text-serif font-bold justify-start text-white">
                    How can we make it
                    <span className="gradient-background font-bold text-white p-0 m-0">
                        <h2 className="font-bold">your</h2>
                    </span>
                    home?
                </h1>
            </div>
            <section className="text-lg flex flex-col items-center justify-center p-10 md:p-20 text-justify max-w-5xl mx-auto">
                <p className="">
                    At Monumental Designs, we specialize in creating stunning custom monuments and memorials that honor and celebrate the lives of your loved ones. Our services include:
                </p>

                {/* Carousel for mobile */}
                <div className="w-[90%] md:hidden mt-10">
                    <Carousel className="w-full max-w-sm mx-auto">
                        <CarouselContent>
                            {services.map((service, index) => (
                                <CarouselItem key={index}>
                                    <ServiceCard {...service} className="mx-auto" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Grid layout for desktop */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto mt-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
            <div className="w-full flex justify-center items-center mb-20">
                <Button variant="outline" className="ml-10 mb-10 " onClick={() => router.push('/')}><ChevronLeft /> Go Home</Button>
            </div>
        </main>
    )
}