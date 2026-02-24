import {Features} from "../components/home/Features"
import { Launch } from "../components/home/Launch"
import {Hero} from "../components/home/Hero"
import { TestimonialSection } from "../components/home/TestimonialSection"

export const HomePage = () => {
  return (
    <div className="">
        <Hero />
        <Features />
        <Launch />
        <TestimonialSection/>
    </div>
  )
}
