import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  newDate(hour:number, minute:number){
    var date = new Date();
    date.setHours(hour, minute, 0);
    return date;
  }

  formatDate(interval:string, units:number) {
    return this.dateAdd(this.newDate(0,0), interval, units);
  }

  lengthTimeFormat(interval:string,length:number) {
    var date = this.formatDate(interval, length);
    return `${date.getHours()}h${date.getMinutes()>9 ? date.getMinutes() : `0${date.getMinutes()}`}`;
  }

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minutes', 30)  //returns 30 minutes from now.
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */

  dateAdd(date: Date, interval:string, units:number) {
    //if(!(date instanceof Date))
    //  return null;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
      case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'day'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      //default       :  ret = null;  break;
    }
    return ret;
  }

  tempsAttente(fin:Date,debut:Date):number{
    var length = debut.getTime() - fin.getTime();
    return length/1000;
  }

  tempsAttente_format(fin:Date,debut:Date):string{
    var length = debut.getTime() - fin.getTime();
    var date = this.formatDate('second', length/1000);
    return `${date.getHours()}h${date.getMinutes()>9 ? date.getMinutes() : `0${date.getMinutes()}`}`;
  }
}
