import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../service/movie.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {

  @Input() movies!: Movie[];

  constructor(private movieService: MovieService, private dateService:DateService) { }

  ngOnInit(): void {
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(h => h !== movie);
    this.movieService.deleteMovie(movie.id).subscribe();
  }

  //////// Other methods //////////
  lengthTimeFormat(length:number) {
    var date = this.dateService.formatDate('minute', length);
    return `${date.getHours()}h ${date.getMinutes()>9 ? date.getMinutes() : `0${date.getMinutes()}`}min`;
  }

  endDate(date:Date,length:number) {
    return `${this.dateService.dateAdd(date, 'minute', length)}`;
  }

}
