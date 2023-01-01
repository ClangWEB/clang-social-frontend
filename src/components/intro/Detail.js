import { useState } from "react";
import Bio from "./Bio";


export default function Detail({ header, value, img, placeholder, name, handleChange, updateDetails, infos, text, rel }) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="add_details_flex" onClick={() => setShow(prev => !prev)}>
                {value ? (
                    <div className="info_profile">
                        <img src={`../../../icons/${img}.png`} alt="" />
                        <span className="value">{value}</span>
                        <i className="edit_icon"></i>
                    </div>
                ) : (
                    <>
                        <i className="rounded_plus_icon" />Add {text}
                    </>
                )}
            </div>
            {show && 
                <Bio
                    placeholder={placeholder}
                    name={name}
                    handleChange={handleChange}
                    updateDetails={updateDetails}
                    infos={infos}
                    detail
                    setShow={setShow}
                    rel={rel}
                />
            }
        </div>
    )
}
