import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { from } from 'rxjs';
import {
  concatMap,
  mergeMap,
  switchMap,
  exhaustMap,
  map,
  delay,
} from 'rxjs/operators';
import 'rxjs/add/observable/from';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  search: string = '';

  switchMap: Array<String> = [];
  concatMap: Array<String> = [];
  mergeMap: Array<String> = [];
  exhaustMap: Array<String> = [];

  startTime: number = 0;
  updateSearch(value: string) {
    this.searchString.next(value);
    this.startTime = performance.now();
  }

  ngOnInit() {
    this.searchString$
      .pipe(
        switchMap((x) =>
          from(['1', '2', '3']).pipe(
            delay(1000),
            map((y) => `appel: ${y}, param: ${x}`)
          )
        )
      )
      .subscribe((x) => {
        console.log('SwitchMap :' + x);
        this.switchMap.push(
          Math.round((performance.now() - this.startTime) / 1000) + 's : ' + x
        );
      });

    this.searchString$
      .pipe(
        concatMap((x) =>
          from(['1', '2', '3']).pipe(
            delay(1000),
            map((y) => `appel: ${y}, param: ${x}`)
          )
        )
      )
      .subscribe((x) => {
        console.log('ConcatMap :' + x);
        this.concatMap.push(
          Math.round((performance.now() - this.startTime) / 1000) + 's : ' + x
        );
      });

    this.searchString$
      .pipe(
        mergeMap((x) =>
          from(['1', '2', '3']).pipe(
            delay(1000),
            map((y) => `appel: ${y}, param: ${x}`)
          )
        )
      )
      .subscribe((x) => {
        console.log('MergeMap :' + x);
        this.mergeMap.push(
          Math.round((performance.now() - this.startTime) / 1000) + 's : ' + x
        );
      });

    this.searchString$
      .pipe(
        exhaustMap((x) =>
          from(['1', '2', '3']).pipe(
            delay(1000),
            map((y) => `appel: ${y}, param: ${x}`)
          )
        )
      )
      .subscribe((x) => {
        console.log('exhaustMap :' + x);
        this.exhaustMap.push(
          Math.round((performance.now() - this.startTime) / 1000) + 's : ' + x
        );
      });
  }

  reset() {
    this.switchMap = [];
    this.concatMap = [];
    this.mergeMap = [];
    this.exhaustMap = [];
    this.search = '';
  }
}
