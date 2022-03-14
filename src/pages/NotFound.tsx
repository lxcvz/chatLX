import { Flex, Stack, Image, useBreakpointValue, Text } from '@chakra-ui/react'

import loginImage from '../assets/images/image-login.png'
import { Logo } from '../components/Header/Logo';

export function NotFound() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <>
            <Flex
                w="100vw"
                h="100vh"
                align="center"
                justify="center"
            >
                <Stack w="80%" spacing="2">
                    <Logo />
                    <Flex
                        m="auto"
                        align="center"
                        justify="space-between"
                        direction="row"
                    >
                        <Flex direction="column">
                            <Text fontWeight="bold" fontSize="24" color="gray.100">Error 404</Text>
                            <Text color="gray.300">Página não encontrada! verifique o caminho informado e tente novamente.</Text>
                        </Flex>

                        {isWideVersion && (
                            <Flex
                                w="100%"
                                maxWidth={560}
                            >
                                <Image src={loginImage} alt='People chatting' />
                            </Flex>
                        )}
                    </Flex>
                </Stack>
            </Flex>
        </>
    )
}