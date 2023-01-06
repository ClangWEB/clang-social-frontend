import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";


export default function DisplayAccess({ setVisible }) {
    const dispatch = useDispatch();
    const { darkTheme } = useSelector((state) => ({ ...state }));

    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="circle hover1" onClick={() => setVisible(0)}>
                    <i className="arrow_back_icon"></i>
                </div>
                Display Setting
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
            <label
                htmlFor="darkOff"
                onClick={() => {
                    Cookies.set("darkTheme", false, {expires: 365});
                    dispatch({ type: "LIGHT" });
                }}
            >
                <span>Light Mode</span>
                {darkTheme
                    ? <input type="radio" name="dark" id="darkOff" className="themeInput"/>
                    : <input type="radio" name="dark" id="darkOff" className="themeInput" defaultChecked />
                }
            </label>
            <label
                htmlFor="darkOn"
                onClick={() => {
                    Cookies.set("darkTheme", true, {expires: 365});
                    dispatch({ type: "DARK" });
                }}
            >
                <span>Dark Mode</span>
                {darkTheme
                    ? <input type="radio" name="dark" id="darkOn" className="themeInput" defaultChecked />
                    : <input type="radio" name="dark" id="darkOn" className="themeInput"/>
                }
            </label>
            {/* <div className="menu_main">
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
            </label> */}
            {/* <div className="menu_item hover1">
                <div className="small_circle">
                    <i className="keyboard_icon"></i>
                </div>
                <div className="menu_span3">Keyboard</div>
                <div className="rArrow">
                    <i className="right_icon"></i>
                </div>
            </div> */}
        </div>
    )
}
