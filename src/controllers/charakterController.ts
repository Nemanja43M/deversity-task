import { Request, Response } from "express";
import { fetchCharacters } from "../services/characterService";

export const searchCharacters = async (req: Request, res: Response) => {
  const { search } = req.query;
  try {
    const characters = await fetchCharacters(search as string);
    characters.sort((a, b) => a.name.localeCompare(b.name));
    res.json(characters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch characters" });
  }
};
