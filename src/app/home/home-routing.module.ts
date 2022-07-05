import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SqlQueryBuilderComponent } from '../sql-query-builder/sql-query-builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sql-query-builder', component: SqlQueryBuilderComponent },
];

const myComponents = [
  HomeComponent,
  SqlQueryBuilderComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
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
export class HomeRoutingModule { }
