import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import { addToSearchHistory, search } from "../../functions/user";
import { Link } from "react-router-dom";

export default function SearchMenu({ token, color, setShowSearchMenu }) {

    const [iconVisible, setIconVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const input = useRef(null);
    const menu = useRef(null);
    useClickOutside(menu, () => {
        setShowSearchMenu(false);
    })
    useEffect(() => {
        input.current.focus();
    }, [])

    const searchHandler = async () => {
        if (searchTerm === "") {
            setResults("");
        }
        else {
            const res = await search(searchTerm, token);
            setResults(res);
        }
    };

    const addToSearchHistoryHandler = async (searchUser) => {
        const res = await addToSearchHistory(searchUser, token);
    };

    return (
        <div className="header_left search_area scrollbar" ref={menu}>
            <div className="search_wrap">
                <div className="header_logo">
                    <div className="circle hover1" onClick={() => setShowSearchMenu(false)}>
                        <Return color="#F51997" />
                    </div>
                </div>
                <div className="search" onClick={() => {
                    input.current.focus();
                }}>
                    {
                        iconVisible && <div><Search color={color} /></div>
                    }
                    <div>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search here..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={searchHandler}
                        ref={input} 
                        onFocus={() => {setIconVisible(false)}} 
                        onBlur={() => {setIconVisible(true)}}
                    />
                </div>
            </div>
            <div className="search_history_header">
                <span>Recent searches</span>
                <a href="/">Edit</a>
            </div>
            <div className="search_history"></div>
            <div className="search_results scrollbar">
                {results && results.map((user, i) => (
                    <Link 
                        to={`/profile/${user.username}`}
                        onClick={() => addToSearchHistoryHandler(user._id)}
                        key={i} 
                        className="search_user_item hover1"
                    >
                        <img src={user.picture} alt="" />
                        <span>{user.first_name} {user.last_name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
