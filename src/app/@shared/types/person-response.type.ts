export interface PersonResponse {
    uid: string;
    result: {
        description: string;
        properties: {
            height: string;
            mass: string;
            hair_color: string;
            skin_color: string;
            eye_color: string;
            birth_year: string;
            gender: string;
            created: string;
            edited: string;
            name: string;
            homeworld: string;
            url: string;
        }
    }
}