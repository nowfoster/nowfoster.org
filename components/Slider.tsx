import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { FosteringStory as IFosteringStory } from "../types"
import FosteringStory from "./FosteringStory"

import "swiper/css"
import "swiper/css/navigation"

interface Props {
  stories: IFosteringStory[]
}

const Slider = ({ stories }: Props) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      initialSlide={2}
      breakpoints={{
        700: {
          slidesPerView: 2,
        },

        1000: {
          slidesPerView: 3,
        },
      }}
      keyboard={{
        enabled: true,
      }}
      navigation={true}
      modules={[Navigation]}
    >
      {stories.map(story => (
        <SwiperSlide key={story.id}>
          <FosteringStory {...story} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
