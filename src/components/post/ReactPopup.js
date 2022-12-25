export default function ReactPopup({ visible, setVisible }) {
    const reactsArray = [
        {
            name: "Like",
            image: "../../../reacts/like.gif",
        },
        {
            name: "Love",
            image: "../../../reacts/love.gif",
        },
        {
            name: "Haha",
            image: "../../../reacts/haha.gif",
        },
        {
            name: "Wow",
            image: "../../../reacts/wow.gif",
        },
        {
            name: "Sad",
            image: "../../../reacts/sad.gif",
        },
        {
            name: "Angry",
            image: "../../../reacts/angry.gif",
        },
    ];

    return (
        <>
            {visible && (
                <div
                    className="reacts_popup"
                    onMouseOver={() => {
                        setTimeout(() => {
                            setVisible(true)
                        }, 500)
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setVisible(false)
                        }, 500)
                    }}
                >
                    {
                        reactsArray.map((react, i) => (
                            <div className="react" key={i}>
                                <img src={react.image} alt="Reacts" />
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    )
}