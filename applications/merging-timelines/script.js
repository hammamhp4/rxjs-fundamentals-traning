import { fromEvent, merge, interval, concat, race, forkJoin } from 'rxjs';
import { mapTo, startWith, take, map } from 'rxjs/operators';
import {
  labelWith,
  startButton,
  pauseButton,
  setStatus,
  bootstrap,
} from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const clickEvent$ = merge(start$,pause$).pipe(startWith(false))
clickEvent$.subscribe(setStatus);
const first$ = interval(1000).pipe(map(labelWith('First')), take(4))
const second$ = interval(1000).pipe(map(labelWith('Second')), take(4))
// const combined$ = merge(first$, second$) // merge them when getting any value from first or second it will work on any of em
// const combined$ = concat(first$, second$) // concat work with the first stream and when the first stream ends it will do the other one
const combined$ = race(first$, second$) // talks only to winners
// const combined$ = forkJoin(first$, second$) // give you the last value of each stream combined in array
bootstrap({first$, second$, combined$})
