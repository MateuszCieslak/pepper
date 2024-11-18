const express = require('express');
const cors = require('cors');

const app = express();

const createPerson = (mass, name) => {
  return {
    "message": "ok",
    "result": {
      "properties": {
        "height": "172",
        "mass": mass,
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "created": "2024-11-18T12:39:30.034Z",
        "edited": "2024-11-18T12:39:30.034Z",
        "name": name,
        "homeworld": "https://www.swapi.tech/api/planets/1",
        "url": "https://www.swapi.tech/api/people/1"
      },
      "description": "A person within the Star Wars universe",
      "_id": "5f63a36eee9fd7000499be42",
      "uid": "1",
      "__v": 0
    }
  }
}

const createStarship = (crew, model) => {
  return {
    "message": "ok",
    "result": {
      "properties": {
        "model": model,
        "starship_class": "Deep Space Mobile Battlestation",
        "manufacturer": "Imperial Department of Military Research, Sienar Fleet Systems",
        "cost_in_credits": "1000000000000",
        "length": "120000",
        "crew": crew,
        "passengers": "843,342",
        "max_atmosphering_speed": "n/a",
        "hyperdrive_rating": "4.0",
        "MGLT": "10",
        "cargo_capacity": "1000000000000",
        "consumables": "3 years",
        "pilots": [],
        "created": "2020-09-17T17:55:06.604Z",
        "edited": "2020-09-17T17:55:06.604Z",
        "name": "Death Star",
        "url": "https://www.swapi.tech/api/starships/9"
      },
      "description": "A Starship",
      "_id": "5f63a34fee9fd7000499be21",
      "uid": "9",
      "__v": 0
    }
  }
}

let peopleRequestCounter = 0;
let starshipsRequestCounter = 0;

const people = [
  createPerson('100', 'Person 1'),
  createPerson('10', 'Person 2'),
  createPerson('40', 'Person 3'),
  createPerson('10', 'Person 4'),
  createPerson('10', 'Person 5'),
  createPerson('50', 'Person 6'),
  createPerson('10', 'Person 7'),
  createPerson('unknown', 'Person 8'),
]

const starships = [
  createStarship('100', 'Starship 1'),
  createStarship('10', 'Starship 2'),
  createStarship('40', 'Starship 3'),
  createStarship('10', 'Starship 4'),
]

// Use CORS middleware
app.use(cors());
app.options('*', cors()); 

// Mock endpoints
app.get('/people/:id', (req, res) => {
  console.log('Person request');
  peopleRequestCounter++;
  res.json(people[peopleRequestCounter - 1]);
});

app.get('/starships/:id', (req, res) => {
  console.log('Starship request');
  starshipsRequestCounter++;
  res.json(starships[starshipsRequestCounter - 1]);
});

app.get('/reset', (req, res) => {
  console.log('Server restarted');
  peopleRequestCounter = 0;
  starshipsRequestCounter = 0;
  res.json({ message: 'Server restarted' });
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});