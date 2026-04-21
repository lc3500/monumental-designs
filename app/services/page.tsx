"use client";

import Header from "../header";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ServiceCard } from "@/components/ServiceCard";
import GoHomeButton from "../../components/GoHomeButton";
import { PageHero } from "@/components/PageHero";
import { getServicesPageClient } from "@/lib/strapi-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ServiceItem = Awaited<ReturnType<typeof getServicesPageClient>>["services"][number];

export default function ServicesPage() {
    const [servicesPage, setServicesPage] = useState<Awaited<ReturnType<typeof getServicesPageClient>> | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getServicesPageClient();
                setServicesPage(data);
            } catch (error) {
                window.location.href = "/content-unavailable";
            }
        };

        load();
    }, []);

    if (!servicesPage) {
        return (
            <main className="pt-20 w-screen">
                <Header />
                <section className="text-lg flex flex-col items-center justify-center p-10 md:p-20 text-justify max-w-5xl mx-auto">
                    <Skeleton className="h-12 w-2/3 mb-6" />
                    <Skeleton className="h-6 w-5/6 mb-4" />
                    <Skeleton className="h-64 w-full" />
                </section>
                <GoHomeButton />
            </main>
        );
    }

    return (
        <main className="pt-20 w-screen">
            <Header />
            <PageHero
                title={servicesPage.hero.title}
                subtitle={servicesPage.hero.subtitle}
                backgroundImage={servicesPage.hero.backgroundImageUrl || undefined}
                logo={servicesPage.hero.logoUrl || undefined}
                gradientOverlay={servicesPage.hero.gradientOverlay}
                enableParallax={servicesPage.hero.enableParallax}
                className="mt-10"
                containerClassName="p-20 min-h-[360px]"
                titleClassName="text-5xl md:text-6xl"
            />
            <section className="text-lg flex flex-col items-center justify-center p-10 md:p-20 text-justify max-w-5xl mx-auto">
                <p className="">{servicesPage.intro}</p>

                {/* Carousel for mobile */}
                <div className="w-[90%] md:hidden mt-10">
                    <Carousel className="w-full max-w-sm mx-auto">
                        <CarouselContent>
                            {servicesPage.services.map((service: ServiceItem) => (
                                <CarouselItem key={service.title}>
                                    <ServiceCard
                                        title={service.title}
                                        subtitle={service.subtitle}
                                        drawerTitle={service.drawerTitle}
                                        drawerContentHtml={service.drawerContentHtml}
                                        drawerContentBlocks={service.drawerContentBlocks}
                                        className="mx-auto"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Grid for desktop */}
                <div className="hidden md:grid grid-cols-2 gap-10 mt-10">
                    {servicesPage.services.map((service: ServiceItem) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            subtitle={service.subtitle}
                            drawerTitle={service.drawerTitle}
                            drawerContentHtml={service.drawerContentHtml}
                            drawerContentBlocks={service.drawerContentBlocks}
                        />
                    ))}
                </div>
            </section>

            <GoHomeButton />
        </main>
    );
}
