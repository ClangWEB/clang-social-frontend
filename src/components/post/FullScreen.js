import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FullScreen({ setFullscreen, postImages, slideNumber, setSlideNumber }) {
    const prevSlide = () => {
        slideNumber === 0 ? setSlideNumber(postImages?.length - 1) : setSlideNumber(slideNumber - 1)
    };
    const nextSlide = () => {
        slideNumber + 1 === postImages?.length ? setSlideNumber(0) : setSlideNumber(slideNumber + 1)
    };

    return (
        <div className="sliderWrap">
            <FontAwesomeIcon icon={faCircleXmark} className="btnClose" onClick={() => setFullscreen(false)} />
            {postImages && postImages?.length > 1 && <>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="btnPrev" onClick={prevSlide} />
                <FontAwesomeIcon icon={faCircleChevronRight} className="btnNext" onClick={nextSlide} />
            </>
            }
            <div className="fullScreenImage">
                <img src={postImages[slideNumber].url} alt="" />
            </div>
        </div>
    )
}