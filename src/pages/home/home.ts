import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import {api_key} from "../../app/tmdb"
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {Shake} from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';


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

  private shakeSubscription: Subscription;
  query: string = "";
  link : string = 'https://api.themoviedb.org/3/search/movie';
  link2 : string = 'https://api.themoviedb.org/3/discover/movie';
  langue : string = 'fr-FR';
  date : string = '2018';


  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,  private shake : Shake) {
    this.ionInput();


  }

ionViewDidEnter(){
  console.log("It enter");
  this.shakeSubscription = this.shake.startWatch().switchMap(() => this.fetchResults2()).subscribe(movies => this.showRandomMovieAlert(movies));
}

ionViewWillLeave(){
  console.log("It leaves");
  this.shakeSubscription.unsubscribe();
}


fetchResults() : Observable<Search[]>{
 return this.http.get<Search[]>(this.link,{
  params : new HttpParams().set("api_key",api_key).set("query",this.query)}).pluck('results');
}
//.set("language",this.langue) en cas d'une version française par exemple (ici langue = "fr-FR")

private fetchResults2(): Observable<Search[]> {
 return this.http.get<Search[]>(this.link2, {
  params: new HttpParams().set("api_key", api_key).set("primary_release_year", this.date)}).pluck('results');
}

private showRandomMovieAlert(movies:Search[]){
var movie = movies[Math.floor(Math.random()*movies.length)];
let alert = this.alertCtrl.create({
  title: "Movie by", message : "Bon film tavu",
  buttons: [
  {
text: 'Dis Hagrid', handler : () => {
               console.log('Dis hagrid clicked');
               }
  },
  {
    text: 'Hagrid', handler: () => {
      console.log('Hagrid clicked');
      this.navCtrl.push(DetailsPage, { movie: movie });
    }
  }
  ]
});
alert.present();
}


push(item:Search):void{
  console.log("view");
  this.navCtrl.push(DetailsPage,{item:item});
}

ionInput():void{
  console.log(this.query);
  if(this.query){
    this.result_table = this.fetchResults2();
  }
  else{
    this.result_table = Observable.of([]);
  }
}
}


