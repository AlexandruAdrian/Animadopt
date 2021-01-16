import { RESET_REQUEST_STATE } from './constants';

export function resetRequestState() {
  return {
    type: RESET_REQUEST_STATE,
  };
}
