import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to="/channels">
            <Text fontSize={["2xl", "3xl"]} fontWeight="bold" color="teal.300" w="64">
                Chat<Text color="pink.500" as="span" fontStyle="italic">.LX</Text>
            </Text>
        </Link>
    );
}