import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";


export default function ProfilePictureInfos({ profile, visitor, othername, photos }) {
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
                        }}
                    >
                    </div>
                    {!visitor &&
                        <div className="profile_circle hover5" onClick={() => { setShow(true) }}>
                            <i className="camera_filled_icon"></i>
                        </div>
                    }
                </div>
                <div className="profile_w_col">
                    <div className="profile_name">
                        <div className="first_last">{profile?.first_name} {profile?.last_name}</div>
                        <div className="othername">{othername && `${othername}`}</div>
                    </div>
                    <div className="profile_friend_count">
                        {profile?.friends && (
                            <div className="profile_card_count">
                                {profile?.friends.length === 0
                                    ? "No Friends yet"
                                    : profile?.friends.length === 1
                                        ? "1 Friend"
                                        : `${profile?.friends.length} Friends`
                                }
                            </div>
                        )}
                    </div>
                    <div className="profile_friend_imgs" style={{transform: `translateX(${profile?.friends && profile?.friends.length >= 6 && "13px"})`}}>
                        {profile?.friends && profile?.friends.slice(0, 6).map((friend, i) => (
                            <Link to={`/profile/${friend?.username}`}  key={i}>
                                <img 
                                    src={friend.picture} 
                                    style={{ transform: `translateX(${-i * 5}px)`, zIndex: `${i}`}} 
                                    alt="Friend"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {visitor ? (
                <Friendship friendshipp={profile?.friendship} profileid={profile._id} />
            ) : (
                <div className="profile_w_right">
                    <div className="light_pink_btn">
                        <img src="../../../icons/plus.png" className="invert" alt="" />
                        <span>Add to Story</span>
                    </div>
                    <div className="gray_btn">
                        <i className="edit_icon"></i>
                        <span>Edit Profile</span>
                    </div>
                </div >
            )
            }
        </div >
    )
}
