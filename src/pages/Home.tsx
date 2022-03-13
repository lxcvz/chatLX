import { Flex, Button, Stack, Image, HStack, Text, Link } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import loginImage from '../assets/images/image-login.png'
import { Logo } from '../components/Header/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { auth } from '../services/firebase'
import { activeUser } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

type signInFormData = {
    email: string;
    password: string;
}

const signFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
})

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signFormSchema)
    });

    const { errors, isSubmitting } = formState;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid } = user

                dispatch(activeUser({
                    userName: displayName,
                    userEmail: email,
                    userUid: uid
                }))

                // navigate("/channels")
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleSignIn = async ({ email, password }: any) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { user } = result;

                dispatch(activeUser({
                    userName: user.displayName,
                    userEmail: user.email,
                    userUid: user.uid
                }))

                navigate("/channels")
                console.log("Singed in user: ", user);
            })
            .catch((error) => {
                const { code, message } = error;
                toast.error('Usuário ou senha incorretos')
                console.log("Error ocured: ", code, message);
            });
    }

    return (
        <>
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
                            onSubmit={handleSubmit(handleSignIn)}
                        >
                            <Stack spacing="4">
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
                                <Text align="center">
                                    Não tem uma conta?
                                    <Link
                                        color="teal.300"
                                        fontWeight="bold"
                                        _hover={{
                                            color: 'teal.500'
                                        }}
                                        href="/register"
                                    > Registre-se!
                                    </Link>
                                </Text>
                            </Stack>

                            <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>Entrar</Button>
                        </Flex>
                        <Flex
                            w="100%"
                            maxWidth={560}
                        >
                            <Image src={loginImage} alt='People chatting' />
                        </Flex>
                    </Flex>
                </Stack>
            </Flex>
        </>
    )
}
