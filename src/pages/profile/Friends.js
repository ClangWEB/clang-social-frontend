

export default function Friends({ friends }) {

  return (
    <div className="profile_card">
      <div className="profile_card_header">Friends
        {friends && friends.length > 0 && <div className="profile_header_link">See all</div>}
      </div>
      {friends && (
        <div className="profile_card_count">
          {friends.length === 0
            ? "No Friends yet"
            : friends.length === 1
              ? "1 Friend"
              : `${friends.length} Friends`
          }
        </div>
      )}
      <div className="profile_card_grid">
        {friends && friends.slice(0, 9).map((friend, i) => (
          <div className="profile_photo_card" key={i}>

          </div>
        ))}
      </div>
    </div>
  )
}
