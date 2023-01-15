import { fromEvent, of, timer, merge, NEVER } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  exhaustMap,
  mapTo,
  mergeMap,
  retry,
  startWith,
  switchMap,
  tap,
  pluck,
} from 'rxjs/operators';

import {
  fetchButton,
  stopButton,
  clearError,
  clearFacts,
  addFacts,
  setError,
} from './utilities';

const endpoint = 'http://localhost:3333/api/facts';

const fetchEvent$ = fromEvent(fetchButton, 'click').pipe(
  mergeMap(() => {
  return fromFetch(endpoint).pipe(mergeMap((response)=> response.json()))
  })
);

fetchEvent$.subscribe(addFacts);
