import { forwardRef, memo } from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link, LinkProps } from 'react-router-dom';

interface RouteLinkProps extends ChakraLinkProps, Omit<LinkProps, 'color'> {}

type RefType = HTMLAnchorElement | null;

export const RouteLink = memo(
  forwardRef<RefType, RouteLinkProps>(({ to, children, ...restProps }, ref) => {
    return (
      <ChakraLink ref={ref} {...restProps} to={to} as={Link}>
        {children}
      </ChakraLink>
    );
  }),
);
