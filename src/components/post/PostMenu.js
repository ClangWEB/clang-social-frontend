import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside";

export default function PostMenu({ userId, postUserId, imagesLength, setShowMenu }) { // eslint-disable-next-line
    const [test, setTest] = useState(postUserId === userId ? true : false);
    const menuRef = useRef(null);
    useClickOutside(menuRef,() => setShowMenu(false));

    return (
        <ul className="post_menu" ref={menuRef}>
            {test && <MenuItem icon="pin_icon" title="Pin Post" subtitle="Pin this post." />}
            <MenuItem icon="save_icon" title="Save Post" subtitle="Save this post to your saved items." />
            <div className="line"></div>
            {test && <MenuItem icon="edit_icon" title="Edit Post" />}
            {!test && <MenuItem icon="turnOnNotification_icon" title="Turn on notifications for this post" />}
            {imagesLength && <div><MenuItem icon="download_icon" title="Download" /></div>}
            {imagesLength && <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />}
            {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
            {test && <MenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post" />}
            {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
            {test && <MenuItem icon="date_icon" title="Edit Date" />}
            {test && <MenuItem icon="refresh_icon" title="Refresh share attachment" />}
            {test && <div className="line"></div>}
            {test && <MenuItem icon="archive_icon" title="Move to archive" />}
            {test && <div><MenuItem icon="trash_icon" title="Move to trash" subtitle="Items in trash are deleted after 30 days" /></div>}
            {!test && <div className="line"></div>}
            {!test && <MenuItem img="../../../icons/report.png" title="Report Post" subtitle="I'm concerned about this post" />}
        </ul>
    )
}
