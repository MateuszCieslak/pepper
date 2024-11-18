import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonResponse } from '../@shared/types/person-response.type';
import { Person } from '../@shared/types/person.type';
import { StarshipResponse } from '../@shared/types/starship-response.type';
import { Starship } from '../@shared/types/starship.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  getPerson(): Observable<Person> {
    const randomId = Math.floor(Math.random() * 80) + 1;
    return this.http.get<PersonResponse>(`${environment.apiUrl}/people/${randomId}`)
      .pipe(
        map(res => ({ 
          uid: Number(res.uid), 
          ...res.result.properties,
          description: res.result.description,
          created: new Date(res.result.properties.created),
          mass: res.result.properties.mass === 'unknown' ? 'unknown' : Number(res.result.properties.mass.replace(/,/g, '')),  
          height: Number(res.result.properties.height)
        }))
      );
  }

  getStarship(): Observable<Starship> {
    const randomId = Math.floor(Math.random() * 80) + 1;
    return this.http.get<StarshipResponse>(`${environment.apiUrl}/starships/${randomId}`)
      .pipe(
        map(res => ({ 
          uid: Number(res.uid), 
          ...res.result.properties,
          description: res.result.description,
          crew: Number(res.result.properties.crew.replace(/,/g, '')),
          passengers: Number(res.result.properties.passengers.replace(/,/g, '')),
          cargo_capacity: Number(res.result.properties.cargo_capacity.replace(/,/g, ''))
        }))
      );
  }
}
