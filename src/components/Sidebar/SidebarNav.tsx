import { Box, Flex, HStack, Icon, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BsPlusLg } from 'react-icons/bs'
import { BsChatSquareText } from "react-icons/bs"
import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import { database } from "../../services/firebase";
import { RootState } from "../../redux/store";
import { CreateChatModal } from "../Modals/CreateChatModal";
import { useSelector } from "react-redux";

type FirebaseChat = Record<string, {
    authorId: string;
    title: string;
}>

type ChatType = {
    authorId: string;
    chatName: string;
    chatId: string;
}

export function SidebarNav() {
    const chatSelector = useSelector((state: RootState) => state.chats)
    const [chats, setChats] = useState<ChatType[]>([]);

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const chatRef = database.ref("chats");

        chatRef.once("value", chat => {
            const databaseChat: FirebaseChat = chat.val()

            const parsedChat: any = Object.entries(databaseChat).map(([key, value]) => {
                return {
                    chatId: key,
                    chatName: value.title,
                    authorId: value.authorId,
                }
            })

            setChats(parsedChat)
        })


    }, [chatSelector])

    return (
        <Stack
            spacing="12"
            align="flex-start"
            borderRightWidth={{ sm: 0, md: 1 }}
            borderColor="gray.700"
            maxH={{ sm: "90vh", md: "75vh" }}
            overflowY="auto"
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
            <Box w="100%">
                <HStack justify="space-between" pr="4">
                    <Text>Canais</Text>
                    <Icon
                        as={BsPlusLg}
                        color="gray.400"
                        cursor="pointer"
                        _hover={{
                            color: 'gray.300',
                            transition: '0.2s'
                        }}
                        onClick={onOpen}
                    >
                    </Icon>
                </HStack>
                <Stack spacing="4" mt="8" align="stretch">
                    {chats.map(chat => (
                        <Flex key={chat.chatId} pr="6" direction="row">
                            <Tooltip label={chat.chatName} isDisabled={chat.chatName.length <= 30 ? true : false}>
                                <Text as="span" isTruncated>
                                    <NavLink icon={BsChatSquareText} href={`/chat/${chat.chatId}`}>{chat.chatName}</NavLink>
                                </Text>
                            </Tooltip>
                        </Flex>
                    ))}
                </Stack>
            </Box>

            <CreateChatModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}