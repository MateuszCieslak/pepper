export interface StarshipResponse {
    uid: string;
    result: {
        description: string;
        properties: {
            model: string;
            name: string;
            starship_class: string;
            passengers: string;
            cargo_capacity: string;
            manufacturer: string;
            cost_in_credits: string;
            length: string;
            crew: string;
        }
    }
}