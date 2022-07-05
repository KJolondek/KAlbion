import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellResourcesComponent } from './sell-resources.component';
import { PipeModule } from '../pipes/pipe.module';
import { SearchItemComponent } from './search-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'sell-resources' },
  { path: 'sell-resources', component: SellResourcesComponent, },
  { path: 'search-item', component: SearchItemComponent, },
];

const myComponents = [
  SearchItemComponent,
  SellResourcesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipeModule.forRoot()
],
exports: [
  RouterModule
],
declarations: [
  myComponents
],
entryComponents: [
  myComponents,
]
})
export class KalbionRoutingModule { }
