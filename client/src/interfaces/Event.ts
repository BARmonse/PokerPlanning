import { EventType } from '../enums/EventType';
import { Room } from './Room';

export interface Event {
  type: EventType;
  payload: Room | any;
}
