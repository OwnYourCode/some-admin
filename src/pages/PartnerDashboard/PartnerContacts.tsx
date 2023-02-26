import { FormCard } from '../../components/Card/FormCard';
import { Box, Flex, Text } from '@chakra-ui/react';
import { createUserName } from '../../helpers/createUserName';
import { EditIcon } from '../../components/Icons/EditIcon';
import { Contact, CONTACT_MAPPER } from '../../shared/models/contact';
import { FC } from 'react';

interface PartnerContactsProps {
  headerMessage: string;
  goToContactsTab: () => void;
  contacts: Contact[];
}

export const PartnerContacts: FC<PartnerContactsProps> = ({ headerMessage, goToContactsTab, contacts }) => {
  return (
    <FormCard headerMessage={headerMessage}>
      {contacts.map(({ firstName, lastName, email, type }, index) => {
        return (
          <Flex key={index + email} direction="column">
            <Flex justifyContent="space-between">
              <Text color="gray.500" fontSize="sm" fontWeight="500">
                {CONTACT_MAPPER[type!]}
              </Text>
              <EditIcon boxSize="1.5em" color="green" onClick={goToContactsTab} />
            </Flex>
            <Box>
              <Text fontWeight="500" as="span" mr="1.5em">
                {createUserName(firstName, lastName)}
              </Text>
              <Text fontWeight="500" as="span">
                {email}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </FormCard>
  );
};
