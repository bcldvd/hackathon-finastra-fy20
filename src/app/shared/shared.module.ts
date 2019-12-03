import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidCheckboxComponent } from './valid-checkbox.component';

@NgModule({
  declarations: [
    ValidCheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidCheckboxComponent
  ]
})
export class SharedModule { }
