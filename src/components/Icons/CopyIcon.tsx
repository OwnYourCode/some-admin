import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';

export const CopyIcon: FC<IconProps> = memo((props) => <Icon cursor="pointer" as={MdContentCopy} {...props} />);
