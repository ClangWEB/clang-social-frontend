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
}) {
    return (
        <div className="add_bio_wrap">
            <textarea
                className="scrollbar textarea_pink details_input"
                placeholder={placeholder}
                name={name}
                value={infos?.[name]}
                maxLength="150"
                onChange={handleChange}
            />
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
