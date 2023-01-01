export default function Bio({
    infos,
    handleChange,
    max,
    setShowBio,
    updateDetails,
    placeholder,
    name,
    detail,
    setShow,
    rel
}) {

    return (
        <div className="add_bio_wrap">
            {!rel ? (
                <textarea
                    className="scrollbar textarea_pink details_input"
                    placeholder={placeholder}
                    name={name}
                    value={infos?.[name]}
                    maxLength={detail ? 50 : 150}
                    onChange={handleChange}
                />) : (
                <select className="select_rel" name={name} value={infos?.relationship} onChange={handleChange}>
                    <option value="Single">Single</option>
                    <option value="In a Relationship">In a Relationship</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="">Prefer not to say</option>
                </select>
            )}
            {!detail && <div className="remain">{max} characters remaining</div>}
            <div className="flex">
                <div className="flex flex_left">
                    {/* <i className="public_icon" />Public */}
                </div>
                <div className="flex flex_right">
                    <div className="gray_btn" onClick={() => !detail ? setShowBio(false) : setShow(false)}>CANCEL</div>
                    <div className="pink_btn" onClick={() => {
                        updateDetails();
                        setShow(false);
                    }}>
                        SAVE
                    </div>
                </div>
            </div>
        </div>
    )
}
