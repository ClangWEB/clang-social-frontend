import { useEffect, useState } from "react";
import "./style.css";
import Bio from "./Bio";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";


export default function Intro({ detailss, visitor, setOthername }) {
    const { user } = useSelector((state) => ({ ...state }));
    const [details, setDetails] = useState();

    useEffect(() => {
        setDetails(detailss);
        setInfos(detailss);
    }, [detailss]);
    const initial = {
        bio: details?.bio ? details.bio : "",
        otherName: details?.otherName ? details.otherName : "",
        hobby: details?.hobby ? details.hobby : "",
        job: details?.job ? details.job : "",
        workPlace: details?.workPlace ? details.workPlace : "",
        highSchool: details?.highSchool ? details.highSchool : "",
        college: details?.college ? details.college : "",
        currentCity: details?.currentCity ? details.currentCity : "",
        hometown: details?.hometown ? details.hometown : "",
        relationship: details?.relationship ? details.relationship : "",
        instagram: details?.instagram ? details.instagram : "",
        otherLinks: details?.otherLinks ? details.otherLinks : ""
    };
    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [visible, setVisible] = useState(false);
    const [max, setMax] = useState(infos?.bio ? 150 - infos?.bio.length : 150);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfos({ ...infos, [name]: value });
        setMax(150 - e.target.value.length)
    };

    const updateDetails = async () => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateDetails`, {
                infos,
            }, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setDetails(data);
            setShowBio(false);
            setOthername(data.otherName);
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className="profile_card">
            <div className="profile_card_header">Intro</div>

            {/* BIO */}
            {details?.bio && !showBio && (
                <div className="info_col">
                    <span className="info_text">{details?.bio}</span>
                    {!visitor &&
                        <button className="gray_btn hover2" onClick={() => setShowBio(true)}>  {/*style={{ fontWeight: "700", fontSize: "15px" }}*/}
                            Edit Bio
                        </button>
                    }
                </div>
            )}
            {showBio &&
                <Bio
                    infos={infos}
                    handleChange={handleChange}
                    max={max}
                    setShowBio={setShowBio}
                    updateDetails={updateDetails}
                    placeholder="Add Bio"
                    name="bio"
                    norem
                />
            }

            {/* JOB */}
            {details?.job && details?.workPlace ? (
                <div className="info_profile">
                    <img src="../../../icons/job.png" alt="" />
                    <span>{details?.job} at <span style={{ fontWeight: "600" }}>{details?.workPlace}</span></span>
                </div>
            ) : details?.job && !details?.workPlace ? (
                <div className="info_profile">
                    <img src="../../../icons/job.png" alt="" />
                    Works as {details?.job}
                </div>
            ) : details?.workPlace && !details?.job && (
                <div className="info_profile">
                    <img src="../../../icons/job.png" alt="" />
                    Works at {details?.workPlace}
                </div>
            )}

            {/* HIGH SCHOOL */}
            {details?.highSchool && (
                <div className="info_profile">
                    <img src="../../../icons/studies.png" alt="" />
                    Studied at {details?.highSchool}
                </div>
            )}

            {/* EDUCATION */}
            {details?.college && (
                <div className="info_profile">
                    <img src="../../../icons/studies.png" alt="" />
                    Studied at {details?.college}
                </div>
            )}

            {/* CURRENT CITY */}
            {details?.currentCity && (
                <div className="info_profile">
                    <img src="../../../icons/home.png" alt="" />
                    Lives in {details?.currentCity}
                </div>
            )}

            {/* HOME TOWN */}
            {details?.hometown && (
                <div className="info_profile">
                    <img src="../../../icons/from.png" alt="" />
                    From {details?.hometown}
                </div>
            )}

            {/* RELATIONSHIP */}
            {details?.relationship && (
                <div className="info_profile">
                    <img src="../../../icons/relationship.png" alt="" />
                    {details?.relationship}
                </div>
            )}

            {/* INSTAGRAM */}
            {details?.instagram && (
                <div className="info_profile">
                    <img src="../../../icons/instagram.png" alt="" />
                    <a href={`https://www.instagram.com/${details?.instagram}`} target="_blank" rel="noreferrer">{details?.instagram}</a>
                </div>
            )}

            {/* OTHER LINKS */}
            {details?.otherLinks && (
                <div className="info_profile">
                    <i className="public_icon"></i>
                    <a href={`${details?.otherLinks}`} target="_blank" rel="noreferrer">Links</a>
                </div>
            )}

            {!visitor && !details?.bio && !showBio &&
                <button onClick={() => setShowBio(true)} className="gray_btn hover2 w100">Add Bio</button>
            }
            {!visitor &&
                <button className="gray_btn hover2 w100" onClick={() => setVisible(true)}>Edit Details</button>
            }
            {visible && !visitor &&
                <EditDetails
                    visible={visible}
                    setVisible={setVisible}
                    details={details}
                    handleChange={handleChange}
                    updateDetails={updateDetails}
                    infos={infos}
                />
            }
            {/* <div className="flex">
                {!visitor &&
                    <button className="gray_btn hover2 w100">Add Hobbies</button>
                }
                {!visitor &&
                    <button className="gray_btn hover2 w100">Add Featured</button>
                }
            </div> */}
        </div>
    )
}
