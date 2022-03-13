import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { database } from "../services/firebase";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";

type ChatId = {
    chatId: string
}

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

export function Chat({ chatId }: ChatId) {
    const { userName, userEmail, userUid } = useSelector((state: RootState) => state.userAuth)
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([])
    const id = useParams()

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
        const roomRef = database.ref(`chats/${id.chatId}`);

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

            console.log(parsedMessages)

            setMessages(parsedMessages)
        })

        return () => {
            roomRef.off('value');
        }
    }, [id.chatId]);

    return (
        <Flex
            as="form"
            direction="column"
            justify="space-between"
            h="100%"
            onSubmit={handleSendMessage}
        >
            <Stack spacing="6" overflowY="auto" maxH={{ sm: "70vh", md: "80vh" }} css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: "white",
                    borderRadius: '24px',
                },
            }}>
                {/* <Text fontWeight="bold" color="gray.400" fontSize="small">Chat 1</Text> */}
                {messages && messages.map(message => (
                    <Flex key={message.id}>
                        <Avatar size="md" name={message.author.name} />
                        <Box ml="4" textAlign="left">
                            <Text>{message.author.name}</Text>
                            <Text color="gray.200" fontSize="medium">{message.content}</Text>
                        </Box>
                    </Flex>
                ))}
            </Stack>
            <InputGroup>
                <Input
                    borderColor="pink.500"
                    placeholder="Enviar uma mensagem..."
                    focusBorderColor="pink.700"
                    onChange={event => setNewMessage(event.target.value)}
                    value={newMessage}
                    disabled={!userUid}
                    _hover={{
                        bgColor: 'gray.900'
                    }}
                />
                <InputRightElement children={
                    <Button type="submit" bg="transparent" _hover={{ bg: "transparent" }} leftIcon={<BiSend color='teal.300' />} />
                } />
            </InputGroup>

        </Flex >
    )
}