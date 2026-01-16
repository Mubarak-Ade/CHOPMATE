import {Features} from "../components/Features"
import { Launch } from "../components/Launch"

import {Hero} from "../components/Hero"
import { TestimonialSection } from "../components/TestimonialSection"
import { Footer} from "../components/Footer"


export const HomePage = () => {
  return (
    <div>
        <Hero />
        <Features />
        <Launch />
        <TestimonialSection/>
        <Footer/>
      
    </div>
  )
}
