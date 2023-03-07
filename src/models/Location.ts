import { Character } from './Character';

export interface Location {
  id?: number;
  name?: string;
  type?: string;
  dimension?: string;
  residents?: Array<Character>;
  created?: string;
}
