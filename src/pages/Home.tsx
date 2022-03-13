import { Flex, Stack, Image, useBreakpointValue } from '@chakra-ui/react'

import loginImage from '../assets/images/image-login.png'
import { Logo } from '../components/Header/Logo';
import { useLocation } from 'react-router-dom'
import { SignInForm } from '../components/Form/SignInForm'
import { SignUpForm } from '../components/Form/SignUpForm'

export function Home() {
    const { pathname } = useLocation()

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
                <Stack w="70%" spacing="2">
                    <Logo />
                    <Flex
                        m="auto"
                        align="center"
                        justify="space-between"
                    >
                        {pathname === "/" ? (
                            <SignInForm />
                        ) : (
                            <SignUpForm />
                        )}

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
