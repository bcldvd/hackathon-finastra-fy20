import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'add-kid-modal',
  styleUrls: ['./add-kid-modal.scss'],
  templateUrl: './add-kid-modal.html'
})
export class AddKidModal implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
