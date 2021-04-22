// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GalleryService} from '../gallery.service';
import {Art} from '../../../shared/art.model';
import {random_id} from '../../../shared/utils';
import { Constants } from '../../../shared/constants.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {
  addArtForm: FormGroup;
  image: File = null;

  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.addArtForm = new FormGroup({
      'title': new FormControl(null,  [Validators.required]),
      'description': new FormControl(null,  [Validators.required]),
      'image': new FormControl(null,  [Validators.required]),
      'dimensions': new FormGroup({
        'width': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
        'height': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
      }),
      'author': new FormControl(null,  [Validators.required])
    })
  }

  onSubmit() {
    const formValue = this.addArtForm.value;
    if (this.image) {
      this.dataStorageService
        .uploadImage(this.image)
        .subscribe(image => {
          const newArt: Art = new Art(
            random_id(),
            formValue.title,
            formValue.description,
            Constants.FB_STORAGE_PATH + image.name + '?alt=media',
            {
              width: formValue.dimensions.width,
              height: formValue.dimensions.height,
            },
            formValue.author
          );
          this.galleryService.addArt(newArt);
          this.dataStorageService.storeArts();
          console.log('Art Added');
        });
    }
    this.addArtForm.reset();
  }

  onFileChange(event) {
    this.image = <File> event.target.files[0];
  }
}
