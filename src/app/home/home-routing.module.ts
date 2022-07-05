import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

const myComponents = [
  HomeComponent
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
