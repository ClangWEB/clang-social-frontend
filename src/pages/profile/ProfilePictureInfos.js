import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";


export default function ProfilePictureInfos({ profile, visitor, photos }) {
    const [show, setShow] = useState(false);
    const pRef = useRef(null);

    return (
        <div className="profile_img_wrap">
            {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
            <div className="profile_w_left">
                <div className="profile_w_img">
                    <div className="profile_w_bg" 
                        ref={pRef}
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url(${profile?.picture})`
                        }}>
                    </div>
                    {!visitor &&
                        <div className="profile_circle hover5" onClick={() => { setShow(true) }}>
                            <i className="camera_filled_icon"></i>
                        </div>
                    }
                </div>
                <div className="profile_w_col">
                    <div className="profile_name">
                        {profile?.first_name} {profile?.last_name}
                        <div className="othername">Nickname</div>
                    </div>
                    <div className="profile__friend_count"></div>
                    <div className="profile__friend_imgs"></div>
                </div>
            </div>
            {!visitor && (
                <div className="profile_w_right">
                    <div className="light_pink_btn">
                        <img src="../../../icons/plus.png" className="invert" alt="" />
                        <span>Add to Story</span>
                    </div>
                    <div className="gray_btn">
                        <i className="edit_icon"></i>
                        <span>Edit Profile</span>
                    </div>
                </div>
            )}
        </div>
    )
}