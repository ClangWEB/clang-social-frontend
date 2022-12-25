import { useState } from "react";
import MenuItem from "./MenuItem";

export default function PostMenu({ userId, postUserId }) {
    const [test, setTest] = useState(postUserId === userId ? true : false);

    return (
        <ul className="post_menu">
            {test && <MenuItem icon="pin_icon" title="Pin Post" subtitle="Pin this post." />}
            <MenuItem icon="save_icon" title="Save Post" subtitle="Save this post to your saved items." />
        </ul>
    )
}
