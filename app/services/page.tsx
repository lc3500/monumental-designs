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
import GoHomeButton from "../../components/GoHomeButton";

export default function ServicesPage() {
    const services = [
        {
            title: "Consultation Services",
            subtitle: "Whether you're selecting the perfect paint palette or planning a full-scale remodel, our design consultations are tailored to your unique project needs. Here's how we can help:",
            drawerTitle: "Consultation Services",
            drawerContent: (
                <ul className="text-lg text-left flex flex-col gap-5">
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Color Consultations (Interior & Exterior): </span>
                        Struggling to choose the right shade? We&#39;ll help you create a cohesive, balanced color scheme that complements your style, lighting, and architectural features—inside and out.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Remodel Design Support: </span>
                        From kitchen and bath updates to complete home transformations, we&apos;ll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">New Construction Design Guidance: </span>
                        Starting from the ground up? We&#39;ll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
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
                        We help you choose materials that are not only stylish but also suit your home&#39;s layout, lighting, and daily wear.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Tile & Backsplashes: </span>
                        From kitchen and bath updates to complete home transformations, we&#39;ll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Furniture & Rugs: </span>
                        Starting from the ground up? We&#39;ll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Fixtures, Finishes & More: </span>
                        Lighting, hardware, paint colors, cabinetry, and more—we&#39;ll make sure each element fits seamlessly into your plan.
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
                        From kitchen and bath updates to complete home transformations, we&#39;ll guide you through layout ideas, material selections, finishes, and more to ensure your remodel reflects both beauty and function.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Material & Finish Selections</span>
                        Starting from the ground up? We&#39;ll collaborate with you (and your builder, if needed) to design cohesive spaces, plan layouts, and select everything from flooring to fixtures—so your new home comes together seamlessly.
                    </li>
                    <li className="mb-4">
                        ✔ <span className="text-xl font-bold">Personalized Design Guidance</span>
                        Think of us as your design partner—offering inspiration, expert advice, and creative solutions every step of the way.
                    </li>
                </ul>
            ),
        },
        {
            title: "Staging Services",
            subtitle: "When selling a home, presentation is everything. My staging services help make your property stand out in the market—without the hassle of buying new furniture. Using your own furniture, we’ll craft a space that buyers can imagine themselves living in.",
            drawerTitle: "Staging Services - Making Your Home Irresistible to Buyers",
            drawerContent: (
                <div className="text-lg text-left flex flex-col gap-5">
                    <p>
                        Transforming Spaces for Maximum Appeal
                        When selling a home, presentation is everything. My staging services help make your property stand out in the market—without the hassle of buying new furniture. Using your own furniture, we’ll craft a space that buyers can imagine themselves living in.
                    </p>
                    <h4 className="text-xl font-bold">The Process: From Listing to Sold</h4>
                    <ol className="list-decimal ml-5">
                        <li>
                            <span className="font-bold">Consultation & Assessment</span>
                            <ul className="list-disc ml-5">
                                <li>
                                    <span className="font-bold">Let's Chat:</span> We’ll start with a free consultation, where I’ll get to know your property, style, and goals. Whether you’re selling a cozy apartment or a spacious family home, I’ll assess what needs to be done to make your home shine.
                                </li>
                                <li>
                                    <span className="font-bold">Walkthrough:</span> We’ll go room by room to see how we can maximize flow, lighting, and use of space.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-bold">Furniture & Layout Optimization</span>
                            <ul className="list-disc ml-5">
                                <li>
                                    <span className="font-bold">Your Furniture, Our Vision:</span> Using your existing furniture, I’ll re-arrange and update the layout to create a buyer-friendly environment. I’ll also recommend simple decor updates, like fresh pillows, throws, and lighting, that’ll make a huge impact without breaking the bank.
                                </li>
                                <li>
                                    <span className="font-bold">Declutter & Depersonalize:</span> We’ll work together to remove personal items and unnecessary clutter, leaving behind a clean, inviting space that appeals to potential buyers.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-bold">Staging & Styling</span>
                            <ul className="list-disc ml-5">
                                <li>
                                    <span className="font-bold">Room by Room Magic:</span> I'll stage key areas such as the living room, kitchen, and bedrooms to highlight the home’s best features. Each room will tell a story—one that says, "This is where I want to live!"
                                </li>
                                <li>
                                    <span className="font-bold">Final Touches:</span> Think fresh flowers, cozy blankets, art pieces, and other styling elements that make the space feel warm and welcoming.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-bold">Ready to List!</span>
                            <ul className="list-disc ml-5">
                                <li>
                                    <span className="font-bold">Photos that Sell:</span> I’ll also guide you through preparing your home for photography, ensuring that the space looks its best for online listings. Great staging + professional photos = faster sales.
                                </li>
                                <li>
                                    <span className="font-bold">Open House Ready:</span> After staging, your home will be set for successful open houses and private showings, creating an irresistible vibe for buyers.
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <h4 className="text-xl font-bold">Why Staging with Your Own Furniture Works</h4>
                    <ul className="list-disc ml-5">
                        <li>
                            <span className="font-bold">Save Money:</span> No need to rent new furniture or buy new decor. I’ll show you how to use what you already have in fresh, appealing ways.
                        </li>
                        <li>
                            <span className="font-bold">Quick Turnaround:</span> Staging with existing furniture is faster, meaning your home can hit the market sooner.
                        </li>
                        <li>
                            <span className="font-bold">Personal Touches:</span> By working with your pieces, we preserve the personality of the home while making it more universally appealing to potential buyers.
                        </li>
                    </ul>
                    <h4 className="text-xl font-bold">Why Stage?</h4>
                    <ul className="list-disc ml-5">
                        <li>
                            <span className="font-bold">Sell Faster:</span> Homes that are staged tend to sell faster than those that aren’t. Buyers are more likely to connect emotionally with a staged home.
                        </li>
                        <li>
                            <span className="font-bold">Maximize Value:</span> A well-staged home can fetch a higher price by highlighting the property’s full potential.
                        </li>
                        <li>
                            <span className="font-bold">Professional Touch:</span> My design eye will make sure your home stands out in listing photos and showings—ensuring that it’s memorable for all the right reasons.
                        </li>
                    </ul>
                    <p>
                        <span className="font-bold">Ready to Get Started?</span> Let’s make your home the one everyone is talking about! Contact me to schedule your consultation and take the first step toward a quicker, more profitable sale.
                    </p>
                </div>
            ),
        }
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
                    We specialize in working alongside of you to help create stunning spaces. Our services include:
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
                <div className="hidden md:grid gap-4 w-full mx-auto mt-10"
                style={{
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
                }}
                >
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
            <div className="w-full flex justify-center items-center mb-20">
                <GoHomeButton />
            </div>
        </main>
    )
}