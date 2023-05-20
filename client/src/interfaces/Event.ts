import { EventType } from '../enums/EventType';

export interface Event {
  type: EventType;
  payload: any;
}
