import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ClipLoader } from "react-spinners";

export default function CreateComment({ user, postId }) {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [commentImage, setCommentImage] = useState("");
    const [error, setError] = useState("");
    const [cursorPosition, setCursorPosition] = useState();
    const [loading, setLoading] = useState(false);
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

    const handleComment = async (e) => {
        if (e.key === "Enter") {             // ONLY FOR KEYBOARD
            if (commentImage !== "") {
                setLoading(true);
                const img = dataURItoBlob(commentImage);
                const path = `${user?.username}/post_images/${postId}`;
                let formData = new FormData();
                formData.append("path", path);
                formData.append("file", img);
                const imgComment = await uploadImages(formData, user?.token, path);
                await comment(postId, text, imgComment[0].url, user.token);
                // const comments = await comment(postId, text, imgComment[0].url, user.token);
                setLoading(false);
                setCommentImage("");
                setText("");
            }
            else {
                setLoading(true);
                await comment(postId, text, "", user.token);
                // const comments = await comment(postId, text, "", user.token);
                setLoading(false);
                setCommentImage("");
                setText("");
            }
        }
    };

    const handleCommentButton = async (e) => {
        if (commentImage !== "") {
            setLoading(true);
            const img = dataURItoBlob(commentImage);
            const path = `${user?.username}/post_images/${postId}`;
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", img);
            const imgComment = await uploadImages(formData, user?.token, path);
            await comment(postId, text, imgComment[0].url, user.token);
            // const comments = await comment(postId, text, imgComment[0].url, user.token);
            setLoading(false);
            setCommentImage("");
            setText("");
        }
        else {
            setLoading(true);
            await comment(postId, text, "", user.token);
            // const comments = await comment(postId, text, "", user.token);
            setLoading(false);
            setCommentImage("");
            setText("");
        }
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
                        <div className="postError_zindex comment_error">
                            <div className="postError_error">{error}</div>
                            <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                        </div>
                    }
                    <input
                        type="text"
                        placeholder="Comment here"
                        ref={textRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleComment}
                    />
                    {!loading
                        ? <div className="comment_circle_icon"  onClick={() => handleCommentButton()}>
                            <i className="right_icon filter_pink myArrow"></i>
                        </div>
                        : <div className="comment_circle" style={{ marginTop: "5px" }}>
                            <ClipLoader
                                size={20}
                                color="#F51997"
                            />
                        </div>}
                    <div className="comment_circle_icon hover3" onClick={() => { setPicker(prev => !prev) }}>
                        <i className="emoji_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover3" onClick={() => imgRef.current.click()}>
                        <i className="camera_icon"></i>
                    </div>
                    {/* <div className="comment_circle_icon hover3" >
                        <i className="gif_icon"></i>
                    </div>
                    <div className="comment_circle_icon hover3" >
                        <i className="sticker_icon"></i>
                    </div> */}
                </div>
            </div>
            {commentImage &&
                <div className="comment_img_preview">
                    <img src={commentImage} alt="" />
                    <div className="small_white_circle" onClick={() => { setCommentImage("") }}>
                        <i className="exit_icon"></i>
                    </div>
                </div>
            }
        </div>
    )
}
