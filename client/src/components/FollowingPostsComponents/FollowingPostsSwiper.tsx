import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";
import config from "../../config.json";
import { useEffect, useRef } from "react";
import arrowVector from '../../otherFiles/leftArrow.svg'
import { useWidthContext } from "../../ContextProviders/WidthProivder";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: post;
  max-height: 90vh;
  margin-right: 50px;
  min-height: 70vh;

  @media (max-width: 420px){
    width: 100vw;
    height: auto;
    min-height: auto;
    ${props => props.isCommentOpen ? 
      `display: none`
       : ``}
  }
`;

const SwiperContainer = styled(Swiper)`
  height: 100%;
  @media (max-width: 420px){
    width: 100%;
    max-height: 60vh;
    background: ${({ theme }) => theme.messageBoxBackground};
  }
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
  }>,
  isCommentOpen: boolean
}

const FollowingPostsSwiper: React.FC<Swiper>= ({
  postAttachments,
  isCommentOpen
}) => {
  const {isMobile} = useWidthContext()
  const navPrevRef = useRef(null);  
  const navNextRef = useRef(null);

  return (
    <MainContainer isCommentOpen={isCommentOpen}>
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
          postAttachments.map((fileName, index) => (
            <SwiperSlide 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <PostImage src={process.env.REACT_APP_POST_URL + `${fileName}`} alt="postImage"/>
            </SwiperSlide>
          ))
        }
        {
          !isMobile &&
          <>
            <SwiperNavPrev ref={navPrevRef} />
            <SwiperNavNext ref={navNextRef} />
          </>
        }
      </SwiperContainer>
    </MainContainer>
  );
}

export default FollowingPostsSwiper;