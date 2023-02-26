import { SerializedError } from '@reduxjs/toolkit';
import { Status } from '../enums/status';

export interface DefaultState {
  status: Status;
  error?: Error | SerializedError | null;
}
