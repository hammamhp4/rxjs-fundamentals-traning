import {fromEvent, interval, merge, NEVER, skipUntil, Subscription} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';
import {takeUntil, scan} from "rxjs/operators";

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');
let subscription;
const tick$ = interval(1000);
/*
start$.subscribe(()=> {
  subscription = tick$.subscribe(setCount)
});
pause$.subscribe(()=> subscription.unsubscribe())
*/
let observable$ = tick$.pipe(
  skipUntil(start$),
  scan(acc=> acc+1,0),
  takeUntil(pause$),
)
observable$.subscribe(setCount);
