import { useEffect, useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";


export default function ProfilePictureInfos({ profile, visitor, othername, photos }) {
    const [show, setShow] = useState(false);
    const pRef = useRef(null);

    const friendshipp = profile?.friendship;
    const [friendship, setFriendship] = useState(friendshipp);

    const [friendCount, setFriendCount] = useState(profile?.friends?.length);
    const [followCount, setFollowCount] = useState(profile?.followers?.length);
    useEffect(() => {
        setFriendship(friendshipp);
        setFollowCount(profile?.followers?.length);
    }, [friendshipp, profile?.followers?.length]);

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
                    <div className="profile_friend_count gray_btn">
                        {profile?.followers && (
                            <div className="profile_card_count">
                                <span>{followCount}</span>
                                <span>Followers</span>
                            </div>
                        )}
                        <div className="line_seperator"></div>
                        {profile?.following && (
                            <div className="profile_card_count">
                                <span>{profile?.following.length}</span>
                                <span>Following</span>
                            </div>
                        )}
                        <div className="line_seperator"></div>
                        {profile?.following && (
                            <div className="profile_card_count">
                                <span>{friendCount}</span>
                                <span>Friends</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {visitor ? (
                <Friendship
                    friendship={friendship}
                    setFriendship={setFriendship}
                    profileid={profile._id}
                    followCount={followCount}
                    setFollowCount={setFollowCount}
                    friendCount={friendCount}
                    setFriendCount={setFriendCount}
                />
                // <Friendship 
                //     friendshipp={profile?.friendship} 
                //     profileid={profile._id}
                // />
            ) : (
                ""
                // <div className="profile_w_right">
                //     <div className="light_pink_btn">
                //         <img src="../../../icons/plus.png" className="invert" alt="" />
                //         <span>Add to Story</span>
                //     </div>
                //     <div className="gray_btn">
                //         <i className="edit_icon"></i>
                //         <span>Edit Profile</span>
                //     </div>
                // </div >
            )
            }
        </div >
    )
}
