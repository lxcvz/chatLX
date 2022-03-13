import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { activeUser } from '../redux/slice/authSlice';
import { auth } from '../services/firebase';
import { ChatRoom } from './ChatRoom';

type RoomParams = {
    chatId: string
}

export function Channels() {
    const dispatch = useDispatch();
    const { chatId } = useParams<RoomParams>()

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
                        <ChatRoom />
                    </Flex>
                ) : (
                    <Flex w="100%" h="100%" direction="column" align="center" justify="center">
                        <Text color="gray.300">
                            ..Ops parece que você não iniciou nenhum chat ainda!
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
