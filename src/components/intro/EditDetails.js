import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Detail from "./Detail";


export default function EditDetails({ setVisible, details, handleChange, updateDetails, infos }) {
    const infosRef = useRef(null);
    useClickOutside(infosRef, () => setVisible(0));

    return (
        <div className="blur">
            <div className="postBox infosBox" ref={infosRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setVisible(0)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>SHOWCASE</span>
                </div>
                <div className="details_wrapper scrollbar">
                    {/* <div className="details_col">
                        <span>Customize Your Intro</span>
                        <span>Public<i className="public_icon"/></span>
                    </div> */}
                    <Detail 
                        header="Nickname" 
                        value={details?.otherName} 
                        img="studies"
                        placeholder="Add Your Nickname"
                        name="otherName"
                        text="Nickname"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                </div>
            </div>
        </div>
    )
}
