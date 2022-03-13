import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { activeUser } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const signFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
})

export function SignInForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signFormSchema)
    });

    const { errors, isSubmitting } = formState;

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
            })
            .catch((error) => {
                const { code, message } = error;
                toast.error('Usuário ou senha incorretos')
            });
    }

    return (
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

            <Button
                type="submit"
                mt="6"
                colorScheme="pink"
                size="lg"
                isLoading={isSubmitting}
            >
                Entrar
            </Button>
        </Flex>
    )
}