import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";


export default function CreatePost({ user, setPostVisible, profile }) {
    return (
        <div className="createPost">
            <div className="createPost_header">
                <img src={user?.picture} alt="" />
                <div className="open_post hover2" onClick={() => { setPostVisible(true) }}>
                    Say hii to world, {user?.first_name}
                    {/* What's on your mind, {user?.first_name}... */}
                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="createPost_body">
                <div className="createPost_icon hover3">
                    <Photo color="#4bbf67" />Image/Video
                </div>
                <div className="createPost_icon hover3">
                    <LiveVideo color="#f3425f" />Live Video
                </div>
                {profile ?
                    <div className="createPost_icon hover3">
                        <i className="lifeEvent_icon" />Life Events
                    </div> :
                    <div className="createPost_icon hover3">
                        <Feeling color="#f7b928" />Thoughts
                    </div>
                }
            </div>
        </div>
    )
}
