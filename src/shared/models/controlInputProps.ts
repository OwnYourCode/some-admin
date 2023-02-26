import { Control } from 'react-hook-form/dist/types/form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

export interface ControlInputProps {
  control?: Control;
  register?: any;
  errors?: FieldErrors;
}

export type Dictionary = Record<string, string>;
