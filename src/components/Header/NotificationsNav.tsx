import { HStack, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";

export function NotificationsNav() {
    const navigate = useNavigate();

    function handleSignOut() {
        return signOut(auth)
            .then(() => {
                navigate("/")
                console.log("user signed out");
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    return (
        <HStack
            spacing={["6", "8"]}
            mx={["6", "8"]}
            pr={["6", "8"]}
            py="1"
            color="gray.300"
            borderRightWidth={1}
            borderColor="gray.700"
        >
            <Menu isLazy>
                <MenuButton> <Icon as={CgProfile} fontSize="25" /></MenuButton>
                <MenuList>
                    <MenuItem color="gray.800" onClick={handleSignOut}>
                        Sair
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack >
    );
}