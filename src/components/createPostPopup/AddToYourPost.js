import { Dots, Feeling, Photo } from "../../svg"


export default function AddToYourPost() {
    return (
        <div className="addtoyourpost">
            <div className="addto_text">Add to your Post</div>
            <div className="post_header_right hover4">
                <Photo color="#45BD62"/>
            </div>
            <div className="post_header_right hover4">
                <i className="tag_icon"></i>
            </div>
            <div className="post_header_right hover4">
                <Feeling color="#F7B928"/>
            </div>
            <div className="post_header_right hover4">
                <i className="maps_icon"></i>
            </div>
            <div className="post_header_right hover4">
                <i className="microphone_icon"></i>
            </div>
            <div className="post_header_right hover4">
                <Dots color="#65676B"/>
            </div>
        </div>
    )
}
