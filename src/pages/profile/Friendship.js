import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";
import { acceptRequest, addFriend, cancelRequest, deleteRequest, follow, unfollow, unfriend } from "../../functions/user";


export default function Friendship({ friendship, setFriendship, profileid, followCount, setFollowCount, friendCount, setFriendCount }) {

    const { user } = useSelector((state) => ({ ...state }));

    const [friendsMenu, setFriendsMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const menuRef = useRef(null);
    const menu1Ref = useRef(null);
    useClickOutside(menuRef, () => setFriendsMenu(false));
    useClickOutside(menu1Ref, () => setRespondMenu(false));

    const addFriendHandler = async () => {
        setFriendship({ ...friendship, requestSent: true });
        // setFriendship({ ...friendship, requestSent: true, following: true });
        await addFriend(profileid, user.token);
    };
    const cancelRequestHandler = async () => {
        setFriendship({ ...friendship, requestSent: false });
        // setFriendship({ ...friendship, requestSent: false, following: false });
        await cancelRequest(profileid, user.token);
    };
    const followHandler = async () => {
        setFollowCount((prev) => ++prev);
        setFriendship({ ...friendship, following: true });
        await follow(profileid, user?.token);
    };
    const unfollowHandler = async () => {
        followCount !== 0 && setFollowCount((prev) => --prev);
        setFriendship({ ...friendship, following: false });
        await unfollow(profileid, user?.token);
    };
    const acceptRequestHandler = async () => {
        setFriendCount((prev) => ++prev);
        setFriendship({
            ...friendship,
            friends: true,
            // following: true,
            requestSent: false,
            requestReceived: false,
        });
        await acceptRequest(profileid, user?.token);
    };
    const unfriendHandler = async () => {
        friendCount !== 0 && setFriendCount((prev) => --prev);
        setFriendship({
            ...friendship,
            friends: false,
            // following: false,
            requestSent: false,
            requestReceived: false,
        });
        await unfriend(profileid, user?.token);
    };
    const deleteRequestHandler = async () => {
        setFriendship({
            ...friendship,
            friends: false,
            following: false,
            requestSent: false,
            requestReceived: false,
        });
        await deleteRequest(profileid, user?.token);
    };

    return (
        <div className="friendship">
            {friendship?.following ? (
                <button className="gray_btn" onClick={() => unfollowHandler()}>
                    <img src="../../../icons/following.png" alt="" />
                    <span>Following</span>
                </button>
            ) : (
                <button className="pink_btn" onClick={() => followHandler()}>
                    <img src="../../../icons/follow.png" className="invert" alt="" />
                    <span>Follow</span>
                </button>
            )}
            <div className="flex">
                {friendship?.friends ? (
                    <div className="friends_menu_wrap">
                        <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
                            <img src="../../../icons/friends.png" alt="" />
                            <span>Friends</span>
                        </button>
                        {friendsMenu && (
                            <div className="open_cover_menu_second" ref={menuRef}>
                                {/* <div className="open_cover_menu_item hover3">
                                <img src="../../../icons/favoritesOutline.png" alt="" />
                                Favorites
                            </div>
                            <div className="open_cover_menu_item hover3">
                                <img src="../../../icons/editFriends.png" alt="" />
                                Edit Friend list
                            </div> */}
                                {friendship?.following ? (
                                    <div className="open_cover_menu_item hover3" onClick={() => unfollowHandler()}>
                                        <img src="../../../icons/unfollowOutlined.png" alt="" />
                                        Unfollow
                                    </div>
                                ) : (
                                    <div className="open_cover_menu_item hover3" onClick={() => followHandler()}>
                                        <img src="../../../icons/following.png" style={{ scale: "1.1", marginRight: "3px" }} alt="" />
                                        Follow
                                    </div>
                                )}
                                <div className="open_cover_menu_item hover3" onClick={() => unfriendHandler()}>
                                    <i className="unfriend_outlined_icon"></i>
                                    Unfriend
                                </div>
                            </div>
                        )}
                    </div>
                ) : !friendship?.requestSent && !friendship?.requestReceived && (
                    <button className="pink_btn" onClick={() => addFriendHandler()} >
                        <img src="../../../icons/addFriend.png" className="filter_white" alt="" />
                        <span>Be Friends</span>
                    </button>
                )}
                {friendship?.requestSent ? (
                    <button className="gray_btn" onClick={() => cancelRequestHandler()}>
                        <img src="../../../icons/cancelRequest.png" alt="" />
                        <span>Cancel Request</span>
                    </button>
                ) : (
                    friendship?.requestReceived && (
                        <div className="friends_menu_wrap">
                            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
                                {/* <img src="../../../icons/friends.png" alt="" /> */}
                                <img src="../../../icons/editFriends.png" alt="" />
                                <span>Action</span>
                            </button>
                            {respondMenu && (
                                <div className="open_cover_menu" ref={menu1Ref}>
                                    <div className="open_cover_menu_item hover3" onClick={() => acceptRequestHandler()}>
                                        <img src="../../../icons/addFriend.png" alt="" />
                                        Accept Friend Request
                                    </div>
                                    <div className="open_cover_menu_item hover3" onClick={() => deleteRequestHandler()}>
                                        <img src="../../../icons/cancelRequest.png" alt="" />
                                        Reject Friend Request
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )
                }
                <button className={friendship?.friends ? "pink_btn" : "gray_btn"}>
                    <img src="../../../icons/message.png" className={friendship?.friends ? "invert" : ""} alt="" />
                    <span>Message</span>
                </button>
            </div>
        </div>
    )
}
