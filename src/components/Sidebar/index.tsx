import { Box, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SidebarNav } from "./SidebarNav";
import { RootState } from '../../redux/store';
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { useParams } from "react-router-dom";

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer()
    const { chatId } = useParams<string>()

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false
    })

    if (isDrawerSidebar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerBody>
                            <SidebarNav chatId={chatId}/>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }

    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav chatId={chatId}/>
        </Box >
    )
}