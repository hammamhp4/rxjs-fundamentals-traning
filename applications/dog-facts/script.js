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
} from 'rxjs/operators';

import {addFacts, clearError, clearFacts, fetchButton, stopButton,} from './utilities';

const endpoint = 'http://localhost:3333/api/facts';

const fetchData = () => fromFetch(endpoint).pipe(
  tap(clearError),
  mergeMap((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong')
    }
  }),
  retry(4),
  catchError((error) => {
    return of({error: error.message})
  })
)

const fetch$ = fromEvent(fetchButton, 'click').pipe(mapTo(true));
const stop$ = fromEvent(stopButton, 'click').pipe(mapTo(false));
const fetchStream$ = merge(fetch$, stop$).pipe(
  startWith(false),
  switchMap(isFetching => {
    if (isFetching) {
      return timer(0, 5000).pipe(
        tap(() => clearError()),
        tap(() => clearFacts()),
        exhaustMap(fetchData)
      )
    } else {
      return NEVER;
    }
  })
)
fetchStream$.subscribe(addFacts);
