import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";


export default function CreatePost({ user, setPostVisible, profile, setRoomOpen, setShowPreview, setType }) {

    return (
        <div className="createPost">
            <div className="createPost_header">
                <img src={user?.picture} alt="" />
                <div className="open_post hover2" onClick={() => {
                    setType(`Say hii to world, ${user?.first_name}`)
                    setShowPreview(false);
                    setPostVisible(true);
                }}>
                    Say hii to world, {user?.first_name}
                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="createPost_body">
                <div className="createPost_icon hover1" onClick={() => {
                    setPostVisible(true);
                    setShowPreview(true);
                }}>
                    <Photo color="#4bbf67" />Image
                </div>
                <div className="createPost_icon hover1" onClick={() => { setRoomOpen(true) }}>
                    <LiveVideo color="#f3425f" />Video Chat
                </div>
                {/* {profile ?
                    <div className="createPost_icon hover1" onClick={() => {
                        setPostVisible(true);
                    }}>
                        <i className="lifeEvent_icon" />Life Events
                    </div> :
                    <div className="createPost_icon hover1" onClick={() => {
                        setType(`How are u feeling today, ${user?.first_name}`);
                        setPostVisible(true)
                    }}>
                        <Feeling color="#f7b928" />Thoughts
                    </div>
                } */}
                <div className="createPost_icon hover1" onClick={() => {
                    setType(`How r u feeling today, ${user?.first_name}`);
                    setShowPreview(false)
                    setPostVisible(true)
                }}>
                    <Feeling color="#f7b928" />Thoughts
                </div>
            </div>
        </div>
    )
}
