import { Component, Input, OnInit } from '@angular/core';
import { Movie, Seance, ListOfSeances } from '../movie';
import { MovieService } from '../service/movie.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-binge-list',
  templateUrl: './binge-list.component.html',
  styleUrls: ['./binge-list.component.css']
})
export class BingeListComponent implements OnInit {

  @Input() movies!: Movie[];
  seances: Seance[] = [];
  listOfSeances: ListOfSeances[] = []

  constructor(private movieService: MovieService, private dateService:DateService) { }

  ngOnInit(): void {
  }

  bingeIt() {
    if (this.movies.length < 2) {
      return
    }

    this.initializeListOfSeances();

    this.setListOfSeances();

    console.log(this.listOfSeances)
  }

  initializeListOfSeances() {
    this.seances = [];
    this.listOfSeances = [];

    for (const movie of this.movies) {
      for (const seance of movie.shows) {
        this.seances.push(
          { name:movie.name,
            length:movie.length,
            begining:this.dateService.dateAdd(seance,'minute',0),
            ending:this.dateService.dateAdd(seance,'minute',movie.length) 
          } as Seance)
      }
    }
    this.sortSeances();
  }

  sortSeances() {
    this.seances.sort((a, b) => a.begining.getTime() - b.begining.getTime());
  }

  getFirstMoviesOfTheDay() {
    for (const movie of this.movies) {
      for (const seance of movie.shows) {
        var s:Seance[] = [];
        s.push(
          { name:movie.name,
            length:movie.length,
            begining:this.dateService.dateAdd(seance,'minute',0),
            ending:this.dateService.dateAdd(seance,'minute',movie.length) 
          } as Seance)
        this.listOfSeances.push({seances:s});
        break;
      }
    }
  }

  setListOfSeances() {
    for (const firstSeance of this.seances) {
      for (const secondSeance of this.seances) {
        if (this.compareTwoSeances(firstSeance,secondSeance)) {
          continue;
        }
        this.pushListOfSeances([firstSeance,secondSeance]);

        if(this.seances.length > 2) {
          for(const thirdSeance of this.seances){
            if (this.compareTwoSeances(secondSeance,thirdSeance)) {
              continue;
            }
            this.pushListOfSeances([firstSeance,secondSeance,thirdSeance]);

            if(this.seances.length > 3) {
              for(const forthSeance of this.seances){
                if (this.compareTwoSeances(thirdSeance,forthSeance)) {
                  continue;
                }
                this.pushListOfSeances([firstSeance,secondSeance,thirdSeance,forthSeance]);
              }
            }
          }
        }
      }
    }
  }

  pushListOfSeances(seances:Seance[]) {
    var s:Seance[] = [];
    for (const seance of seances) {
      s.push({ name:seance.name,
        length:seance.length,
        begining:seance.begining,
        ending:seance.ending 
      } as Seance);
    }
    this.listOfSeances.push({seances:s});
  }
  
  compareTwoSeances(s1:Seance,s2:Seance):boolean{
    if (s1.name == s2.name) {
      return true;
    }
    else if (s1.ending.getTime() >= s2.begining.getTime()) {
      return true;
    }
    return false;
  }

  listContainsSeance(list:Seance[],s:Seance):boolean{
    for (const seance of list) {
      if (s.name == seance.name){
        return false;
      }
    }
    return true
  }

}
