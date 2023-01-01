export default function AddFriendsCard({ item }) {
  return (
    <div className="addfriendCard">
        <div className="addfriend_imgsmall">
            <img src={item.profile_picture} alt="People" />
            <div className="addfriend_infos">
                <div className="addfriend_name">{item.profile_name?.length > 17 ? `${item.profile_name.substring(0,15)}...` : item.profile_name}</div>
                <div className="light_pink_btn_second">
                    <img src="../../../icons/addFriend.png" className="filter_pink" alt="Add" />Be Friends
                </div>
            </div>
        </div>
    </div>
  )
}
