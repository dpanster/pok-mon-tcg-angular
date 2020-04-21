/**
 *
 * @description https://docs.pokemontcg.io/
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};



@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private httpC: HttpClient) { }

  /**
 * return: string 0 length when no user is logged
 */
  public fetchPokemonName(url: string): any {

    // request localhost
    // return this.httpC.get('api/v1/users/' + value);

    // build request WWW cards with parameter name
    return this.httpC.get(url);



    // return this.httpC.get(`https://api.pokemontcg.io/v1/cards/xy7-54`);
  }


  // https://stackoverflow.com/questions/18451856/how-can-i-let-a-user-download-multiple-files-when-a-button-is-clicked

  public fetchImage(url: string) {
    this.httpC.get(url, { responseType: 'arraybuffer',   headers: new HttpHeaders({
      'Access-Control-Allow-Origin': ' https://encrypted-tbn0.gstatic.com/'
    }) })
      .subscribe((res) => {
        const blob = new Blob([res], { type: 'image/png' });
        const urlBlob = window.URL.createObjectURL(blob);
        const pwa = window.open(urlBlob);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
          alert('Please disable your Pop-up blocker and try again.');
        }
      }
      );
  }

}
