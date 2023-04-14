import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";

const SwiperContainer = styled(Swiper)`
  height: 100%;
`

const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

interface Swiper {
  postImages: Array<string>,
}


const NewImagesSwiper: React.FC<Swiper> = ({
  postImages,
}) => {
  return (
    <>
      <SwiperContainer
        style={{width: '100%'}}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          postImages.map((image, index) => (
            <SwiperSlide 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <PostImage src={image} alt="postImage"/>
            </SwiperSlide>
          ))
        }
      </SwiperContainer>
    </>
  );
}

export default NewImagesSwiper;