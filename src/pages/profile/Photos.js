export default function Photos({ photos }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">Photos
        {photos && photos.total_count > 0 && <div className="profile_header_link hover4">See all</div>}
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? "No Photos yet"
          : photos.total_count === 1
            ? "1 Photo"
            : `${photos.total_count} Photos`
        }
      </div>
      <div className="profile_card_grid">
        {photos.resources && (
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="Photos" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
