import { HStack, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeUser } from "../../redux/slice/authSlice";
import { auth } from "../../services/firebase";

export function ProfileSettings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSignOut() {
        return signOut(auth)
            .then(() => {
                dispatch(activeUser({
                    userName: null,
                    userEmail: null,
                    userUid: null
                }))
                navigate("/")
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