import {fromEvent, interval, merge, NEVER, skipUntil, Subscription, tap} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';
import {startWith, switchMap, takeUntil, mergeMap, map, scan, mapTo} from "rxjs/operators";

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const tick$ = interval(1000);
/*
start$.subscribe(()=> {
  subscription = tick$.subscribe(setCount)
});
pause$.subscribe(()=> subscription.unsubscribe())
*/


/*
let observable$ = tick$.pipe(
  skipUntil(start$),
  scan(acc=> acc+1,0),
  takeUntil(pause$),
)
*/

let observable$ = merge(start$, pause$).pipe(
  startWith(false),
  switchMap(isRunning => (isRunning ? tick$ : NEVER)),
  scan(acc=> acc+1,0),
)

observable$.subscribe(setCount);
