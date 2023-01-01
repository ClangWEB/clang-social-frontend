import { useState } from "react";
import MenuItem from "./MenuItem";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";

export default function PostMenu({ userId, postUserId, imagesLength, postId, token, checkSaved, setCheckSaved, images, imagesName, postRef }) { // eslint-disable-next-line
    const [test, setTest] = useState(postUserId === userId ? true : false);

    const saveHandler = async () => {
        savePost(postId, token);
        if (checkSaved) setCheckSaved(false);
        else setCheckSaved(true);
    };

    const downloadImages = async () => {
        images.map((img) => (
            saveAs(img.url, `${imagesName}`)
        ))
    };

    const deleteHandler = async () => {
        const res = await deletePost(postId, token);
        if (res.status === "ok") {
            postRef.current.style.display = "none"
        }
    };

    return (
        // <ul className="post_menu" ref={menuRef}>
        <ul className="post_menu">
            {/* {test && <MenuItem icon="pin_icon" title="Pin Post" subtitle="Pin this post." />} */}
            <div onClick={() => saveHandler()}>
                {checkSaved
                    ? <MenuItem
                        icon="save_icon"
                        title="Unsave Post"
                        subtitle="Remove this post from your saved items."
                    />
                    : <MenuItem
                        icon="save_icon"
                        title="Save Post"
                        subtitle="Save this post to your saved items."
                    />}
            </div>
            {/* <div className="line"></div> */}
            {/* {test && <MenuItem icon="edit_icon" title="Edit Post" />}
            {!test && <MenuItem icon="turnOnNotification_icon" title="Turn on notifications for this post" />} */}
            {imagesLength && (
                <div onClick={() => downloadImages()}>
                    <MenuItem icon="download_icon" title="Download" />
                </div>
            )}
            {/* {imagesLength && <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />}
            {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
            {test && <MenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post" />}
            {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
            {test && <MenuItem icon="date_icon" title="Edit Date" />}
            {test && <MenuItem icon="refresh_icon" title="Refresh share attachment" />} */}
            {test && <div className="line"></div>}
            {/* {test && <MenuItem icon="archive_icon" title="Move to archive" />} */}
            {test && (
                <div onClick={() => deleteHandler()}>
                    <MenuItem icon="trash_icon" title="Delete Post" subtitle="Post is deleted from Clang Social" />
                    {/* <MenuItem icon="trash_icon" title="Move to trash" subtitle="Items in trash are deleted after 30 days" /> */}
                </div>
            )}
            {!test && <div className="line"></div>}
            {!test && <MenuItem img="../../../icons/report.png" title="Report Post" subtitle="I'm concerned about this post" />}
        </ul>
    )
}
