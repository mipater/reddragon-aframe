// @ts-nocheck
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {random_id} from '../../shared/utils';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Art} from '../../shared/art.model';
import {Constants} from '../../shared/constants.model';
import {GalleryService} from './gallery.service';
import {Observable} from "rxjs";
import {ResponseMessage} from "../../shared/response-message.interface";

@Injectable({providedIn: 'root'})
export class FormService {
  addArtForm: FormGroup;
  editArtForm: FormGroup;
  artToEdit: Art;

  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService) {
    this.addArtForm = new FormGroup({
      'title': new FormControl(null,  [Validators.required]),
      'description': new FormControl(null,  [Validators.required]),
      'image': new FormControl(null,  [Validators.required]),
      'dimensions': new FormGroup({
        'width': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
        'height': new FormControl(null,  [Validators.required, Validators.min(0.1), Validators.max(6)]),
      }),
      'position': new FormControl(null, [Validators.required]),
      'author': new FormControl(null,  [Validators.required])
    });
    this.editArtForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'image': new FormControl(null),
      'dimensions': new FormGroup({
        'width': new FormControl(null,  [Validators.min(0.1), Validators.max(6)]),
        'height': new FormControl(null,  [Validators.min(0.1), Validators.max(6)]),
      }),
      'position': new FormControl(null),
      'author': new FormControl(null)
    });
  }

  setEditFormValues(art: Art): void {
    this.artToEdit = art;
    this.editArtForm.setValue({
      'title': art.title,
      'description': art.description,
      'image': null,
      'dimensions': {
        'width': art.dimensions.width,
        'height': art.dimensions.height
      },
      'position': art.position,
      'author': art.author
    })
  }

  submitNewArt(formValue, image):void {
    this.dataStorageService
      .uploadImage(image)
      .subscribe(image => {
        const newArt: Art = new Art(
          random_id(),
          formValue.position,
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

  updateArt(modifiedArt, image: File = null): ResponseMessage {
    console.log(image);
    const newArt: Art = new Art(
      this.artToEdit.id,
      modifiedArt.position || this.artToEdit.position,
      modifiedArt.title || this.artToEdit.title,
      modifiedArt.description || this.artToEdit.description,
      image ? Constants.FB_STORAGE_PATH + image.name + '?alt=media' : this.artToEdit.imgSrc,
      modifiedArt.dimensions || this.artToEdit.dimensions,
      modifiedArt.author || this.artToEdit.author
    )

    if (image) {
      this.dataStorageService.deleteImage(this.artToEdit.imgSrc)
        .subscribe(() => {
          this.dataStorageService.uploadImage(image).subscribe(() => {
            this.galleryService.modifyArt(this.artToEdit, newArt);
            this.dataStorageService.storeArts().subscribe(
              () => {return {message: 'Success!', isError: false}},
              error => {return {message: error.message, isError: true}}
            );
          });
        });
    } else {
      this.galleryService.modifyArt(this.artToEdit, newArt);
      this.dataStorageService.storeArts().subscribe(
        () => {return {message: 'Success!', isError: false}},
        error => {return {message: error.message, isError: true}}
      );
    }
  }

}
