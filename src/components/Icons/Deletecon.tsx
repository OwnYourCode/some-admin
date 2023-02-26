import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';

export const DeleteIcon: FC<IconProps> = memo((props) => <Icon cursor="pointer" as={AiOutlineDelete} {...props} />);
