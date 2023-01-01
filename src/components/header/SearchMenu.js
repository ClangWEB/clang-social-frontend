import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
import { addToSearchHistory, getSearchHistory, removeFromSearch, search } from "../../functions/user";
import { Link } from "react-router-dom";

export default function SearchMenu({ token, color, setShowSearchMenu }) {

    const [iconVisible, setIconVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const input = useRef(null);
    const menu = useRef(null);
    useEffect(() => {
        getHistory();     // eslint-disable-next-line
    }, []);
    const getHistory = async () => {
        const res = await getSearchHistory(token);
        setSearchHistory(res);
    };
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
        await addToSearchHistory(searchUser, token);
        getHistory();
    };

    const handleRemove = async (searchUser) => {
        await removeFromSearch(searchUser, token);
        getHistory();
    }

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
                        onFocus={() => { setIconVisible(false) }}
                        onBlur={() => { setIconVisible(true) }}
                    />
                </div>
            </div>               {/* eslint-disable-next-line */}
            {results == "" && (
                <div className="search_history_header">
                    <span>Recent searches</span>
                </div>
            )}
            <div className="search_history scrollbar">      {/* eslint-disable-next-line */}
                {searchHistory && results == "" &&
                    searchHistory
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .map((user, i) => (
                            <div className="search_user_item hover1" key={i}>
                                <Link
                                    className="flex"
                                    to={`/profile/${user.user.username}`}
                                    onClick={() => addToSearchHistoryHandler(user.user._id)}
                                >
                                    <img src={user.user.picture} alt="" />
                                    <span>{user.user.first_name} {user.user.last_name}</span>
                                </Link>
                                <i className="exit_icon" onClick={() => handleRemove(user.user._id)}></i>
                            </div>
                        ))
                }
            </div>
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
