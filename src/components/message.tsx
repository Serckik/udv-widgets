import { MessageData } from "../types"

type MessageProps = {
    messageData: MessageData;
    userName: string;
    onClick?: (clickedMessageData: MessageData) => void;
}

function Message({ messageData, userName, onClick }: MessageProps) {
    let isSender = userName === messageData.sender ? 'self-message' : 'other-message'
    if (userName === 'quoted') { isSender = '' }

    return (
        <>
            <div onClick={() => { onClick && onClick(messageData) }} className={`message ${isSender}`}>
                {messageData.quote && <Message messageData={messageData.quote} userName={'quoted'} />}
                <p className="name">{messageData.sender}</p>
                <p>{messageData.message}</p>
                {messageData.image && <img width={300} height={300} src={messageData.image}></img>}
            </div>
        </>
    )
}

export default Message