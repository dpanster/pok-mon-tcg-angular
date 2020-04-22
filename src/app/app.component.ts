import { Component } from '@angular/core';
import { DataExchangeService } from './service/data-exchange.service';
import { HttpService } from './service/http.service';
import { ICard } from './interface/tcg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // img = [
  //   {src: 'https://images.pokemontcg.io/swsh1/65_hires.png'},
  //   {src : 'https://images.pokemontcg.io/bw11/RC7_hires.png'}
  // ];

  public receivedCards = <ICard[]>[];
  public viewOption = 'gallery';
  public pokemonName: string;
  public selectedCards = <number[]>[];
  private _imgResloution: string;
  public egCurlCommand = `'$ (cd C:/tmp/images && xargs -n 1 curl -O < C:/tmp/testUrl.txt)'`;

  constructor(private data: DataExchangeService, private httpSrvc: HttpService) {

    this.data.currentResponse.subscribe(res => this.receivedCards = res);
    this.data.currentPokemonName.subscribe(name => this.pokemonName = name);
    this.data.currentSelectedCards.subscribe(selCards => this.selectedCards = selCards);
    this.data.currentImageResolutionOption.subscribe(imgRes => this._imgResloution = imgRes);
  }

  public onSelectedViewOption(option: string) {
    this.viewOption = option;
  }



  public onClickDownload() {

    let aCollectLinks = <string[]>[];

    for (const cNb of this.selectedCards) {

      if (this._imgResloution === 'hiResolutionImages') {
        console.log('card with HI RES: ' + this.receivedCards[cNb].imageUrlHiRes);
        aCollectLinks.push(this.receivedCards[cNb].imageUrlHiRes);
      } else {
        console.log(`card with LO RES:: ${this.receivedCards[cNb].imageUrl}`);
        aCollectLinks.push(this.receivedCards[cNb].imageUrl);
      }
    }

    // unique array with set
    aCollectLinks = Array.from(new Set(aCollectLinks));

    // remove "empty" urls
    aCollectLinks = aCollectLinks.filter(v => v.length !== 0);

    // present save as / open dialog
    const a = document.createElement('a');
    a.href = "data:application/octet-stream," + encodeURIComponent(aCollectLinks.join('\n'));
    a.download = `Links_${this.pokemonName}_TCG.txt`;
    a.click();
    a.remove();
  }


  // public onClickDownload() {
  //   this.isImageLoading = true;
  //   this.httpSrvc.fetchImage(this.receivedCards[0].imageUrlHiRes).subscribe(data => {
  //     this.createImageFromBlob(data);
  //     this.isImageLoading = false;
  //   }, error => {
  //     this.isImageLoading = false;
  //     console.log(error);
  //   });
  // }
  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageToShow = reader.result;
  //   }, false);

  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

}
