import { Avatar, Box, Flex, Input, Stack, Text, theme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { activeUser } from '../redux/slice/authSlice';
import { RootState } from '../redux/store';
import { auth, database } from '../services/firebase';
import { Chat } from './Chat';

type FirebaseChat = Record<string, {
    authorId: string;
    title: string;
}>

type QuestionType = {
    authorId: string;
    chatName: string;
    chatId: string;
}

type RoomParams = {
    chatId: string
}

export function Channels() {
    const dispatch = useDispatch();
    const { chatId } = useParams<RoomParams>()
    const [chats, setChats] = useState<QuestionType[]>([]);
    const { userName, userEmail, userUid } = useSelector((state: RootState) => state.userAuth)

    useEffect(() => {
        if (!chatId) return;
        const chatRef = database.ref(`chats/${chatId}`);

        chatRef.once("value", chat => {
            const databaseChat: FirebaseChat = chat.val()
            if (!databaseChat) return;

            const parsedChat: any = Object.entries(databaseChat).map(([key, value]) => {
                return {
                    chatId: key,
                    chatName: value.title,
                    authorId: value.authorId,
                }
            })

            setChats(parsedChat)
        })
    }, [chatId])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid } = user

                dispatch(activeUser({
                    userName: displayName,
                    userEmail: email,
                    userUid: uid
                }))
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex
                w="100%"
                h="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >
                <Sidebar />
                {chatId ? (
                    <Flex w="100%" h="100%" direction="column">
                        <Chat chatId={chatId}/>
                    </Flex>
                ) : (
                    <Flex w="100%" h="100%" direction="column" align="center" justify="center">
                        <Text color="gray.300">..Ops parece que você não iniciou nenhum chat ainda!</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
