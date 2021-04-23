// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Art} from '../../shared/art.model';
import {GalleryService} from './gallery.service';
import {Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  arts: Art[];
  art: Art;
  artIndex: number;
  subscription: Subscription;
  isLoading = true;
  error = false;

  constructor(private galleryService: GalleryService, private dataStorageService: DataStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: Art[] | string = this.route.snapshot.data.arts;
    if (Array.isArray(resolvedData)) {
      this.arts = resolvedData;
    } else {
      this.error = true;
    }

    this.subscription = this.galleryService.artsChanged
      .subscribe(
        (arts: Art[]) => {
          this.arts = arts;
          this.isLoading = false;
          this.error = false;
        }
      );
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onViewArt(art: Art) {
    this.art = art;
  }

  onDeleteArt(index: number) {
    this.artIndex = index;
  }

  deleteArt() {
    if (this.artIndex > -1) {
      const artoToDelete: Art = this.arts[this.artIndex];
      this.arts.splice(this.artIndex, 1);
      this.dataStorageService
        .deleteImage(artoToDelete.imgSrc)
        .subscribe();
      this.galleryService.setArts(this.arts);
      this.dataStorageService.storeArts();
    }
  }

  isGalleryReady(): boolean {
    return !this.isLoading && !this.error && this.arts.length > 0;
  }
}
