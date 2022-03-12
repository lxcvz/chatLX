import { Flex, Button, Stack, Image, HStack, Text, Link } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import loginImage from '../assets/images/image-login.png'
import { Logo } from '../components/Header/Logo';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

type signInFormData = {
    email: string;
    password: string;
}

const signFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
    passwordConfirmation: yup.string().required('Confirmação de senha obrigatória').oneOf([
        null,
        yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signFormSchema)
    });

    const navigate = useNavigate();

    const { errors } = formState;

    const handleSignUp: SubmitHandler<any> = async ({ name, email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { user } = result;
                updateProfile(user, { displayName: name })
                console.log("Registered user: ", user);
                //adicionar toast de sucesso https://react-hot-toast.com/
              
                navigate("/")
            })
            .catch((error) => {
                const { code, message } = error;
                console.log("Error ocured: ", code, message);
            });

    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Stack w="70%" spacing="2">
                <Logo />
                <Flex
                    m="auto"
                    align="center"
                    justify="space-between"
                >
                    <Flex
                        as="form"
                        w="100%"
                        p="8"
                        maxWidth={360}
                        bg="gray.800"
                        borderRadius={8}
                        flexDir="column"
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <Stack spacing="4">
                            <Text fontWeight="bold" color="teal.200" fontSize="24px">Novo usuário</Text>
                            <Input
                                type="text"
                                label="Nome"
                                {...register("name")}
                                error={errors.name}
                            />

                            <Input
                                type="email"
                                label="E-mail"
                                {...register("email")}
                                error={errors.email}
                            />

                            <Input
                                type="password"
                                label="Senha"
                                {...register("password")}
                                error={errors.password}
                            />

                            <Input
                                type="password"
                                label="Confirmação de senha"
                                {...register("passwordConfirmation")}
                                error={errors.passwordConfirmation}
                            />
                        </Stack>

                        <Button
                            type="submit"
                            isLoading={formState.isSubmitting}
                            mt="6"
                            colorScheme="pink"
                            size="lg"
                        >
                            Criar usuário
                        </Button>

                        <Text align="center" mt="6">
                            <Link
                                color="teal.300"
                                fontWeight="bold"
                                _hover={{
                                    color: 'teal.500'
                                }}
                                href="/"
                            >
                                Voltar para o login
                            </Link>
                        </Text>
                    </Flex>
                    <Flex
                        w="100%"
                        maxWidth={560}
                    >
                        <Image src={loginImage} alt='People chatting' />
                    </Flex>
                </Flex>
            </Stack>

            <ToastContainer />
        </Flex>
    )
}