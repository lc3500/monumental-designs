import Image1 from "../../public/1.webp";
import Image2 from "../../public/2.webp";
import Image3 from "../../public/3.webp";
import Image4 from "../../public/4.webp";
import { GalleryImage } from "@/components/GalleryImage";
import MotionCloseButton from "./motion-close-button";
import Title from "./title";

export default function GalleryPage() {

  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-start gap-8 bg-white">
      {/* The white ink circle that matches the button's layoutId. It will layout-animate from the small
          circle behind the button to this larger positioned element. */}
      <MotionCloseButton />

      {/* Reveal content after a short delay to allow the layout animation to be visible */}
      <div className="p-10 flex flex-row gap-20 justify-around items-center w-full">
        <Title />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-6xl px-10">
        {Array.from({ length: 24 }, (_, i) => (
          <GalleryImage key={i} src={`/${i + 1}.webp`} alt={`${i + 1}`} />
        ))}

      </div>
      <br /><br /><br /><br />
    </main>
  );
}

// (no top-level effects) all effects run inside the component
