import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface Search {
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
  result_table: Search[] = [{ title: "FightClub", author: "Moi", date: "30-FEB-2020", image: "https://placeimg.com/640/480/any" }];
  constructor(public navCtrl: NavController) {
  }
query : string = "";

ionInput():void{
  console.log(this.query);
}
}
