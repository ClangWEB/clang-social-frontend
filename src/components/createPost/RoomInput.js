import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import BounceLoader from "react-spinners/BounceLoader";

export default function RoomInput({ setRoomOpen }) {
    const [RoomCode, setRoomCode] = useState("");
    const navigate = useNavigate();
    const roomRef = useRef(null);
    useClickOutside(roomRef, () => setRoomOpen(false));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitCode = () => {
        if (RoomCode === "") {
            setLoading(false);
            setError("Create or Enter the code");
        }
        else {
            setError("");
            setLoading(false)
            navigate(`/room/${RoomCode}`);
            setRoomOpen(false);
        }
    };

    return (
        <div className='blur'>
            <div className="postBox" ref={roomRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => {
                        setRoomOpen(false);
                        navigate("/");
                        }}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Room</span>
                </div>
                {!error
                    ? <textarea
                        // autoFocus
                        maxLength="10"
                        value={RoomCode}
                        placeholder="Create or Enter a Room Code"
                        className="post_input"
                        // className="post_input scrollbar"
                        onChange={(e) => setRoomCode(e.target?.value)}
                        style={{ color: "white" }}
                    ></textarea>
                    :
                    <div className="postError comment_error">
                        <div className="postError_error">{error}</div>
                        <button className="pink_btn" onClick={() => { setError("") }}>Retry</button>
                    </div>
                }
                <div className="room_submit">
                    <button className="post_submit_second" onClick={() => {
                        setLoading(true);
                        submitCode();
                    }}>{
                            loading ? <BounceLoader color='white' size={20} /> : "PROCEED"
                        }</button>
                </div>
                <div className="create_splitter"></div>
                <div className="createPost_icon">
                    Be sure to share the code with your friends
                </div>
            </div>
        </div>
    )
}
