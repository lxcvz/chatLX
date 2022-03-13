import { Flex, Icon, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { ProfileSettings } from "./ProfileSettings"
import { Profile } from './Profile'

export function Header() {
    const { onOpen } = useSidebarDrawer()
    
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            align="center"
            px="6"
        >
            {!isWideVersion && (
                <IconButton
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    aria-label="Open navigation"
                    mr="2"
                />
            )}

            <Logo />

            <Flex align="center" ml="auto">
                <ProfileSettings />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    )
}