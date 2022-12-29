// import { ArrowRight, Plus } from "../../../svg";
// import { stories } from "../../../data/home";
// import "./style.css";
// import Story from "./Story";
// import { useMediaQuery } from "react-responsive";


// export default function Stories() {

//     const query1175px = useMediaQuery({
//         query: "(max-width: 1175px)"
//     });
//     const query1030px = useMediaQuery({
//         query: "(max-width: 1030px)"
//     });
//     const query960px = useMediaQuery({
//         query: "(max-width: 960px)"
//     });
//     const query885px = useMediaQuery({
//         query: "(max-width: 885px)"
//     });
//     const query550px = useMediaQuery({
//         query: "(max-width: 550px)"
//     });
//     const query390px = useMediaQuery({
//         query: "(max-width: 390px)"
//     });
//     const max = query390px ? 5: query550px ? 4 : query885px ? 5 : query960px ? 4 : query1030px ? 5 : query1175px ? 4 : stories.length;

//     return (
//         <div className="stories">
//             <div className="create_story_card">
//                 <img className="create_story_image" src="../../../images/default_pic.png" alt="" />
//                 <div className="plus_story">
//                     <Plus color="#fff" />
//                 </div>
//                 <div className="story_create_text">Post Story</div>
//             </div>
//             {
//                 stories.slice(0, max).map((story, i) => (
//                     <Story story={story} key={i} />
//                 ))
//             }
//             <div className="white_circle">
//                 <ArrowRight color="65676b" />
//             </div>
//         </div>
//     )
// }


import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import "./style.css";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";


export default function Stories() {
    const query1175px = useMediaQuery({
        query: "(max-width: 1175px)"
    });
    const query1030px = useMediaQuery({
        query: "(max-width: 1030px)"
    });
    const query960px = useMediaQuery({
        query: "(max-width: 960px)"
    });
    const query885px = useMediaQuery({
        query: "(max-width: 885px)"
    });
    const query550px = useMediaQuery({
        query: "(max-width: 550px)"
    });
    const query400px = useMediaQuery({
        query: "(max-width: 400px)"
    });
    const max = query400px ? 4: query550px ? 5 : query885px ? 5 : query960px ? 4 : query1030px ? 5 : query1175px ? 4 : stories.length;

    return (
        <div className="stories">
            <div className="create_story_card">
                <img className="create_story_image" src="../../../images/default_pic.png" alt="" />
                <div className="plus_story">
                    <Plus color="#fff" />
                </div>
                <div className="story_create_text">Post Story</div>
            </div>
            {
                stories.slice(0, max).map((story, i) => (
                    <Story story={story} key={i} />
                ))
            }
            <div className="white_circle">
                <ArrowRight color="65676b" />
            </div>
        </div>
    )
}

