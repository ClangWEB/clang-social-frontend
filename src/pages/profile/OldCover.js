import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";


export default function OldCover({ photos, setCoverPicture, setShowOld }) {
    // const { user } = useSelector((state) => ({ ...state }));
    const Ref = useRef(null);
    useClickOutside(Ref, () => setShowOld(false));

    return (
        <div className="blur">
            <div className="postBox selectCoverBox" ref={Ref}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShowOld(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select Photo</span>
                </div>
                {/* <div className="selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div> */}
                <div className="old_pictures_wrap scrollbar">
                    {/* <h4>Cover Photos</h4> */}
                    <h4>Your Pictures</h4>
                    <div className="old_pictures">
                        {/* {photos && photos.filter(img => img.folder === `${user.username}/cover_pictures`).map((photo) => ( */}
                        {photos && photos.map((photo) => (
                            <img
                                src={photo.secure_url}
                                key={photo.public_id}
                                onClick={() => {
                                    setCoverPicture(photo.secure_url);
                                    setShowOld(false);
                                }}
                                alt="Profile Pictures"
                            />
                        ))}
                    </div>
                    {/* <h4>Other Photos</h4>
                    <div className="old_pictures">
                        {photos && photos.filter(img => img.folder !== `${user.username}/cover_pictures`).map((photo) => (
                            <img
                                src={photo.secure_url}
                                key={photo.public_id}
                                onClick={() => setCoverPicture(photo.secure_url)}
                                alt="Profile Pictures"
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}
