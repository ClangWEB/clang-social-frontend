import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";

export default function RoomInput({ setRoomOpen }) {
    const [RoomCode, setRoomCode] = useState("");
    const navigate = useNavigate();
    const roomRef = useRef(null);
    useClickOutside(roomRef, () => setRoomOpen(false));
    const [error, setError] = useState("");

    const submitCode = () => {
        if (RoomCode === "") {
            setError("Create or Enter the code");
        }
        else {
            setError("");
            navigate(`/room/${RoomCode}`);
            setRoomOpen(false);
        }
    };

    return (
        <div className='blur'>
            <div className="postBox" ref={roomRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setRoomOpen(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create/Join Room</span>
                </div>
                {!error
                    ? <textarea
                        autoFocus
                        maxLength="250"
                        value={RoomCode}
                        placeholder="Enter a Room Code"
                        className="post_input myInput scrollbar"
                        onChange={(e) => setRoomCode(e.target?.value)}
                        style={{ color: "white" }}
                    ></textarea>
                    :
                    <div className="postError comment_error">
                        <div className="postError_error">{error}</div>
                        <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                    </div>
                }
                <button className="post_submit" onClick={() => { submitCode() }}>Proceed</button>
                <div className="create_splitter"></div>
                <div className="createPost_icon">
                    Be sure to share the code with your friends
                </div>
            </div>
        </div>
    )
}
