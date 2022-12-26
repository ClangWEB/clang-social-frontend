import { useEffect, useReducer } from "react";
import { photosReducer } from "../../functions/reducers";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Photos({ username, token }) {
  const navigate = useNavigate();
  const path = `${username}/*`;
  const sort = "asc";
  const max = 30; // eslint-disable-next-line
  const [{ loading, photos, error }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: {},
    error: ""
  });
  useEffect(() => {
    const getPhotos = async () => {
      try {
        dispatch({
          type: "PHOTOS_REQUEST"
        });
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/listImages`, {
          path, sort, max
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        dispatch({
          type: "PHOTOS_SUCCESS",
          payload: data
        });
      }
      catch (error) {
        dispatch({
          type: "PHOTOS_ERROR",
          payload: error.response.data.message
        });
      }
    };
    getPhotos();
  }, [username, token, navigate, path]);

  return (
    <div className="profile_card">
      <div className="profile_card_header">Photos
        {photos.total_count === 0
          ? ""
          : photos.total_count > 9
          && <div className="profile_header_link">See all</div>
        }

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
