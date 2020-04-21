import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListsComponent } from './pokemon-lists.component';

describe('PokemonListsComponent', () => {
  let component: PokemonListsComponent;
  let fixture: ComponentFixture<PokemonListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
