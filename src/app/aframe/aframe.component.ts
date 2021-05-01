import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AframeService} from './aframe.service';
import {Art} from '../shared/art.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-aframe',
  templateUrl: './aframe.component.html',
  styleUrls: ['./aframe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AframeComponent implements OnInit {
  error = false;

  constructor(private aframeService: AframeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: Art[] | string = this.route.snapshot.data.arts;
    if (Array.isArray(resolvedData)) {
      this.aframeService.setArts(resolvedData);
    } else {
      this.error = true;
    }

    this.aframeService.registerSystems(['data-manager']);
    this.aframeService.registerComponents(['log', 'info-panel', 'load-art']);
  }

}
