import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import toast from "react-hot-toast";
import { CODE_ERRORS } from "../../utils/constants";

const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
    passwordConfirmation: yup.string().required('Confirmação de senha obrigatória').oneOf([
        null,
        yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

export function SignUpForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    });

    const { errors, isSubmitting } = formState;

    const handleSignUp: SubmitHandler<any> = async ({ name, email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { user } = result;
                updateProfile(user, { displayName: name })
                console.log("Registered user: ", user);

                toast.success('Usuário criado com sucesso')

                navigate("/")
            })
            .catch((error) => {
                const { code, message } = error;
                code === CODE_ERRORS.EMAIL_ALREADY_IN_USE
                    ? toast.error('E-mail já cadastrado')
                    : toast.error('A senha precisa ter no mínimo 06 caracteres')

                console.log("Error ocured: ", code, message);
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
                isLoading={isSubmitting}
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
    )
}