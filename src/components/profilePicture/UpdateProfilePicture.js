import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";


export default function UpdateProfilePicture({ popupRef, image, setImage, setError, setShow, pRef }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const sliderRef = useRef(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const zoomIn = () => {
        sliderRef.current.stepUp();
        setZoom(sliderRef.current.value);
    };
    const zoomOut = () => {
        sliderRef.current.stepDown();
        setZoom(sliderRef.current.value);
    };
    const getCroppedImage = useCallback(async (show) => {
        try {
            const img = await getCroppedImg(image, croppedAreaPixels);
            if (show) {
                setZoom(1);
                setCrop({ x: 0, y: 0 });
                setImage(img);
            }
            else return img;
        }
        catch (error) { }
    }, [croppedAreaPixels, image, setImage]);

    const updateProfilePicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/profile_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);
            const res = await uploadImages(formData, user.token, path);
            const updated_picture = await updateprofilePicture(res[0].url, user.token);
            if (updated_picture === "ok") {
                const new_post = await createPost(
                    "profilePicture",
                    null,
                    desc,
                    res,
                    user.id,
                    user.token
                );
                if (new_post.status === "ok") {
                    setLoading(false);
                    setImage("");
                    pRef.current.style.backgroundImage = `url(${res[0].url})`;
                    Cookies.set(
                        "user",
                        JSON.stringify({
                            ...user,
                            picture: res[0].url,
                        })
                    );
                    dispatch({
                        type: "UPDATEPICTURE",
                        payload: res[0].url,
                    });
                    setShow(false);
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
            setError(error.response.data.message);
        }
    };

    return (
        <div className="postBox update_img" ref={popupRef}>
            <div className="box_header">
                <div className="small_circle" onClick={() => { setImage("") }}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update Profile Picture</span>
            </div>
            <div className="update_image_desc">
                <textarea
                    className="textarea_pink details_input"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className="update_center">
                <div className="cropper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                    />
                </div>
                <div className="slider">
                    <div className="slider_circle hover4" onClick={() => zoomOut()}>
                        <i className="minus_icon"></i>
                    </div>
                    <input ref={sliderRef} type="range" min={1} max={3} step={0.2} value={zoom} onChange={(e) => setZoom(e.target.value)} />
                    <div className="slider_circle hover4" onClick={() => zoomIn()}>
                        <i className="plus_icon"></i>
                    </div>
                </div>
            </div>
            <div className="flex_up">
                <div className="gray_btn" onClick={() => getCroppedImage("show")}>
                    <i className="crop_icon" />Crop Photo
                </div>
                <div className="gray_btn">
                    <i className="temp_icon" />Make Temporary
                </div>
            </div>
            <div className="flex_p_t">
                {/* <i className="public_icon"></i>Public */}
            </div>
            <div className="update_submit_wrap">
                <div className="pink_link" onClick={() => setImage("")}>CANCEL</div>
                <button className="pink_btn" disabled={loading} onClick={() => updateProfilePicture()}>
                    {loading
                        ? <PulseLoader
                            color="#fff"
                            size={15}
                        />
                        : "SAVE"
                    }
                </button>
            </div>
        </div>
    )
}
