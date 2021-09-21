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
  listOfSeances2: ListOfSeances[] = [];
  listOfSeances3: ListOfSeances[] = [];
  listOfSeances4: ListOfSeances[] = [];

  show2 = false;
  show3 = false;
  show4 = false;

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
  }

  initializeListOfSeances() {
    this.seances = [];
    this.listOfSeances2 = [];
    this.listOfSeances3 = [];
    this.listOfSeances4 = [];

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
        this.listOfSeances2.push({seances:s});
        break;
      }
    }
  }

  setListOfSeances_old() {
    for (const firstSeance of this.seances) {
      for (const secondSeance of this.seances) {
        if (this.compareTwoSeances(firstSeance,secondSeance)) {
          continue;
        }
        this.pushListOfSeances(this.listOfSeances2,[firstSeance,secondSeance]);

        if(this.movies.length > 2) {
          for(const thirdSeance of this.seances){
            if (this.compareTwoSeances(secondSeance,thirdSeance)) {
              continue;
            }
            this.pushListOfSeances(this.listOfSeances3,[firstSeance,secondSeance,thirdSeance]);

            if(this.movies.length > 3) {
              for(const forthSeance of this.seances){
                if (this.compareTwoSeances(thirdSeance,forthSeance)) {
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

  lengthTimeFormat(length:number) {
    return this.dateService.lengthTimeFormat(length);
  }

  attenteDuree(list:number,i:number,j:number){
    switch (list) {
      /*
      case 4:
        return this.listOfSeances4.length > 0;
      case 3:
        return this.listOfSeances3.length > 0;
      case 2:
        return this.listOfSeances2.length > 0;*/
      case 3:
        if (this.listOfSeances3[i].seances.length > j+1){
          return `Temps d'attente : ${this.dateService.tempsAttente(this.listOfSeances3[i].seances[j].ending,this.listOfSeances3[i].seances[j+1].begining)}`;
        } else {
          return "FIN";
        }
      default:
        return "NOPE";
    }
  }

}
