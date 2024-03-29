export type UserData = {
    name: string,
    currentRoom: string,
}

export type MessageData = {
    id: number,
    sender: string,
    message: string,
    image: string,
    quote: MessageData | null,
}