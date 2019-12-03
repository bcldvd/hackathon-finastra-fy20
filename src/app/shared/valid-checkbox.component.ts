import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'valid-checkbox',
  template: `<div class="success-checkmark">
  <div class="check-icon">
    <span class="icon-line line-tip"></span>
    <span class="icon-line line-long"></span>
    <div class="icon-circle"></div>
    <div class="icon-fix"></div>
  </div>
</div>`,
styleUrls: ['./valid-checkbox.component.scss']
})
export class ValidCheckboxComponent {
  constructor() {}
}
