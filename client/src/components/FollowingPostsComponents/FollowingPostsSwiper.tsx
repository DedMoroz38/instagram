import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import config from "../../config.json";
import { useRef } from "react";
import arrowVector from '../../otherFiles/leftArrow.svg'

const MainContainer = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;

const SwiperContainer = styled(Swiper)`
  height: 100%;
`;

const SwiperNavPrev = styled.div`
  cursor: pointer;
  top: 50%;
  transform: translate(0, -50%);
  position: absolute;
  left: 10px;
  width: 35px;
  height: 60px;
  z-index: 2;
  background-image: url(${arrowVector});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(3283%) hue-rotate(35deg) brightness(118%) contrast(109%);
`;

const SwiperNavNext = styled(SwiperNavPrev)`
  background-image: url(${arrowVector});
  right: 10px;
  left: auto;
  transform: scale(-1, 1);
  transform-origin: center;
  top: calc(50% - 30px);
`;

const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

interface Swiper{
  postAttachments: Array<{
    filename: string;
    id: number;
    postid: number
  }>
}

const FollowingPostsSwiper: React.FC<Swiper>= ({
  postAttachments
}) => {
  const navPrevRef = useRef(null);  
  const navNextRef = useRef(null);
  
  return (
    <MainContainer>
      <SwiperContainer
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        speed={600}
        navigation={{
          prevEl: navPrevRef.current,
          nextEl: navNextRef.current
        }}
      >
        {
          postAttachments.map((attachment) => (
            <SwiperSlide 
              key={attachment.id}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <PostImage src={config.serverPostUrl + `${attachment.filename}`} alt="postImage"/>
            </SwiperSlide>
          ))
        }
        <SwiperNavPrev ref={navPrevRef} />
        <SwiperNavNext ref={navNextRef} />
      </SwiperContainer>
    </MainContainer>
  );
}

export default FollowingPostsSwiper;