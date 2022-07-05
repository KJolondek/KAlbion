import { NgModule }      from '@angular/core';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
    imports:        [],
    declarations:   [DateAgoPipe],
    exports:        [DateAgoPipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
} 