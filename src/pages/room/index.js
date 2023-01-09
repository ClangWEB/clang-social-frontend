import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from 'react-redux';
import Header from '../../components/header';
import "./style.css";


export default function Room() {

    const { user } = useSelector((state) => ({ ...state }));
    const { roomID } = useParams();
    const meeting = async (element) => {
        const appID = 265314664;
        // const appID = 946219318;
        const serverSecret = "dbd9701a0eacfd44b992d65b1c03fa32";
        // const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
        const kitToken = ZegoUIKitPrebuilt?.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            `${user?.first_name}`
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp?.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });
    };
    return (
        <>
            <Header />
            <div className="room_wrap">
                <div ref={meeting}></div>
            </div>
        </>
    )
}