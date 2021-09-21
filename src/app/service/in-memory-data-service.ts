import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from '../movie';
import { DateService } from '../service/date.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(private dateService: DateService) { }

  createDb() {
    const movies2 = [
      { id: 1, name: 'Star Wars 7 : Le réveil de la Force', length: 131, shows:[this.dateService.newDate(13,5),this.dateService.newDate(15,30)] },
      { id: 2, name: 'Terminator 2', length: 114, shows:[this.dateService.newDate(11,1),this.dateService.newDate(14,19),this.dateService.newDate(17,17),this.dateService.newDate(20,55)] },
      { id: 3, name: 'Pokémon le film, Mewtwo VS Mew', length: 69, shows:[this.dateService.newDate(13,0),this.dateService.newDate(18,55),this.dateService.newDate(20,49),this.dateService.newDate(22,5)] }
    ];
    const movies = [
      { id: 1, name: 'A', length: 60, shows:[this.dateService.newDate(10,0),this.dateService.newDate(11,30),this.dateService.newDate(15,30)] },
      { id: 2, name: 'B', length: 120, shows:[this.dateService.newDate(10,0),this.dateService.newDate(12,30),this.dateService.newDate(15,0)] },
      { id: 3, name: 'C', length: 60, shows:[this.dateService.newDate(11,0),this.dateService.newDate(16,5),this.dateService.newDate(17,5)] }
    ];
    return {movies};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 11;
  }
}