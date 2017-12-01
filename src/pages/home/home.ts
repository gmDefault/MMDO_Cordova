import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

export interface Search {
  title : string;
  author : string;
  date : string;
  image : string;
}

const resultat_table : Array<Search> = [];


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result_table: Search[] = [{ title: "FightClub", author: "Moi", date: "30-FEB-2020", image: "http://www.lorempixel.com/400/200" }];
  constructor(public navCtrl: NavController) {
  }
query : string = "";

push(item:Search):void{
  console.log("view");
  this.navCtrl.push(DetailsPage,{item:item});
}

ionInput():void{
  console.log(this.query);
}
}
