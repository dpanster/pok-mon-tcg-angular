
/**
 * @help https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
 * @help https://www.learnrxjs.io/learn-rxjs/operators/creation/timer
 */

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from './../service/http.service';
import { DataExchangeService } from './../service/data-exchange.service';
import { ICard } from './../interface/tcg';
import * as TCG from './../test/tcg.json';
import { timer } from 'rxjs';

// import { state, style, trigger, transition, animate, keyframes } from '@angular/animations';

/* I was not able to set a fix time set of keyframes for this image animation in Angular/Animations.
My result ends in floating animations. This is not what I want. Pure CSS animation does the job.
If you know how to do this please write me an Email (dpanster.dev@web.de). Thanks
*/

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
  // animations: [
  //   trigger('trgPikaRun', [
  //     // state('pikaRun', style({
  //     //   'background-position': '70px 0px',
  //     //   height: '60px',
  //     //   width: '70px',
  //     //   background: 'url(\'./../assets/pikachu_sprite_run.png\') 0px 0px'
  //     // })),
  //     // state('pikaRunE', style({
  //     //   height: '60px',
  //     //   width: '70px',
  //     //   background: 'url(\'./../assets/pikachu_sprite_run.png\') 0px 0px'
  //     // })),
  //     transition(':enter', [
  //       style({
  //         height: '60px',
  //         width: '70px',
  //         background: 'url(\'./../assets/pikachu_sprite_run.png\') 0px 0px'
  //       }),
  //       animate('0.1s', style({ 'background-position': '70px 0px' })),
  //       animate('0.1s', style({ 'background-position': '0px 0px' })),
  //       animate('0.1s', style({ 'background-position': '-70px 0px' })),
  //       animate('0.1s', style({ 'background-position': '-140px 0px' })),
  //       animate('0.1s', style({ 'background-position': '-210px 0px' }))
  //     ])
  //   ]),
  //   trigger('trgJumpFlash', [
  //     state('pikaJumpFlash', style({
  //       height: '60px',
  //       width: '70px',
  //       background: 'url("./../assets/pikachu_sprite_jump-flash.png") 0px 0px'
  //     })),
  //     transition('* => pikaJumpFlash', [
  //       animate('1s')
  //     ])
  //   ])
  // ]
})
export class InputFormComponent implements OnInit, AfterViewInit {

  pokemonForm: FormGroup;
  submitted = false;
  readonly BASE_URL = 'https://api.pokemontcg.io/v1/cards?name=';

  public requestUrl: string;
  public resultApiRequest: string;
  public responseErr: string;

  public audioElement;

  public pikaRunAnimDuration = '0.4s';
  public bAnimationPikaRun = true;
  // the spritePikaJumpFlash animation needs 0.5s. So, Pikachu jumps twice
  private _rxTimerJump = timer(1400);
  private _rxTimerSpeedRun = timer(4000);


  // convenience getter for easy access to form fields
  get pFC() { return this.pokemonForm.controls; }


  constructor(private formBuilder: FormBuilder, private httpSrvc: HttpService, private data: DataExchangeService) {
    this.responseErr = '';
   }

  ngOnInit() {
    this.pokemonForm = this.formBuilder.group({
      pokemon_name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\s\-]+$')]],
      imgResolutionOption: ['lowResolutionImages']
    });
  }

  ngAfterViewInit(): void {
    this.resultApiRequest = this.BASE_URL;
  }

  onPokemonNameChange() {
    this.requestUrl = `${this.BASE_URL}${this.pFC.pokemon_name.value}`;
  }


  onSubmit() {

    this.submitted = true;

    console.log('onSubmit');

    console.log('pokemon_name.errors: ' + JSON.stringify(this.pFC.pokemon_name.errors));
    console.log('pokemon_name.invalid: ' + JSON.stringify(this.pFC.pokemon_name.invalid));
    console.log('pokemon_name.value: ' + JSON.stringify(this.pFC.pokemon_name.value));

    // check valid form
    if (this.pokemonForm.invalid === false) {

      // request:
      console.log('try fetch... ');

      // test local data
      // const cards: ICard[] = <any>TCG.cards; // Test Data
      // this.data.changeImageResolutionOption(this.pFC.imgResolutionOption.value);
      // this.data.changeHttpResponse(cards);
      // return;


      // set data-exchange pokemon name
      this.data.changePokemonName(this.pFC.pokemon_name.value);

      this.httpSrvc.fetchPokemonName(this.requestUrl).subscribe(
        (res) => {
          console.log('fetchPokemonName result: ' + JSON.stringify(res.cards));
          this.responseErr = '';

          this.resultApiRequest = JSON.stringify(res);
          this.data.changeImageResolutionOption(this.pFC.imgResolutionOption.value);
          this.data.changeHttpResponse(res.cards);

        },
        (err) => {
          const cards = <ICard[]>[];
          this.data.changeHttpResponse(cards);

          console.log('err.message' + err.message);
          this.responseErr = err.message;

          // this.data.currentMessage.subscribe(message => console.log('currentMessage.subscribe: ' + message));
        }
      );
    }
  }

  public playPikachuAudio() {

    // randomize Pikachu sound
    console.log('x: ' + (Math.round(Math.random())));

    let sMp3: string;
    if ((Math.round(Math.random())) === 1) {
      sMp3 = './../../assets/pikaaaa.mp3';
    } else {
      sMp3 = './../../assets/PikaPikaHappy.mp3';
    }
    this.audioElement = new Audio(sMp3);
    // this.audioElement.pause();
    // this.audioElement.currentTime = 0;
    this.audioElement.play();

    // Animation class switches immediately after click.
    // The timer set the class back after timeout. And change animation duration.
    if (this.bAnimationPikaRun === true) {
      this.bAnimationPikaRun = false;

      // timer for jumping animation
      this._rxTimerJump.subscribe((val) => {
        this.bAnimationPikaRun = true;
        this.pikaRunAnimDuration = '0.2s';
      });

      // timer to reset animation speed
      this._rxTimerSpeedRun.subscribe(val => this.pikaRunAnimDuration = '0.4s');

    }
  }

}
