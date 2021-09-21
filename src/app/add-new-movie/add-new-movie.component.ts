import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from '../movie';
import { MovieService } from '../service/movie.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.css']
})
export class AddNewMovieComponent implements OnInit {

  @Input() movies!: Movie[];
  seances = ["",""];
  newMovieName = "";
  newMovieLength = "";

  constructor(private movieService: MovieService, private dateService:DateService) { }

  ngOnInit(): void {
  }

  reset(form:NgForm): void {
    form.resetForm();
    this.seances = ["",""];
  }

  add(form:NgForm): void {
    var name = this.newMovieName.trim();
    var length = this.newMovieLength.trim();

    if (!name || !length || this.seancesEmpty()) { return; }
    var min = Number(length.split(':')[0])*60+Number(length.split(':')[1]);

    this.movieService.addMovie({ name:name,length:min,shows:this.generateShows() } as Movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });

    this.reset(form);
  }

  addSeance(){
    this.seances.push("");
  }
  removeSeance(i:number){
    this.seances.splice(i,1);
  }

  generateShows() {
    var dates:Array<Date> = [];

    for (const seance of this.seances) {
      dates.push(this.dateService.newDate(Number(seance.split(':')[0]),Number(seance.split(':')[1])));
    }

    return dates;
  }

  seancesEmpty() {
    if (this.seances.length<1){
      return true;
    } else {
      for (const seance of this.seances) {
        if (seance==""){
          return true;
        }
      }
    }
    return false;
  }

  trackByFn(index:any, item:any) {
    return index; // or item.id
  }

}
