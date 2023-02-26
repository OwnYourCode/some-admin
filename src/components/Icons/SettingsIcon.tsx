import { FC, memo } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';
import { AiTwotoneSetting } from 'react-icons/ai';

export const SettingsIcon: FC<IconProps> = memo((props) => <Icon as={AiTwotoneSetting} {...props} />);
