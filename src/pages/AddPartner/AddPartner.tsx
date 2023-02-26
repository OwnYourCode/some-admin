import { FC, MouseEvent, useEffect } from 'react';
import { Heading, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormCard } from '../../components/Card/FormCard';
import { GeneralInfoCard } from './GeneralInfoCard';
import { RouteLink } from '../../components/RouteLink/RouteLink';
import { ROUTE } from '../../shared/route';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { AddPartnerState, defaultValues } from './defaultValues';
import { useAppDispatch } from '../../app/store';
import { getCompanies, submitPartner } from './partnerSlice';
import { AddPartner as AddPartnerModel } from '../../shared/models/addPartner';
import { useTranslation } from 'react-i18next';
import { getCategories } from './categoriesSlice';
import { useCategories } from '../../hooks/useCategories';
import { useCompanies } from '../../hooks/useCompanies';
import { useHistory } from 'react-router-dom';

// TODO: looks like all folder addPartner is not necessary any more,
//  will leave it, but please, delete it later

export const AddPartner: FC = () => {
  const { control, trigger, errors, formState, getValues } = useForm<AddPartnerState>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();
  const categories = useCategories();
  const companies = useCompanies();
  const { push } = useHistory();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCompanies());
  }, [dispatch]);

  const onClick = (e: MouseEvent) => {
    const values = getValues();

    console.log(values);
    if (!values.partnerName) {
      trigger('partnerName');

      return;
    }

    const partner: AddPartnerModel = {
      name: values.partnerName,
      website: values.website || null,
      categoriesIds: Array.isArray(values.category) ? values.categories?.map(({ id }) => id) : [values.category!],
      companyId: values.company,
    };

    dispatch(submitPartner({ partner, push }));
  };

  return (
    <Flex justify="center" align="center" direction="column">
      <Heading my="3" as="h3">
        {t('page.add.partner.header')}
      </Heading>
      {!!categories.length && !!companies?.length && (
        <Flex as="form" my={4} direction="column" w="100%" maxW="xl">
          <FormCard headerMessage={t('page.add.partner.general.card.header')}>
            <GeneralInfoCard categories={categories} companies={companies} errors={errors} control={control} />
          </FormCard>

          {/* TODO: don't need in this phase */}
          {/*{hasNotAnyEnteredRequiredContactsFields(formState.dirtyFields) && showAlert && (*/}
          {/*  <Alert mt={4} status="error">*/}
          {/*    At least one main contact required*/}
          {/*  </Alert>*/}
          {/*)}*/}

          {/*<FormCard my={4} headerMessage="Main contact">*/}
          {/*  <ContactCard errors={errors} control={control} contactName="main" />*/}
          {/*</FormCard>*/}

          {/*<FormCard my={4} headerMessage="Commercial contact">*/}
          {/*  <ContactCard errors={errors} control={control} contactName="commercial" />*/}
          {/*</FormCard>*/}

          {/*<FormCard mb={4} headerMessage="Technical contact">*/}
          {/*  <ContactCard errors={errors} control={control} contactName="technical" />*/}
          {/*</FormCard>*/}
          <ButtonGroup
            m={0}
            p="1rem"
            alignSelf="start"
            boxShadow="sm"
            colorScheme="blue"
            w="100%"
            bg="blackAlpha.50"
            borderTop="2px solid"
            borderTopColor="gray.300"
          >
            <Button variant="solid" onClick={onClick} isLoading={formState.isSubmitting}>
              {t('button.submit')}
            </Button>
            <RouteLink to={ROUTE.OVERVIEW}>
              <Button variant="ghost">{t('button.cancel')}</Button>
            </RouteLink>
          </ButtonGroup>
        </Flex>
      )}
    </Flex>
  );
};
