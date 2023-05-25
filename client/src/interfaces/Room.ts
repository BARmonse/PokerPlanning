import { Player } from './Player';
import { Task } from './Task';

export interface Room {
  identifier: string;
  code: string;
  players: Player[];
  tasks: Task[];
}
