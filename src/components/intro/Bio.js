export default function Bio({ infos, handleBioChange, max, setShowBio, updateDetails }) {
    return (
        <div className="add_bio_wrap">
            <textarea
                className="scrollbar textarea_pink details_input"
                placeholder="Add Bio"
                name="bio"
                value={infos?.bio}
                maxLength="150"
                onChange={handleBioChange}
            />
            <div className="remain">{max} characters remaining</div>
            <div className="flex">
                <div className="flex flex_left">
                    {/* <i className="public_icon" />Public */}
                </div>
                <div className="flex flex_right">
                    <div className="gray_btn" onClick={() => {setShowBio(false)}}>CANCEL</div>
                    <div className="pink_btn" onClick={() => updateDetails()}>SAVE</div>
                </div>
            </div>
        </div>
    )
}
