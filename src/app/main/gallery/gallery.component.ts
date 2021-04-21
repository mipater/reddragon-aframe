// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Art} from '../../shared/art.model';
import {GalleryService} from './gallery.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  cards = [1,2,3,4,5,6];
  arts: Art[];
  subscription: Subscription;

  constructor(private galleryService: GalleryService) {
    this.subscription = this.galleryService.artsChanged
      .subscribe(
        (arts: Art[]) => {
          this.arts = arts;
        }
      );
    this.arts = this.galleryService.getArts();
    console.log(this.arts);
  }

  ngOnInit(): void {
    this.subscription = this.galleryService.artsChanged
      .subscribe(
        (arts: Art[]) => {
          this.arts = arts;
        }
      );
    this.arts = this.galleryService.getArts();
    console.log(this.arts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

//TODO: Pagination
