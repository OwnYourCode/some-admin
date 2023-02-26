import { FC, useEffect } from 'react';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ControlInputProps } from '../../shared/models/controlInputProps';
import { FieldError, useController } from 'react-hook-form';

type Option = { id: number; name: string };

interface SelectProps extends ChakraSelectProps, ControlInputProps {
  name: string;
  label?: string;
  fieldError?: FieldError;
  errorText?: string;
  options: Option[];
}

export const Select: FC<SelectProps> = ({
  name,
  label,
  register,
  isRequired,
  isDisabled,
  isInvalid,
  options,
  control,
  defaultValue,
  fieldError,
  errorText,
  ...restProps
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({ name, control, rules: { required: errorText || isRequired }, defaultValue });

  useEffect(() => {
    if (!inputProps.value && options?.[0]) {
      const value = options[0].id;
      inputProps.onChange(value);
    }
  }, [inputProps, options]);

  return (
    <FormControl>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <ChakraSelect defaultValue={defaultValue} {...inputProps} ref={ref} {...restProps}>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </ChakraSelect>
      {fieldError?.message ? <FormErrorMessage>{fieldError?.message}</FormErrorMessage> : null}
    </FormControl>
  );
};
