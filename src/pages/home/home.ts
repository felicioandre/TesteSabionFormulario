import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FormBusinessCardPage } from './../form-business-card/form-business-card';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onCreateBusinessCard():void{
    this.navCtrl.push(FormBusinessCardPage);
  }

}
