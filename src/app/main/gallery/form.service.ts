// @ts-nocheck
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {random_id} from '../../shared/utils';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Art} from '../../shared/art.model';
import {Constants} from '../../shared/constants.model';
import {GalleryService} from './gallery.service';
import {Subject} from "rxjs";
import {ResponseMessage} from "../../shared/response-message.interface";

@Injectable({providedIn: 'root'})
export class FormService {
  addArtForm: FormGroup;
  editArtForm: FormGroup;
  artToEdit: Art;
  responseMessage = new Subject<ResponseMessage>();
  setFormValue = new Subject<{}>();

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
    this.setFormValue.next({
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
        this.dataStorageService.storeArts().subscribe(() => this.successCallback(newArt), error => this.failureCallback(error));
        console.log('Art Added');
      });
  }

  updateArt(modifiedArt, image: File = null): void {
    let artToReplace: Art = this.galleryService.getArts().filter(art => art.position === modifiedArt.position)[0];
    let needToReplace = false;
    if (modifiedArt.position !== this.artToEdit.position && 'undefined' !== typeof artToReplace && modifiedArt.position === artToReplace.position) {
      artToReplace.position = this.artToEdit.position;
      needToReplace = true;
    }

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
            this.dataStorageService.storeArts().subscribe(() => {
              if (needToReplace) {
                this.galleryService.modifyArt(artToReplace, artToReplace);
                this.dataStorageService.storeArts().subscribe(() => this.successCallback(artToReplace, true), error => this.failureCallback(error))
              } else {
                this.successCallback(newArt)
              }
            }, error => this.failureCallback(error));
          });
        },
          error => {
            this.responseMessage.next({message: error.error.error.message, isError: true})}
        );
    } else {
      this.galleryService.modifyArt(this.artToEdit, newArt);
      this.dataStorageService.storeArts().subscribe(() => {
        if (needToReplace) {
          this.galleryService.modifyArt(artToReplace, artToReplace);
          this.dataStorageService.storeArts().subscribe(() => this.successCallback(artToReplace, true), error => this.failureCallback(error))
        } else {
          this.successCallback(newArt)
        }
      }, error => this.failureCallback(error));
    }
  }

  successCallback(newArt, replaced) {
    this.responseMessage.next({message: 'Success!', isError: false});
    if (!replaced) {
      this.setEditFormValues(newArt);
    }
  }

  failureCallback(error) {
    this.responseMessage.next({message: error.message, isError: true})
  }

  storeArt(newArt, needToReplace, artToReplace) {
    this.dataStorageService.storeArts().subscribe(() => {
      if (needToReplace) {
        this.galleryService.modifyArt(artToReplace, artToReplace);
        this.dataStorageService.storeArts().subscribe(() => this.successCallback(artToReplace, true), error => this.failureCallback(error))
      } else {
        this.successCallback(newArt)
      }
    }, error => this.failureCallback(error));
  }
}
