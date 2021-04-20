import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onAddArt() {
    this.dataStorageService.storeArts();
  }

  onLoadArt() {
    this.dataStorageService.fetchArts();
  }
}
