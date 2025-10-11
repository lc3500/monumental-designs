import { Check } from "lucide-react";

export default function WhyClientsLoveUs() {
    return (
        <section className="p-20 flex flex-col items-center justify-start p-20 gap-10 bg-background">
        <div id="wrapper" className="m-10 max-w-4xl w-[90vw] flex flex-col sm:flex-row gap-15 items-center justify-center">
          <h1 className="text-4xl font-serif color-primary font-bold">Why Clients Love Us</h1>
          <ul className="text-xl flex flex-col gap-4">
            <li className="flex flex-row items-center gap-5"><Check className="color-primary" /> Clear visuals = no guesswork</li>
            <li className="flex flex-row items-center gap-5"><Check className="color-primary" /> Collaborative, stress-free process</li>
            <li className="flex flex-row items-center gap-5"><Check className="color-primary" /> A design journey that&apos;s as fun as the final reveal</li>
          </ul>
        </div>
      </section>
    );
}