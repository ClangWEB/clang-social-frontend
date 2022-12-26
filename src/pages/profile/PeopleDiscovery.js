import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendsCard from "./AddFriendsCard";

export default function PeopleDiscovery() {
    return (
        <div className="pplumayknow">
            <div className="pplumayknow_header">
                Discover
                <div className="post_header_right ppl_circle hover4"><Dots /></div>
            </div>
            <div className="pplumayknow_list">
                {stories.map((item, i) => (
                    <AddFriendsCard item={item} key={i}/>
                ))

                }
            </div>
        </div>
    )
}
