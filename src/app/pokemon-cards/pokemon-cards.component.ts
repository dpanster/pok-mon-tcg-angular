import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from './../service/data-exchange.service';
import { ICard } from '../interface/tcg';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonCardsComponent implements OnInit {

  public receivedCards = <ICard[]>[];
  public pokemonName: string;
  public imgResloution: string;
  public selectedCards = <number[]>[];

  constructor(private data: DataExchangeService, private httpSrvc: HttpService) { }

  ngOnInit() {
    console.log('PokemonCardsComponent: ngOnInit goes on...');

    this.data.currentResponse.subscribe(res => this.receivedCards = res);
    this.data.currentPokemonName.subscribe(name => this.pokemonName = name);
    this.data.currentImageResolutionOption.subscribe(imgRes => this.imgResloution = imgRes);

    console.log('PokemonCardsComponent: ngOnInit done...');
  }

  public tcgCardClicked(ndx: number) {

    if (this.selectedCards.includes(ndx) === false) {
      // add
      this.selectedCards.push(ndx);
    } else {
      // remove
      const i = this.selectedCards.indexOf(ndx, 0);
      this.selectedCards.splice(i, 1);
    }
    // this.selectedCards = Array.from(new Set(this.selectedCards)); // unique array with set
    console.log('selectedCards: ' + this.selectedCards);
    this.data.changeSelectedCards(this.selectedCards);
  }

  public tcgCardDblClicked(ndx: number) {
    console.log('DBL: ' + ndx);


    let url: string;
    let urlSplt = <string[]>[];


    if (this.imgResloution === 'hiResolutionImages') {
      url = this.receivedCards[ndx].imageUrlHiRes;
    } else {
      url = this.receivedCards[ndx].imageUrl;
    }

    this.httpSrvc.fetchImage(url);

    // // get the file name from url
    // urlSplt = url.split('\/');

    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.responseType = 'blob';
    // xhr.onload = function () {
    //   const urlCreator = window.URL || window.webkitURL;
    //   const imageUrl = urlCreator.createObjectURL(this.response);
    //   const tag = document.createElement('a');
    //   tag.href = imageUrl;
    //   tag.download = urlSplt[urlSplt.length - 1];
    //   document.body.appendChild(tag);
    //   tag.click();
    //   document.body.removeChild(tag);
    // };
    // xhr.send();















  }

  public onChangeSelectAll(state: boolean) {
    // empty selected cards
    this.selectedCards.length = 0;

    if (state === true) {
      // select all elements
      for (let i = 0; i < this.receivedCards.length; i++) {
        this.selectedCards.push(i);
      }
    } else {
      // select no element
    }

    console.log('onChangeSelectAll: ' + this.selectedCards);
    this.data.changeSelectedCards(this.selectedCards);
  }
}
