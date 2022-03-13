import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useChatRoom } from "../hooks/useChatRoom";

export function ChatRoom() {
    const { chatId } = useParams<string>()

    const {
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        userUid,
        messagesEndRef
    } = useChatRoom(chatId);

    return (
        <Flex
            as="form"
            direction="column"
            justify="space-between"
            h="100%"
            onSubmit={handleSendMessage}
        >
            <Stack
                spacing="6"
                overflowY="auto"
                pb="10"
                maxH={{ sm: "70vh", md: "75vh" }}
                css={{
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
                }}
            >
                {messages && messages.map(message => (
                    <Flex
                        key={message.id}
                        justify={message.author.authorId === userUid ? `right` : 'left'}
                        pr="10"
                        ref={messagesEndRef}
                    >
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