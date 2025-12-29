import Header from "../header";
import Heading from "./heading";
import GoHomeButton from "../../components/GoHomeButton";


export default function AboutUs() {

    return (
        <main className="pt-20 flex flex-col items-center justify-start w-screen min-h-screen">
            <Header />

            <Heading />
            <section className="px-5 md:pl-20 md:pr-20 pb-20 text-lg text-left">
                <p>
                   As a kid growing up, I was always rearranging my room. Trying different layouts, deciding how they made me feel, reorganizing my closet and dressers. Moving the pillow layouts while making the  and even attempting to move the formal living room to create different conversation areas. Funny, my mom had me move it back to the original location, but my room was a space they let me create, reorganize, and learn. I just never stopped. Even in college, my roommate and I moved our bunk beds and dressers around all the time with the best attempt of making it seem larger or giving us our own feel of space. I started out in the design field with a single interview. That interview changed the course of my career and direction in life. Even without having any practical design experience, I was given the opportunity for the job. I was given a chair, computer and a book to learn the program for kitchen and bath layouts. I never looked back.


                </p>
                <br />
                <p>I've been able to grow forward in my career to create livable spaces working for others. With my 20+ years of experience, I've decided to take on my own career path and begin my journey as the founder of Monumental Designs. I'm here to help elevate your house into a home whether that be new construction, remodel or just helping confirm with paint selections; my passion is helping you create a live able space that gives life to your story.</p>
            </section>
            <GoHomeButton />
        </main>
    )
}