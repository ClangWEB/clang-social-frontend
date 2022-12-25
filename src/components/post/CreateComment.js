import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

export default function CreateComment({ user }) {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [commentImage, setCommentImage] = useState();
    const [error, setError] = useState("");
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [textRef, cursorPosition]);

    const handleImage = (e) => {
        let file = e.target.files[0];
        if (file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp"
        ) {
            setError(`Only Image is supported!`)
            return;
        }
        else if (file.size > 5242880) {
            setError(`Max 5mb is allowed!`)
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setCommentImage(event.target.result);
        };
    };

    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    };

    return (
        <div className="create_comment_wrap">
            <div className="create_comment">
                <img src={user?.picture} alt="Profile" />
                <div className="comment_input_wrap">
                    {picker &&
                        <div className="comment_emoji_picker">
                            <Picker onEmojiClick={handleEmoji} />
                        </div>
                    }
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        onChange={handleImage}
                        hidden
                        ref={imgRef}
                    />
                    {error &&
                        <div className="postError_third comment_error">
                            <div className="postError_error">{error}</div>
                            <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                        </div>
                    }
                    <input type="text" placeholder="Anything to comment" ref={textRef} value={text} onChange={(e) => setText(e.target.value)} />
                    <div className="comment_circle_icon hover3" onClick={() => { setPicker(prev => !prev) }}>
                        <i className="emoji_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover3" onClick={() => imgRef.current.click()}>
                        <i className="camera_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover3" >
                        <i className="gif_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover3" >
                        <i className="sticker_icon"></i>
                    </div>
                </div>
            </div>
            {commentImage &&
                <div className="comment_img_preview">
                    <img src={commentImage} alt="" />
                    <div className="small_white_circle" onClick={() => {setCommentImage("")}}>
                        <i className="exit_icon"></i>
                    </div>
                </div>
            }
        </div>
    )
}
