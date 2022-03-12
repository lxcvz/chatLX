import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    const { userName, userEmail } = useSelector((state: RootState) => state.userAuth)

    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>{userName}</Text>
                    <Text color="gray.300" fontSize="small">{userEmail}</Text>
                </Box>
            )}

            <Avatar size="md" name="Lucas Mateus" src="https://github.com/lxcvz.png" />
        </Flex>
    );
}
