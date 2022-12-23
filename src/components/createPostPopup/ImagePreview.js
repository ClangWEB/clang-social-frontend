import EmojiPickerBg from "./EmojiPickerBg";

export default function ImagePreview({ user, text, setText }) {
    return (
        <div className="overflow_a">
            <EmojiPickerBg
                user={user}
                text={text}
                setText={setText}
                type2
            />
        </div>
    )
}
