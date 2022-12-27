import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";


export default function Cover({ cover, visitor }) {
    const [showCoverMenu, setShowCoverMenu] = useState(false);
    const [coverPicture, setCoverPicture] = useState("");
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => setShowCoverMenu(false));
    const refInput = useRef(null);
    const coverRef = useRef(null);
    const [width, setWidth] = useState();
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
        else if (file.size > 5242880) {
            e.target.value = null;
            setError(`Max 5mb is allowed!`)
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setCoverPicture(event.target.result);
        };
        setError("");
    };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
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

    return (
        <div className="profile_cover" ref={coverRef}>
            {coverPicture && (
                <div className="save_changes_cover">
                    <div className="save_changes_left">
                        <i className="public_icon" />Edit your Cover Photo
                    </div>
                    <div className="save_changes_right">
                        <button className="pink_btn opacity_btn">Cancel</button>
                        <button className="pink_btn">Save Changes</button>
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
            {cover && <img src={cover} className="cover" alt="Profile Cover" />}
            {!visitor && (
                <div className="update_cover_wrapper">
                    <div className="open_cover_update" onClick={() => setShowCoverMenu(prev => !prev)}>
                        <i className="camera_filled_icon"></i>
                        Add Cover Photo
                    </div>
                    {showCoverMenu && (
                        <div className="open_cover_menu" ref={menuRef}>
                            <div className="open_cover_menu_item hover3" onClick={() => refInput.current.click()}>
                                <i className="upload_icon"></i>Upload Photo
                            </div>
                            <div className="open_cover_menu_item hover3">
                                <i className="photo_icon"></i>Select Photo
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
