import Header from "../header";
import Heading from "./heading";
import GoHomeButton from "../../components/GoHomeButton";


export default function AboutMe() {

    return (
        <main className="pt-20 flex flex-col items-center justify-start w-screen min-h-screen">
            <Header />

            <Heading />
            <section className="px-5 md:pl-20 md:pr-20 pb-20 text-lg text-left">
                <p>
                    At Monumental Designs, we specialize in creating beautifully functional kitchen and bath spaces that reflect your lifestyle and taste. Whether you&#39;re building your dream home from the ground up or giving your current space a fresh new look, we&#39;re here to guide you every step of the way.


                </p>
                <br />
                <p>We’re passionate about helping homeowners bring their vision to life — especially during new construction and remodeling projects, where our expertise in layout and design can truly shine. From smart storage solutions to stunning surface finishes, we thrive on coming up with creative, personalized ideas that make your space work better and look amazing.</p>
            </section>
            <GoHomeButton />
        </main>
    )
}