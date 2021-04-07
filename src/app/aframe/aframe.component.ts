import { Component, OnInit } from '@angular/core';
import {AframeService} from './aframe.service';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css']
})
export class AframeComponent implements OnInit {

  constructor(private aframeService: AframeService) {
    aframeService.registerSystems(['data-manager']);
    aframeService.registerComponents(['log', 'info-panel', 'load-art']);
  }

  ngOnInit(): void {
  }

}
