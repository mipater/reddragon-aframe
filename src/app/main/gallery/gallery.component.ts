// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Art} from '../../shared/art.model';
import {GalleryService} from './gallery.service';
import {Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';
import {FormService} from './form.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  arts: Art[];
  room1_arts: Art[];
  room2_arts: Art[];
  room3_arts: Art[];
  room = 'room1'
  prevRoomSelected = '';
  art: Art;
  artIndex: number;
  artsChanged: Subscription;
  isLoading = false;
  error = false;

  constructor(private galleryService: GalleryService,
              private dataStorageService: DataStorageService,
              private formService: FormService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    const resolvedData: Art[] | string = this.route.snapshot.data.arts;
    if (Array.isArray(resolvedData)) {
      this.arts = resolvedData;
      this.isLoading = false;
      this.filterArtsByRoom();
    } else {
      this.error = true;
      this.isLoading = false;
    }

    this.artsChanged = this.galleryService.artsChanged
      .subscribe(
        (arts: Art[]) => {
          this.arts = arts;
          this.isLoading = false;
          this.error = false;
          this.filterArtsByRoom();
        }
      );
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.artsChanged.unsubscribe();
  }

  onViewArt(art: Art) {
    this.art = art;
  }

  onDeleteArt(i: number) {
    this.artIndex = i;
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

  onEditArt(art: Art) {
    this.art = art;
    this.formService.setEditFormValues(art);
  }

  filterArtsByRoom(): void {
    if (this.arts.length === 0) {
      return;
    }

    this.room1_arts = this.arts.filter(art => art.position.toLowerCase().substring(0, 2).indexOf('r1') > -1);
    this.room2_arts = this.arts.filter(art => art.position.toLowerCase().substring(0, 2).indexOf('r2') > -1);
    this.room3_arts = this.arts.filter(art => art.position.toLowerCase().substring(0, 2).indexOf('r3') > -1);

    if (this.room === 'room1') {
      this.arts = this.room1_arts;
    } else if (this.room === 'room2') {
      this.arts = this.room2_arts;
    } else if (this.room === 'room3') {
      this.arts = this.room3_arts;
    }
  }

  onRoomSelect(event) {
    let changed = this.prevRoomSelected !== event.target.id;

    if (changed) {
      if (event.target.id.toLowerCase().indexOf('room1') > -1) {
        this.arts = this.room1_arts;
        this.room = 'room1';
      } else if (event.target.id.toLowerCase().indexOf('room2') > -1) {
        this.arts = this.room2_arts;
        this.room = 'room2';
      } else if (event.target.id.toLowerCase().indexOf('room3') > -1) {
        this.arts = this.room3_arts;
        this.room = 'room3';
      }
    }
    this.prevRoomSelected = event.target.id;
  }
}
