import {Features} from "../components/home/Features"
import { Launch } from "../components/home/Launch"

import {Hero} from "../components/home/Hero"
import { TestimonialSection } from "../components/home/TestimonialSection"
import { Footer} from "../components/Footer"


export const HomePage = () => {
  return (
    <div className="">
        <Hero />
        <Features />
        <Launch />
        <TestimonialSection/>
        <Footer/>
      
    </div>
  )
}
