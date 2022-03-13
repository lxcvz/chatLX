import { Button, Flex, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseDisclosureReturn } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Form/Input";
import * as yup from "yup"
import { activeChat } from "../../redux/slice/chatSlice";
import { database } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const signFormSchema = yup.object().shape({
    chatName: yup.string().required('Nome do chat obrigatório'),
})

export function CreateChatModal({ isOpen, onClose }: any) {
    const userAuth = useSelector((state: RootState) => state.userAuth)
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signFormSchema)
    });

    const dispatch = useDispatch();

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

    return (
        <Flex as="form">
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
        </Flex>
    )
}