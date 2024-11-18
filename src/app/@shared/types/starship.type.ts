export interface Starship {
    crew: number | "unknown";
    passengers: number | "unknown";
    cargo_capacity: number | "unknown";
    starship_class: string;
    description: string;
    model: string;
    name: string;
    uid: number;
}