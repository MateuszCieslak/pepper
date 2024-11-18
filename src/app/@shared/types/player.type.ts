import { Person } from "./person.type";
import { Starship } from "./starship.type";

export interface Player {
    name: string;
    score: number;
    data?: Person | Starship;
    roundWinner: boolean;
}