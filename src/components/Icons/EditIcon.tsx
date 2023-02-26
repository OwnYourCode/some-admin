import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';

export const EditIcon: FC<IconProps> = memo((props) => <Icon cursor="pointer" as={BiEditAlt} {...props} />);
