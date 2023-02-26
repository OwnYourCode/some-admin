import { Checkbox, Stack } from '@chakra-ui/react';
import { PhaseCard } from '../../../components/Card/PhaseCard';

export const CurrentPhasePanel = () => {
  return (
    <>
      <PhaseCard header="Engagement" status="ongoing">
        <Stack direction="column">
          <Checkbox>Signed NDA received</Checkbox>
          <Checkbox>Technical Questionnaire</Checkbox>
          <Checkbox>Commercial Questionnaire</Checkbox>
          <Checkbox>Partner Confirmed API Specs</Checkbox>
        </Stack>
      </PhaseCard>
      <PhaseCard header="Kick-off call" status="not-started" />
      <PhaseCard header="Development" status="not-started" />
      <PhaseCard header="Certification" status="not-started" />
      <PhaseCard header="Go Live" status="not-started" />
    </>
  );
};
