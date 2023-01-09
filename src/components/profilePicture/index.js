import { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";


export default function ProfilePicture({ setShow, pRef, photos }) {
    const { user } = useSelector((state) => ({ ...state }));
    const popupRef = useRef(null);
    useClickOutside(popupRef, () => setShow(false))
    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const handleImage = (e) => {
        let file = e.target.files[0];
        if (file?.type !== "image/jpeg" &&
            file?.type !== "image/png" &&
            file?.type !== "image/gif" &&
            file?.type !== "image/webp"
        ) {
            e.target.value = null;
            setError(`Only Image is supported!`)
            return;
        }
        else if (file.size > 20971520) {
            e.target.value = null;
            setError(`Max 20mb is allowed!`)
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        setError("");
    };

    return (
        <div className="blur">
            <input
                type="file"
                accept="image/jpeg, image/png, image/gif, imgae/webp"
                ref={inputRef}
                hidden
                onChange={handleImage}
            />
            <div className="postBox pictureBox" ref={popupRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShow(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update Profile Picture</span>
                </div>
                <div className="update_picture_wrap">
                    <div className="update_picture_btns">
                        <button className="pink_btn" onClick={() => inputRef.current.click()}>
                            <i className="plus_icon filter_white" />Upload Image
                        </button>
                        {/* <button className="gray_btn">
                            <i className="frame_icon" />Add Frame
                        </button> */}
                    </div>
                </div>
                {error &&
                    <div className="postError_forth comment_error">
                        <div className="postError_error">{error}</div>
                        <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                    </div>
                }
                <div className="old_pictures_wrap scrollbar">
                    <h4>Profile Pictures</h4>
                    <div className="old_pictures">
                        {photos && photos.filter(img => img.folder === `${user.username}/profile_pictures`).map((photo, i) => (
                            <img 
                                src={photo.secure_url} 
                                key={i}
                                onClick={() => setImage(photo.secure_url)}
                                alt="Profile Pictures" 
                            />
                        ))}
                    </div>
                    <h4>Other Pictures</h4>
                    <div className="old_pictures">
                        {photos && photos.filter(img => img.folder !== `${user.username}/profile_pictures`).map((photo, i) => (
                            <img 
                                src={photo.secure_url} 
                                key={i}
                                onClick={() => setImage(photo.secure_url)} 
                                alt="Profile Pictures" 
                            />
                        ))}
                    </div>
                </div>
            </div>
            {
                image && <UpdateProfilePicture popupRef={popupRef} image={image} setImage={setImage} setError={setError} setShow={setShow} pRef={pRef} />
            }
        </div>
    )
}
