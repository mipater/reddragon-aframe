// @ts-nocheck
import AFRAME from 'aframe';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Log {
  init(): void {
    AFRAME.registerComponent('log', {
      init: function() {
        console.log(this.el);
      },
    });
  }
}
