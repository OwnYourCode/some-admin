import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchIcon: FC<IconProps> = memo((props) => <Icon as={AiOutlineSearch} {...props} />);
