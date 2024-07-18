import React from 'react'
import Carousel from './Common/Carousel'
import Img1 from "/Images/Img1.jpg"
import Img2 from "/Images/Img2.jpg"
import Img3 from "/Images/Img3.jpg"
import Img4 from "/Images/Img4.jpg"

const Home = () => {
    const slides = [
        {
            url: Img1,
            // pageLink: '/beautyservice',
            service: 'Beauty'
        },
        {
            url: Img2,
            // pageLink: '/cleaningservice',
            service: 'Cleaning'
        },
        {
            url: Img3,
            // pageLink: '/automobileservice',
            service: 'Automobile'
        },

        {
            url: Img4,
            // pageLink: '/engineeringservice',
            service: 'Engineering'
        },
        // {
        //     url: DigitalService,
        //     pageLink: '/digitalservice',
        //     service: 'Digital Service'
        // },
        // {
        //     url: FreeService,
        //     pageLink: '/freeservice',
        //     service: 'Free Service'
        // },
    ];

  return (
    <>
    <Carousel slides={slides}/>
    </>
  )
}

export default Home