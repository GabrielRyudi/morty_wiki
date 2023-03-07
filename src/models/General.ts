import { Character } from './Character';

export interface ResponseCharacter {
  data: DataResponseCharacter;
}

interface DataResponseCharacter {
  data: ResponseResult;
}

export interface ResponseCharacterId {
  data: DataResponseCharacterId;
}

interface DataResponseCharacterId {
  data: ResponseResultId;
}

interface ResponseResultId {
  character: Character;
}

interface ResponseResult {
  characters: Characters;
}

interface Characters {
  info: Info;
  results: Array<Character>;
}

export interface Info {
  pages: number;
  next: number;
  prev: number;
}
