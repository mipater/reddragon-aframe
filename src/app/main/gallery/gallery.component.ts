// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Art} from '../../shared/art.model';
import {GalleryService} from './gallery.service';
import {Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  arts: Art[];
  subscription: Subscription;
  isLoading = true;
  error = false;

  constructor(private galleryService: GalleryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: Art[] | string = this.route.snapshot.data.arts;
    if (Array.isArray(resolvedData)) {
      this.arts = resolvedData;
    } else {
      console.log(resolvedData)
      this.error = true;
    }

    this.subscription = this.galleryService.artsChanged
      .subscribe(
        (arts: Art[]) => {
          this.arts = arts;
        }
      );
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

//TODO: Pagination
