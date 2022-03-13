// import Link, { LinkProps } from "next/link";
// import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface ActiveLinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
    href: string;
}

export function ActiveLink({
    children,
    shouldMatchExactHref = false,
    ...rest
}: ActiveLinkProps) {
    const location = useLocation()

    let isActive = false;

    if (shouldMatchExactHref && (location.pathname === rest.href)) {
        isActive = true;
    }

    if (!shouldMatchExactHref && (location.pathname.startsWith(String(rest.href)))) {
        isActive = true;
    }

    return (
        <Link to={rest.href} {...rest}>
            {cloneElement(children, {
                color: isActive ? "pink.400" : "gray.400"
            })}
        </Link>
    );
}