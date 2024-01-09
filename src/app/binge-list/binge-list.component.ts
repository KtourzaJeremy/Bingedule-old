import { Component, Input, OnInit } from '@angular/core';
import { Seance, ListOfSeances, Proposition } from '../movie';
import { MovieService } from '../service/movie.service';
import { DateService } from '../service/date.service';

@Component({
  selector: 'app-binge-list',
  templateUrl: './binge-list.component.html',
  styleUrls: ['./binge-list.component.css']
})
export class BingeListComponent implements OnInit {

  @Input() proposition!: Proposition;
  nbMovie: number = 0;
  listOfSeances: ListOfSeances[] = [];

  show:boolean = false;

  constructor(private movieService: MovieService, private dateService:DateService) { }

  ngOnInit(): void {
    this.nbMovie = this.proposition.nbMovie;
    this.listOfSeances = this.proposition.list
  }

  lengthTimeFormat(length:number) {
    return this.dateService.lengthTimeFormat('minute',length);
  }

  attenteTotalDuree_calcul(seances:Seance[]):number{
    var lg:number = 0;
    for (let i = 0; i < seances.length; i++) {
      if (seances.length > i+1){
        lg += this.dateService.tempsAttente(seances[i].ending,seances[i+1].begining);
      } 
    }
    return lg;
  }

  attenteTotaleDuree(list:ListOfSeances):string {
    var lg:number = this.attenteTotalDuree_calcul(list.seances);
    return `${this.dateService.lengthTimeFormat('second',lg)}`;
  }

  dureeTotaleJournee(list:ListOfSeances):string {
    var lg:number = 0;
    for (const seance of list.seances) {
      lg += seance.length;
    }
    lg += this.attenteTotalDuree_calcul(list.seances)/60;
    return `${this.dateService.lengthTimeFormat('minute',lg)}`;
  }

}
