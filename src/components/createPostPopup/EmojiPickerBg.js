import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";

export default function EmojiPickerBg({ type, user, text, setText, type2, background, setBackground }) {
    const [picker, setPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);
    const bgRef = useRef(null);
    const [showBgs, setShowBgs] = useState(false)

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [textRef, cursorPosition]);

    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    };

    const bgHandler = (i) => {
        bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
        setBackground(postBackgrounds[i]);
        bgRef.current.classList.add("bgHandler");
    };

    const removeBg = (i) => {
        bgRef.current.style.backgroundImage = "";
        setBackground("");
        bgRef.current.classList.remove("bgHandler");
    };

    const postBackgrounds = [
        "../../../images/postbackgrounds/1.jpg",
        "../../../images/postbackgrounds/2.jpg",
        "../../../images/postbackgrounds/3.jpg",
        "../../../images/postbackgrounds/4.jpg",
        "../../../images/postbackgrounds/5.jpg",
        "../../../images/postbackgrounds/6.jpg",
        "../../../images/postbackgrounds/7.jpg",
        "../../../images/postbackgrounds/8.jpg",
        "../../../images/postbackgrounds/9.jpg",
    ];

    const sm = useMediaQuery({
        query: "(max-width: 550px)"
    })

    return (
        <div className={type2 ? "images_input" : ""}>
            <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
                <textarea
                    ref={textRef}
                    // autoFocus
                    maxLength="250"
                    value={text}
                    placeholder={!type2 ? type : "Say something..."}
                    // placeholder={`Say hii to world, ${user?.first_name}`}
                    className={`post_input scrollbar ${type2 ? "input2" : ""} ${sm && !background ? "l0" : ""}`}
                    onChange={(e) => setText(e.target?.value)}
                    style={{
                        paddingTop: `${background
                            ? Math.abs(textRef.current.value.length * 0.1 - 33)
                            : "0"
                            }%`
                    }}
                ></textarea>
            </div>
            <div className={!type2 ? "post_emojis_wrap" : ""}>
                {picker &&
                    <div className={`comment_emoji_picker ${type2 ? "movepicker2" : "rlmove"}`}>
                        <Picker onEmojiClick={handleEmoji} />
                    </div>
                }
                {!type2 && <img src="../../../icons/colorful.png" alt="Background" onClick={() => { setShowBgs((prev) => !prev) }} />}
                {!type2 && !showBgs && background && <div className="my_no_bg" onClick={() => { removeBg() }}></div>}
                {!type2 && showBgs && (
                    <div className="post_backgrounds scrollbar">
                        <div className="no_bg" onClick={() => { removeBg() }}></div>
                        {postBackgrounds.map((bg, i) => (
                            <img
                                src={bg}
                                key={i}
                                onClick={() => { bgHandler(i) }}
                                alt="Post Backgrounds"
                            />
                        ))}
                    </div>
                )}
                <i
                    className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
                    onClick={() => setPicker(prev => !prev)}
                ></i>
            </div>
        </div>
    )
}
