import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';

import {Observable, of, switchMap, timer} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FlagBasedPreloadingStrategy extends PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] === true
      ? timer(1000).pipe(switchMap(() => load()))
      : of(null);
  }
}
