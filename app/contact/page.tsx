"use client";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "./contact-form";
import Logo from "@/public/logo.svg";

export default function ContactPage() {
    return (
        <PageLayout className="flex flex-col items-center justify-center min-h-screen pb-20 gap-20">
            <PageHero
                title="We'd love to hear from you!"
                logo={Logo}
                containerClassName="mt-20 h-64"
                titleClassName="pl-10"
            />
            <ContactForm />
            <br /><br /><br />
        </PageLayout>
    );
}