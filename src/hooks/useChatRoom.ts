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
        const messageRef = database.ref(`chats/${chatId}`);
        
        messageRef.on('value', message => {
            const databaseMessage = message.val();
            const firebaseMessage: FirebaseMessages = databaseMessage.messages ?? {};

            const parsedMessages = Object.entries(firebaseMessage).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                }
            })

            setMessages(parsedMessages)
        })

        return () => {
            messageRef.off('value');
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