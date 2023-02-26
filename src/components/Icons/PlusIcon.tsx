import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

export const PlusIcon: FC<IconProps> = memo((props) => <Icon as={AiOutlinePlus} {...props} />);
