import { Component, Input, OnInit } from '@angular/core';
import { Movie, Seance, ListOfSeances, Proposition } from '../movie';
import { MovieService } from '../service/movie.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-binge-container',
  templateUrl: './binge-container.component.html',
  styleUrls: ['./binge-container.component.css']
})
export class BingeContainerComponent implements OnInit {

  @Input() movies!: Movie[];
  seances: Seance[] = [];
  listOfSeances2: ListOfSeances[] = [];
  listOfSeances3: ListOfSeances[] = [];
  listOfSeances4: ListOfSeances[] = [];
  propositions!: Proposition[];

  constructor(private movieService: MovieService, private dateService:DateService) { }

  ngOnInit(): void {
  }

  bingeIt() {
    if (this.movies.length < 2) {
      return
    }

    this.initializeListOfSeances();

    this.setListOfSeances();

    console.log(this.seances);

    this.initializePropositions();
  }

  initializeListOfSeances() {
    this.seances = [];
    this.listOfSeances2 = [];
    this.listOfSeances3 = [];
    this.listOfSeances4 = [];
    this.propositions = [];

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

  initializePropositions(){
    if(this.listOfSeances4.length > 0){
      this.propositions.push({nbMovie:4,list:this.listOfSeances4});
    }
    if(this.listOfSeances3.length > 0){
      this.propositions.push({nbMovie:3,list:this.listOfSeances3});
    }
    if(this.listOfSeances2.length > 0){
      this.propositions.push({nbMovie:2,list:this.listOfSeances2});
    }
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
        this.listOfSeances2.push({seances:s});
        break;
      }
    }
  }

  setListOfSeances() {
    for (const firstSeance of this.seances) {
      for (const secondSeance of this.seances) {
        if (this.compareSeances([secondSeance,firstSeance])) {
          continue;
        }
        this.pushListOfSeances(this.listOfSeances2,[firstSeance,secondSeance]);

        if(this.movies.length > 2) {
          for(const thirdSeance of this.seances){
            if (this.compareSeances([thirdSeance,secondSeance,firstSeance])) {
              continue;
            }
            this.pushListOfSeances(this.listOfSeances3,[firstSeance,secondSeance,thirdSeance]);

            if(this.movies.length > 3) {
              for(const forthSeance of this.seances){
                if (this.compareSeances([forthSeance,thirdSeance,secondSeance,firstSeance])) {
                  continue;
                }
                this.pushListOfSeances(this.listOfSeances4,[firstSeance,secondSeance,thirdSeance,forthSeance]);
              }
            }
          }
        }
      }
    }
  }

  pushListOfSeances(list:ListOfSeances[],seances:Seance[]) {
    var s:Seance[] = [];
    for (const seance of seances) {
      s.push({ name:seance.name,
        length:seance.length,
        begining:seance.begining,
        ending:seance.ending 
      } as Seance);
    }
    list.push({seances:s});
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

  compareSeances(s:Seance[]):boolean{
    if (s[1].name == s[0].name) {
      return true;
    }
    else if (s[1].ending.getTime() >= s[0].begining.getTime()) {
      return true;
    }

    if (s.length > 2) {
      if (s[2].name == s[0].name) {
        return true;
      }
    }
    if (s.length > 3) {
      if (s[3].name == s[0].name) {
        return true;
      }
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

  showListing(i:number){
    switch (i) {
      case 4:
        return this.listOfSeances4.length > 0;
      case 3:
        return this.listOfSeances3.length > 0;
      case 2:
        return this.listOfSeances2.length > 0;
    
      default:
        return false;
    }
  }
}
