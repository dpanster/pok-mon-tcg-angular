import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from './../service/data-exchange.service';
import { ICard } from '../interface/tcg';

@Component({
  selector: 'app-pokemon-lists',
  templateUrl: './pokemon-lists.component.html',
  styleUrls: ['./pokemon-lists.component.css']
})
export class PokemonListsComponent implements OnInit {

  public receivedCards = <ICard[]>[];
  public pokemonName: string;
  public imgResloution: string;
  public selectedCards = <number[]>[];
  public lastSortAt = '';

  constructor(private data: DataExchangeService) { }

  ngOnInit() {
    console.log('PokemonCardsComponent: ngOnInit goes on...');

    this.data.currentResponse.subscribe(res => this.receivedCards = res);
    this.data.currentPokemonName.subscribe(name => this.pokemonName = name);
    this.data.currentImageResolutionOption.subscribe(imgRes => this.imgResloution = imgRes);

    console.log('PokemonCardsComponent: ngOnInit done...');
  }

  public onSortCardData(sortAt: string) {
    this.receivedCards.sort(
      (first, second) => {
        console.log('first[' + sortAt + ']: ' + first[sortAt]);
        console.log('second[' + sortAt + ']: ' + second[sortAt]);

        if (this.lastSortAt.localeCompare(sortAt)) {
          return first[sortAt].localeCompare(second[sortAt]);
        } else {
          return first[sortAt].localeCompare(second[sortAt]);
        }
      }
    );

    if (this.lastSortAt.localeCompare(sortAt)) {
      this.receivedCards.reverse();
    } else {
      this.lastSortAt = sortAt;
    }
   
  }
}
