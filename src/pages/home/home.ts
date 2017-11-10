import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface Search {
  title : string;
  author : string;
  date : string;
  image : string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result_table: Search[] = [{ title: "FightClub", author: "Moi", date: "30-FEB-2020", image: "http://lorempixel.com/400/200" }];
  constructor(public navCtrl: NavController) {

  }

}
