import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import {api_key} from "../../app/tmdb"
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

export interface Search {
  title : string;
  author : string;
  release_date : string;
  poster_path : string;
  overview : string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result_table: Observable<Search[]>;

  query: string = "";
  link : string = 'https://api.themoviedb.org/3/search/movie';

  constructor(public navCtrl: NavController, public http : HttpClient) {
    this.ionInput();
  }


fetchResults() : Observable<Search[]>{
 return this.http.get<Search[]>(this.link,{
  params : new HttpParams().set("api_key",api_key).set("query",this.query)}).pluck('results');
}

push(item:Search):void{
  console.log("view");
  this.navCtrl.push(DetailsPage,{item:item});
}

ionInput():void{
  console.log(this.query);
  if(this.query){
    this.result_table = this.fetchResults();
  }
  else{
    this.result_table = Observable.of([]);
  }
}
}


