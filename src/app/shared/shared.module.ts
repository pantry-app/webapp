import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakePipe } from '../services/pipes/take.pipe';



@NgModule({
  declarations: [
    TakePipe
  ],
  exports: [
    TakePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
