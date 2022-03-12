import { Box, Button, Flex, FormControl, FormLabel, HStack, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { BsPlusLg } from 'react-icons/bs'
import { BsChatSquareText } from "react-icons/bs"
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { FormEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Input } from "../Form/Input";
import { database } from "../../services/firebase";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { activeChat } from "../../redux/slice/chatSlice";

const signFormSchema = yup.object().shape({
    chatName: yup.string().required('Nome do chat obrigatório'),
})


type FirebaseQuestions = Record<string, {
    authorId: string;
    title: string;
}>

type QuestionType = {
    authorId: string;
    chatName: string;
    chatId: string;
}

export function SidebarNav() {
    const userAuth = useSelector((state: RootState) => state.userAuth)
    const chatSelector = useSelector((state: RootState) => state.chats)
    const [chats, setChats] = useState<QuestionType[]>([]);

    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signFormSchema)
    });

    const { errors } = formState;

    const handleCreateChat: SubmitHandler<any> = async ({ chatName }) => {
        const chatRef = database.ref("chats")

        const firebaseChat = await chatRef.push({
            title: chatName,
            authorId: userAuth?.userUid,
        })

        dispatch(activeChat({
            chatName: chatName,
            chatId: firebaseChat.key,
            authorId: userAuth?.userUid
        }))
        onClose()
    }

    useEffect(() => {
        const chatRef = database.ref("chats");

        chatRef.once("value", chat => {
            const databaseChat: FirebaseQuestions = chat.val()

            const parsedChat: any = Object.entries(databaseChat).map(([key, value]) => {
                return {
                    chatId: key,
                    chatName: value.title,
                    authorId: value.authorId,
                }
            })
            console.log(parsedChat)
            setChats(parsedChat)
        })


    }, [chatSelector])

    return (
        <Stack
            spacing="12"
            align="flex-start"
            borderRightWidth={1}
            borderColor="gray.700"
            h="100%"
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
                        <NavLink key={chat.chatId} icon={BsChatSquareText} href={`/chat/${chat.chatId}`}>{chat.chatName}</NavLink>
                    ))}
                </Stack>
            </Box>


            {/* modal */}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg="gray.700">
                    <Flex
                        as="form"
                        onSubmit={handleSubmit(handleCreateChat)}
                        direction="column"
                    >
                        <ModalHeader>Criar um novo chat</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <Input
                                    type="text"
                                    label="Nome do chat"
                                    {...register("chatName")}
                                    error={errors.chatName}
                                />

                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bg="teal.500"
                                mr={3}
                                _hover={{
                                    background: "teal.400"
                                }}
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Save
                            </Button>
                            <Button
                                color="white"
                                bg="red.500"
                                onClick={onClose}
                                _hover={{
                                    background: "red.400"
                                }}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>

        </Stack>
    )
}