import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext";
import { RootState } from "../redux/store";
import { database } from "../services/firebase";

type FirebaseMessages = Record<string, {
    author: {
        name: string;
        authorId: string;
    }
    content: string;
}>
type MessageType = {
    author: {
        name: string;
        authorId: string;
    }
    content: string;
    id: string;
}

export function useChatRoom(chatId: string | undefined) {
    const { userName, userUid } = useSelector((state: RootState) => state.userAuth)
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([])
    const { onClose } = useSidebarDrawer()

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }, [messages]);

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault();

        if (newMessage.trim() === '') return;
        if (!userUid) return;

        const message = {
            content: newMessage,
            author: {
                name: userName,
                authorId: userUid
            }
        }

        await database.ref(`chats/${chatId}/messages`).push(message)
        setNewMessage('')
    }

    useEffect(() => {
        const roomRef = database.ref(`chats/${chatId}`);

        roomRef.on('value', room => {
            const databaseChat = room.val();
            const firebaseChat: FirebaseMessages = databaseChat.messages ?? {};

            const parsedMessages = Object.entries(firebaseChat).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                }
            })

            onClose()

            setMessages(parsedMessages)
        })

        return () => {
            roomRef.off('value');
        }
    }, [chatId]);


    return {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        userName,
        userUid,
        messagesEndRef
    }

}