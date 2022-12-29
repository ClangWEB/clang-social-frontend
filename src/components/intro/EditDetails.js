import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Detail from "./Detail";


export default function EditDetails({ visible, setVisible, details, handleChange, updateDetails, infos }) {
    const infosRef = useRef(null);
    useClickOutside(infosRef, () => setVisible(false));

    return (
        <div className="blur">
            <div className="postBox infosBox" ref={infosRef}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setVisible(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>SHOWCASE</span>
                </div>
                <div className="details_wrapper scrollbar">
                    {/* <div className="details_col">
                        <span>Customize Your Intro</span>
                        <span>Public<i className="public_icon"/></span>
                    </div> */}
                    <div className="details_header">Nickname</div>
                    <Detail
                        value={details?.otherName}
                        img="studies"
                        placeholder="Add Your Nickname"
                        name="otherName"
                        text="Nickname"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Work</div>
                    <Detail
                        value={details?.job}
                        img="job"
                        placeholder="Add Your Job title"
                        name="job"
                        text="Job"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <Detail
                        value={details?.workPlace}
                        img="job"
                        placeholder="Add Your Workplace"
                        name="workPlace"
                        text="Workplace"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Education</div>
                    <Detail
                        value={details?.highSchool}
                        img="studies"
                        placeholder="Add Your Highschool"
                        name="highSchool"
                        text="Highschool"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <Detail
                        value={details?.college}
                        img="studies"
                        placeholder="Add Your College"
                        name="college"
                        text="College"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Current City</div>
                    <Detail
                        value={details?.currentCity}
                        img="home"
                        placeholder="Add Your Current city"
                        name="currentCity"
                        text="Current city"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Hometown</div>
                    <Detail
                        value={details?.hometown}
                        img="home"
                        placeholder="Add Your Hometown"
                        name="hometown"
                        text="Hometown"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Relationship</div>
                    <Detail
                        value={details?.relationship}
                        img="relationship"
                        placeholder="Add Your Hometown status"
                        name="relationship"
                        text="Relationship status"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                        rel
                    />
                    <div className="details_header">Instagram</div>
                    <Detail
                        value={details?.instagram}
                        img="instagram"
                        placeholder="Add Your Instagram"
                        name="instagram"
                        text="Instagram"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className="details_header">Links</div>
                    <Detail
                        value={details?.otherLinks}
                        img="public"
                        placeholder="Add any Links you wish"
                        name="otherLinks"
                        text="Links"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                </div>
            </div>
        </div>
    )
}
