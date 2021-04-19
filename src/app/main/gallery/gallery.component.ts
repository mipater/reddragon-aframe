import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  cards = [1,2,3,4,5,6];

  constructor() {
  }

  ngOnInit(): void {
  }

}

//TODO: Pagination
