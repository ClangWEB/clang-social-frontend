import { useEffect } from 'react';
import Header from '../../components/header'

export default function RoomEnter({ setRoomOpen }) {
    useEffect(() => {
        setRoomOpen(true);
    }, [setRoomOpen]);
    return (
        <div>
            <Header />
        </div>
    )
}
