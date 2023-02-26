import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError, useController } from 'react-hook-form';
import { ControlInputProps } from '../../shared/models/controlInputProps';

interface InputProps extends ChakraInputProps, ControlInputProps {
  name: string;
  label?: string;
  fieldError?: FieldError;
  errorText?: string;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  register,
  isRequired,
  isDisabled,
  isInvalid,
  control,
  defaultValue,
  fieldError,
  errorText,
  ...restProps
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({ name, control, rules: { required: errorText || isRequired }, defaultValue });

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} isDisabled={isDisabled}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <ChakraInput {...inputProps} ref={ref} {...restProps} />
      {fieldError?.message ? <FormErrorMessage>{fieldError?.message}</FormErrorMessage> : null}
    </FormControl>
  );
};
