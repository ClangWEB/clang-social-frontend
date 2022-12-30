import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";

const reactsArray = [
    {
        name: "like",
        image: "../../../reacts/like.gif",
    },
    {
        name: "love",
        image: "../../../reacts/love.gif",
    },
    {
        name: "haha",
        image: "../../../reacts/haha.gif",
    },
    {
        name: "wow",
        image: "../../../reacts/wow.gif",
    },
    {
        name: "sad",
        image: "../../../reacts/sad.gif",
    },
    {
        name: "angry",
        image: "../../../reacts/angry.gif",
    },
];

export default function ReactPopup({ reactHandler, visible, setVisible }) {
    const myRef = useRef(null);
    useClickOutside(myRef, () => setVisible(false));
    return (
        <>
            {visible && (
                <div
                    className="reacts_popup"
                    ref={myRef}
                    onMouseOver={() => {
                        setTimeout(() => {
                            setVisible(true)
                        }, 500)
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setVisible(false)
                        }, 500)
                    }}
                >
                    {
                        reactsArray.map((react, i) => (
                            <div className="react" onClick={() => reactHandler(react?.name)} key={i}>
                                <img src={react.image} alt="Reacts" />
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    )
}
