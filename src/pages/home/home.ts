import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import {api_key} from "../../app/tmdb"


export interface Search {
  title : string;
  author : string;
  release_date : string;
  poster_path : string;
  overview : string;
}

const resultat_table : Array<Search> = [];


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result_table: Search[] = [{ title: "FightClub", author: "Moi", release_date: "30-FEB-2020", poster_path: "http://www.lorempixel.com/400/200", overview: "Blablablablablabla"}];
  constructor(public navCtrl: NavController) {
  }
query : string = "";

push(item:Search):void{
  console.log("view");
  this.navCtrl.push(DetailsPage,{item:item});
}

ionInput():void{
  console.log(this.query);
  var data = "{}";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=%3C%3Capi_key%3E%3E");

  xhr.send(data);
}
}
