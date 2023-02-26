import { FC } from 'react';
import { Stack } from '@chakra-ui/react';
import { Input } from '../../components/Input/Input';
import { ControlInputProps } from '../../shared/models/controlInputProps';
import { useTranslation } from 'react-i18next';
import { Company } from '../../shared/models/company';
import { Category } from '../../shared/models/category';
import { Select } from '../../components/Select/Select';

interface GeneralInfoCardProps extends ControlInputProps {
  companies: Company[];
  categories: Category[];
}

export const GeneralInfoCard: FC<GeneralInfoCardProps> = ({ control, errors, categories, companies }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <Input
        label={t('page.add.partner.general.partner.label')}
        control={control}
        name="partnerName"
        fieldError={errors?.partnerName}
        isInvalid={errors?.partnerName}
        isRequired
      />

      <Input
        type="url"
        label={t('page.add.partner.general.website.label')}
        control={control}
        name="website"
        fieldError={errors?.website}
        isInvalid={errors?.website}
      />

      {!!categories.length && (
        <>
          <Select
            label={t('page.add.partner.general.category.label')}
            control={control}
            name="category"
            fieldError={errors?.category}
            isInvalid={errors?.category}
            options={categories}
          />
        </>
      )}

      {!!companies?.length && (
        <>
          <Select
            label={t('page.add.partner.general.company.label')}
            control={control}
            name="company"
            fieldError={errors?.company}
            isInvalid={errors?.company}
            options={companies}
          />
        </>
      )}

      {/* TODO: don't need in this phase */}
      {/*<Input type="url" label="Logo" control={control} name="logo" fieldError={errors?.logo} isInvalid={errors?.logo} />*/}
    </Stack>
  );
};
