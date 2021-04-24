// @ts-nocheck
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {random_id} from '../../shared/utils';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Art} from '../../shared/art.model';
import {Constants} from '../../shared/constants.model';
import {GalleryService} from './gallery.service';

@Injectable({providedIn: 'root'})
export class FormService {
  form: FormGroup;

  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService) {
    this.form = new FormGroup({
      'title': new FormControl(null,  [Validators.required]),
      'description': new FormControl(null,  [Validators.required]),
      'image': new FormControl(null,  [Validators.required]),
      'dimensions': new FormGroup({
        'width': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
        'height': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
      }),
      'author': new FormControl(null,  [Validators.required])
    });
  }

  submitNewArt(formValue, image){
    this.dataStorageService
      .uploadImage(image)
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

  updateArt(formValue, image) {

  }

}
