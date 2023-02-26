import { Icon, IconProps } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { FC, memo } from 'react';

export const CloseIcon: FC<IconProps> = memo((props) => (
  <Icon as={MdClose} color="red.600" role="presentation" {...props} />
));
