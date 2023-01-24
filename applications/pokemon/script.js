import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
  pluck
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
  renderPokemon,
} from './utilities';
import {first} from "rxjs/operators";

const endpoint = 'http://localhost:3333/api/pokemon/';

const searchPokemon = (searchTerm) => {
  return fromFetch(endpoint + 'search/' + searchTerm).pipe(
    mergeMap(response => response.json()),
  )
}
const getPokemonData = (pokemon) => {
  return fromFetch(endpoint + pokemon.id).pipe(
    mergeMap(response => response.json()),
  )
}

const search$ = fromEvent(form, 'submit').pipe(
  map(() => search.value),
  switchMap(searchPokemon),
  pluck('pokemon'),
  mergeMap(pokemon => pokemon),
  // take(1)
  first(),
  tap(renderPokemon),
  switchMap((pokemon)=>{
    const pokemon$ = of(pokemon);
    const additionalData$ = getPokemonData(pokemon).pipe(map((data) => {
      return {
        ...pokemon,
        data
      }
    }))
    return merge(pokemon$,additionalData$);
  }),
  tap(renderPokemon),
)

/*
const oldSearch$ = fromEvent(search, 'input').pipe(
  map(event => event.target.value),
  switchMap(textToSearch =>
    fromFetch(endpoint + textToSearch + '&delay=1000&chaos=true').pipe(
      mergeMap(response => response.json()),
    )),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults)
);
*/

search$.subscribe(console.log);
