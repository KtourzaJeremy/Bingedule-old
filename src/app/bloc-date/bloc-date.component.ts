import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bloc-date',
  templateUrl: './bloc-date.component.html',
  styleUrls: ['./bloc-date.component.css']
})
export class BlocDateComponent implements OnInit {

  @Input() begin!: Date;
  @Input() end: string = '';
  @Input() end_d!: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
