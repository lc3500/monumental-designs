import { Check } from "lucide-react";

interface WhyClientsLoveUsProps {
  title: string;
  items: string[];
}

export default function WhyClientsLoveUs({ title, items }: WhyClientsLoveUsProps) {
    return (
        <section className="p-20 flex flex-col items-center justify-start p-20 gap-10 bg-background">
        <div id="wrapper" className="m-10 max-w-4xl w-[90vw] flex flex-col sm:flex-row gap-15 items-center justify-center">
          <h1 className="text-4xl font-serif color-primary font-bold">{title}</h1>
          <ul className="text-xl flex flex-col gap-4">
            {items.map((item) => (
              <li key={item} className="flex flex-row items-center gap-5"><Check className="color-primary" /> {item}</li>
            ))}
          </ul>
        </div>
      </section>
    );
}
