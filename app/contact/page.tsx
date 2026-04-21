"use client";

import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "./contact-form";
import { getContactPageClient } from "@/lib/strapi-client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ContactData = Awaited<ReturnType<typeof getContactPageClient>>;

export default function ContactPage() {
    const [contact, setContact] = useState<ContactData | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getContactPageClient();
                setContact(data);
            } catch (error) {
                window.location.href = "/content-unavailable";
            }
        };

        load();
    }, []);

    if (!contact) {
        return (
            <PageLayout className="flex flex-col items-center justify-center min-h-screen pb-20 gap-20">
                <Skeleton className="h-48 w-full max-w-4xl" />
                <Skeleton className="h-6 w-2/3" />
                <ContactForm />
            </PageLayout>
        );
    }

    return (
        <PageLayout className="flex flex-col items-center justify-center min-h-screen pb-20 gap-20">
            <PageHero
                title={contact.hero.title}
                subtitle={contact.hero.subtitle}
                logo={contact.hero.logoUrl || undefined}
                backgroundImage={contact.hero.backgroundImageUrl || undefined}
                gradientOverlay={contact.hero.gradientOverlay}
                enableParallax={contact.hero.enableParallax}
                containerClassName="mt-20 h-64"
                titleClassName="pl-10"
            />
            {contact.intro ? (
                <p className="text-lg text-center max-w-2xl px-6">{contact.intro}</p>
            ) : null}
            <ContactForm />
            <br /><br /><br />
        </PageLayout>
    );
}
