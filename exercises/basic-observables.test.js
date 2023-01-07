import {from, Observable, of} from 'rxjs';

describe('Basic Observables', () => {
  describe(of, () => {
    it('should create an observable from its arguments', () => {
      const result = [];
      const myObservable$ = of(1,2,3,4);
      myObservable$.subscribe(value=> result.push(value))
      expect(result).toEqual([1, 2, 3, 4]);
    });
  });

  describe(from, () => {
    it.skip('should create an observable', () => {
      const result = [];
      const myObservable$ = from([1, 2, 3, 4]);
      myObservable$.subscribe(value=> result.push(value))
      expect(result).toEqual([1, 2, 3, 4]);
    });
  });
});
