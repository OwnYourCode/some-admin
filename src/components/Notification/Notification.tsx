import { createStandaloneToast, AlertStatus } from '@chakra-ui/react';
import { ReactNode } from 'react';

const toast = createStandaloneToast();

interface NotifyOptions {
  message: string;
  description?: ReactNode;
  status?: AlertStatus;
  duration?: number | null;

  [k: string]: any;
}

type Notify = (notifyOptions: NotifyOptions) => string | number | undefined;

export const notify: Notify = ({ message, description, status = 'error', duration = 6000, ...restProps }) =>
  toast({
    title: message,
    description,
    status,
    duration,
    position: 'bottom-right',
    variant: 'top-accent',
    ...restProps,
  });
