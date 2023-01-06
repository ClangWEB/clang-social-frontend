import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import OldCover from "./OldCover";


export default function Cover({ cover, visitor, photos }) {
    const coverRef = useRef(null);
    const { user } = useSelector((state) => ({ ...state }));
    const [showCoverMenu, setShowCoverMenu] = useState(false);
    const [coverPicture, setCoverPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => setShowCoverMenu(false));
    const refInput = useRef(null);
    const [width, setWidth] = useState();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showOld, setShowOld] = useState(false);
    const [newCover, setNewCover] = useState(cover);

    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    useEffect(() => {
        setWidth(coverRef.current.clientWidth); // eslint-disable-next-line
    }, [window.innerWidth]);

    const [error, setError] = useState("");
    const handleImage = (e) => {
        let file = e.target.files[0];
        if (file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/gif" &&
            file.type !== "image/webp"
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
            setCoverPicture(event.target.result);
        };
        setError("");
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const getCroppedImage = useCallback(async (show) => {
        try {
            const img = await getCroppedImg(coverPicture, croppedAreaPixels);
            if (show) {
                setZoom(1);
                setCrop({ x: 0, y: 0 });
                setCoverPicture(img);
            }
            else return img;
        }
        catch (error) { }
    }, [croppedAreaPixels, coverPicture]);

    const updateCoverPicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/cover_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);
            const res = await uploadImages(formData, user.token, path);
            const updated_picture = await updateCover(res[0].url, user.token);
            if (updated_picture === "ok") {
                const new_post = await createPost(
                    "coverPicture",
                    null,
                    null,
                    res,
                    user.id,
                    user.token
                );
                if (new_post.status === "ok") {
                    setLoading(false);
                    setNewCover(coverPicture);
                    setCoverPicture("");
                } else {
                    setLoading(false);
                    setError(new_post);
                }
            } else {
                setLoading(false);
                setError(updated_picture);
            }
        } catch (error) {
            setLoading(false);
            setError(error.response?.data.message);
        }
    };

    return (
        <div className="profile_cover" ref={coverRef}>
            {coverPicture && (
                <div className="save_changes_cover">
                    <div className="save_changes_left">
                        <span>Edit your Cover Photo</span>
                    </div>
                    <div className="save_changes_right">
                        <button className="pink_btn opacity_btn" onClick={() => setCoverPicture("")}>CANCEL</button>
                        <button className="pink_btn" onClick={() => updateCoverPicture()}>
                            {loading
                                ? <PulseLoader
                                    color="#fff"
                                    size={12}
                                />
                                : "SAVE"
                            }
                        </button>
                    </div>
                </div>
            )}
            <input
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                hidden
                ref={refInput}
                onChange={handleImage}
            />
            {error &&
                <div className="postError_forth comment_error">
                    <div className="postError_error">{error}</div>
                    <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                </div>
            }
            {coverPicture && (
                <div className="cover_cropper">
                    <Cropper
                        image={coverPicture}
                        crop={crop}
                        zoom={zoom}
                        aspect={width / 350}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={true}
                        objectFit="horizontal-cover"
                    />
                </div>
            )}
            {cover && !coverPicture &&
                <img
                    src={newCover}
                    className="cover"
                    alt="Profile Cover"
                />
            }
            {!visitor && (
                <div className="update_cover_wrapper">
                    <div className="open_cover_update hover2" onClick={() => setShowCoverMenu(prev => !prev)}>
                        <i className="camera_filled_icon"></i>
                        Add Cover Photo
                    </div>
                    {showCoverMenu && (
                        <div className="open_cover_menu" ref={menuRef}>
                            <div className="open_cover_menu_item hover5" onClick={() => refInput.current.click()}>
                                <i className="upload_icon"></i>Upload Photo
                            </div>
                            <div className="open_cover_menu_item hover5" onClick={() => setShowOld(true)}>
                                <i className="photo_icon"></i>Select Photo
                            </div>
                        </div>
                    )}
                </div>
            )}
            {showOld && <OldCover photos={photos} setCoverPicture={setCoverPicture} setShowOld={setShowOld} />}
        </div>
    )
}