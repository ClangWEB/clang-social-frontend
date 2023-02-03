import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBg from "./EmojiPickerBg";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";


export default function CreatePostPopup({ type, user, setPostVisible, posts, dispatch, profile, showPreview, setShowPreview }) {
    const popup = useRef(null);
    useClickOutside(popup, () => {
        setPostVisible(false);
    });
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    // const [showPreview, setShowPreview] = useState(false);
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("");
    const [error, setError] = useState("");

    const postSubmit = async () => {
        if (background) {
            setLoading(true);
            const response = await createPost(null, background, text, null, user?.id, user?.token);
            setLoading(false);

            if (response.status === "ok") {
                dispatch({
                    type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
                    payload: [response.data, ...posts],
                });
                setText("");
                setBackground("");
                setPostVisible(false);
            }
            else {
                setError(response);
            }
        }
        else if (images && images.length) {
            setLoading(true);
            const postImages = images.map((img, i) => {
                return dataURItoBlob(img, i);
            });
            const path = `${user?.username}/post_images`;
            let formData = new FormData();
            formData.append("path", path);
            postImages.forEach((image) => {
                formData.append("file", image);
            });
            const response = await uploadImages(formData, user?.token, path);
            const res = await createPost(null, null, text, response, user?.id, user?.token);
            setLoading(false);

            if (res.status === "ok") {
                dispatch({
                    type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
                    payload: [res.data, ...posts],
                });
                setText("");
                setImages([]);
                setPostVisible(false);
            }
            else {
                setError(res);
            }
        }
        else if (text) {
            setLoading(true);
            const response = await createPost(null, null, text, null, user?.id, user?.token);
            setLoading(false);

            if (response.status === "ok") {
                dispatch({
                    type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
                    payload: [response.data, ...posts],
                });
                setText("");
                setBackground("");
                setPostVisible(false);
            }
            else {
                setError(response);
            }
        }
        else {

        }
    }

    return (
        <div className="blur">
            <div className="postBox" ref={popup}>
                {
                    error && <PostError error={error} setError={setError} />
                }
                <div className="box_header">
                    <div className="small_circle" onClick={() => { setPostVisible((false)); setImages([]); }}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img src={user.picture} alt="" className="box_profile_img" />
                    <div className="box_col">
                        <div className="box_profile_name">
                            {user.first_name} {user.last_name}
                        </div>
                        {/* <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <i className="arrowDown_icon"></i>
                        </div> */}
                    </div>
                </div>
                {!showPreview ? (
                    <>
                        <EmojiPickerBg
                            type={type}
                            user={user}
                            text={text}
                            setText={setText}
                            background={background}
                            setBackground={setBackground}
                        />
                    </>)
                    : (
                        <ImagePreview
                            user={user}
                            text={text}
                            setText={setText}
                            setError={setError}
                            images={images}
                            setImages={setImages}
                            setShowPreview={setShowPreview}
                        />
                    )
                }
                {!showPreview && <AddToYourPost
                    setShowPreview={setShowPreview}
                />}
                <button disabled={loading} className="post_submit" onClick={() => { postSubmit() }}>
                    {loading
                        ? <PulseLoader
                            color="#fff"
                            size={7}
                        />
                        : "POST"
                    }
                </button>
            </div>
        </div>
    )
}
