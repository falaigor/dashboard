import {
  Link as ChakraLink,
  Icon,
  Text,
  LinkProps as ChakraLinkPorps,
} from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkPorps {
  icon: ElementType;
  children: string;
  href: string;
  shouldMathExactHref: boolean;
}

export function NavLink({
  icon,
  children,
  href,
  shouldMathExactHref = false,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink href={href} shouldMathExactHref={shouldMathExactHref} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
