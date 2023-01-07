import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function FullScreen({ setFullscreen, postImages, slideNumber, setSlideNumber }) {
    const prevSlide = () => {
        slideNumber === 0 ? setSlideNumber(postImages?.length - 1) : setSlideNumber(slideNumber - 1)
    };
    const nextSlide = () => {
        slideNumber + 1 === postImages?.length ? setSlideNumber(0) : setSlideNumber(slideNumber + 1)
    };

    return (
        <div className="sliderWrap">
            <FontAwesomeIcon icon={faXmark} className="btnClose" onClick={() => setFullscreen(false)} />
            {postImages && postImages?.length > 1 && <>
                <FontAwesomeIcon icon={faChevronLeft} className="btnPrev" onClick={prevSlide} />
                <FontAwesomeIcon icon={faChevronRight} className="btnNext" onClick={nextSlide} />
            </>
            }
            <div className="fullScreenImage" >
                <img src={postImages[slideNumber].url} alt="Post" />
            </div>
        </div>
    )
}