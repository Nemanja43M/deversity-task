export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
}
export interface CharacterRequest {
  id: string;
  name: string;
  height: string;
  mass: string;
  gender: string;
  starships: string[];
  image: string;
  url: string;
}
export interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  gender: string;
  starships: Starship[];
  image: string;
}
