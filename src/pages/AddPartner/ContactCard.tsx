import { FC } from 'react';
import { HStack, Stack } from '@chakra-ui/react';
import { Input } from '../../components/Input/Input';
import { ControlInputProps } from '../../shared/models/controlInputProps';

interface ContactCardProps extends ControlInputProps {
  contactName: string;
}

export const ContactCard: FC<ContactCardProps> = ({ control, errors, contactName }) => {
  return (
    <Stack my={4} spacing={4}>
      <HStack spacing={4}>
        <Input
          label="Salutation"
          control={control}
          name={`${contactName}Salutation`}
          fieldError={errors?.[`${contactName}Salutation`]}
          isInvalid={errors?.[`${contactName}Salutation`]}
          errorText="Salutation is required"
          isRequired
        />
        <Input
          label="First name"
          control={control}
          name={`${contactName}FirstName`}
          fieldError={errors?.[`${contactName}FirstName`]}
          isInvalid={errors?.[`${contactName}FirstName`]}
          errorText="First name is required"
          isRequired
        />
        <Input
          label="Last name"
          control={control}
          name={`${contactName}LastName`}
          fieldError={errors?.[`${contactName}LastName`]}
          isInvalid={errors?.[`${contactName}LastName`]}
          errorText="Last name is required"
          isRequired
        />
      </HStack>

      <Input
        label="Job Title"
        control={control}
        name={`${contactName}JobTitle`}
        fieldError={errors?.[`${contactName}JobTitle`]}
        isInvalid={errors?.[`${contactName}JobTitle`]}
        errorText="Job Title is required"
        isRequired
      />

      <HStack spacing={6}>
        <Input
          label="Email"
          type="emil"
          control={control}
          name={`${contactName}Email`}
          fieldError={errors?.[`${contactName}Email`]}
          isInvalid={errors?.[`${contactName}Email`]}
          errorText="Email is required"
          isRequired
        />
        <Input type="tel" label="Telephone" control={control} name={`${contactName}Telephone`} />
      </HStack>
    </Stack>
  );
};
