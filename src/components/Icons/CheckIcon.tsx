import { Icon, IconProps } from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';
import { FC, memo } from 'react';

export const CheckIcon: FC<IconProps> = memo((props) => (
  <Icon as={MdCheck} color="green.600" role="presentation" {...props} />
));
