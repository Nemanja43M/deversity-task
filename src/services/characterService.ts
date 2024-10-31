import axios from "axios";
import { Character, CharacterRequest, Starship } from "../common/interfaces";
import { getCache, setCache } from "./cashService";

const swapiUrl = "https://swapi.dev/api/people";

export async function fetchCharacters(
  searchTerm: string = ""
): Promise<Character[]> {
  const characters: CharacterRequest[] = [];
  let nextPage = `${swapiUrl}?search=${searchTerm}`;

  while (nextPage) {
    const response = await fetchWithCache(nextPage);
    const data = response?.data;
    characters.push(...data.results);
    nextPage = data.next;
  }

  return Promise.all(
    characters.map(async (char) => {
      const starships = await fetchStarships(char.starships);
      const image = await fetchImage(char.url);
      return {
        id: char.url.split("/").slice(-2)[0],
        name: char.name,
        height: char.height,
        mass: char.mass,
        gender: char.gender,
        starships,
        image,
      };
    })
  );
}

async function fetchWithCache(url: string, options?: any) {
  const cached = getCache(url);
  if (cached) return cached;

  const response = await axios.get(url, options);
  setCache(url, response);
  return response;
}

async function fetchStarships(starshipUrls: string[]): Promise<Starship[]> {
  return Promise.all(
    starshipUrls.map(async (url) => {
      const response = await fetchWithCache(url);
      const { name, model, manufacturer, starship_class } = response?.data;
      return { name, model, manufacturer, starship_class };
    })
  );
}

async function fetchImage(characterUrl: string): Promise<string> {
  const id = characterUrl.split("/").slice(-2)[0];
  const imageUrl = `https://robohash.org/${id}`;
  const response = await fetchWithCache(imageUrl, {
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary").toString("base64");
}
