import {fromEvent, interval, merge, NEVER, Subscription} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');
let subscription;
const tick$ = interval(1000);
start$.subscribe(()=> {
  subscription = tick$.subscribe(setCount)
});
pause$.subscribe(()=> subscription.unsubscribe())
