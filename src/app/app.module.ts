import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { PokemonCardsComponent } from './pokemon-cards/pokemon-cards.component';
import { PokemonListsComponent } from './pokemon-lists/pokemon-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    PokemonCardsComponent,
    PokemonListsComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [], // injector configruation
  bootstrap: [AppComponent]
})
export class AppModule { }
