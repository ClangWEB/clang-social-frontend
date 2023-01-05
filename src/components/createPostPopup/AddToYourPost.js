import { Photo } from "../../svg";
// import { Dots, Feeling, Photo } from "../../svg";


export default function AddToYourPost({ setShowPreview }) {
    return (
        <div className="addtoyourpost">
            <div className="addto_text">Add to your Post</div>
            <div className="post_header_right hover1" onClick={() => {setShowPreview(true)}}>
                <Photo color="#45BD62"/>
            </div>
            {/* <div className="post_header_right hover1">
                <i className="tag_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <Feeling color="#F7B928"/>
            </div>
            <div className="post_header_right hover1">
                <i className="maps_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <i className="microphone_icon"></i>
            </div>
            <div className="post_header_right hover1">
                <Dots color="#65676B"/>
            </div> */}
        </div>
    )
}
