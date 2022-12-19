export default function DisplayAccess({ setVisible }) {
    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="circle hover1" onClick={() => setVisible(0)}>
                    <i className="arrow_back_icon"></i>
                </div>
                Display & Accessibility
            </div>
            <div className="menu_main">
                <div className="small_circle">
                    <i className="dark_filled_icon"></i>
                </div>
                <div className="menu_col">
                    <div className="menu_span3">Appearance</div>
                    <div className="menu_span2">Adjust the view according to what's best for you.</div>
                </div>
            </div>
            <label htmlFor="darkOff" className="hover1">
                <span>Light Mode</span>
                <input type="radio" name="dark" id="darkOff" />
            </label>
            <label htmlFor="darkOn" className="hover1">
                <span>Dark Mode</span>
                <input type="radio" name="dark" id="darkOn" />
            </label>
            <div className="menu_main">
                <div className="small_circle">
                    <i className="compact_icon"></i>
                </div>
                <div className="menu_col">
                    <div className="menu_span3">Compact Mode</div>
                    <div className="menu_span2">Turn your font size smaller.</div>
                </div>
            </div>
            <label htmlFor="compactOff" className="hover1">
                <span>Off</span>
                <input type="radio" name="compact" id="compactOff" />
            </label>
            <label htmlFor="compactOn" className="hover1">
                <span>On</span>
                <input type="radio" name="compact" id="compactOn" />
            </label>
            <div className="menu_item hover3">
                <div className="small_circle">
                    <i className="keyboard_icon"></i>
                </div>
                <div className="menu_span3">Keyboard</div>
                <div className="rArrow">
                    <i className="right_icon"></i>
                </div>
            </div>
        </div>
    )
}
