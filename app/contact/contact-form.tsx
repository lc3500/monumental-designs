"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactAPI from "./api/contact-form-handler";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long").max(10, "Phone number must be at most 10 digits long"),
    message: z.string().min(10, "Message must be at least 10 characters long"),
})

export function ContactForm() {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setSubmitting(true);
        try {
            await ContactAPI.sendContactForm(data);
            toast.success("Message sent!", { description: "We'll be in touch soon." });
            form.reset();
        } catch (err) {
            toast.error("Failed to send message", {
                description: err instanceof Error ? err.message : "Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormDescription>
                            Please enter your full name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Your Email" {...field} />
                        </FormControl>
                        <FormDescription>
                            Please enter your email address.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input type="tel" placeholder="Your Phone Number" {...field} />
                        </FormControl>
                        <FormDescription>
                            Please enter your phone number.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Your Message" {...field} />
                        </FormControl>
                        <FormDescription>
                            Please enter your message.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit"}</Button>
        </form>
        </Form>
    );
}