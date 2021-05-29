// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {GalleryService} from '../gallery.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';
import {ResponseMessage} from "../../../shared/response-message.interface";
import {getExtension, isImage} from "../../../shared/utils";
import {Subscription} from "rxjs";
import {Art} from "../../../shared/art.model";

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css']
})
export class ArtEditComponent implements OnInit, OnDestroy {
  editArtForm: FormGroup;
  file: File;
  responseMessage: ResponseMessage;
  responseMessageSub: Subscription;
  isLoading = false;

  constructor(private galleryService: GalleryService, private formService: FormService) { }

  ngOnInit(): void {
    this.editArtForm = this.formService.editArtForm;
    this.responseMessageSub = this.formService.responseMessage
      .subscribe(
        (resMessage: ResponseMessage) => {
          this.isLoading = false;
          this.responseMessage = resMessage;
          setTimeout(() => {
            this.responseMessage = null;
          }, 2000)
        }
      );
  }

  onSubmit() {
    this.isLoading = true;
    const formValue = this.editArtForm.value;

    if (this.editArtForm.dirty && this.editArtForm.valid) {
      if (this.file && !isImage(this.file.name)) {
        this.responseMessage = {message: `Filetype ${getExtension(this.file.name)} is not supported`, isError: true};
        this.isLoading = false;
        return;
      }
      this.formService.updateArt(formValue, this.file);
      this.isLoading = false;
    }
  }

  onFileChange(event) {
    this.file = <File> event.target.files[0];
  }

  ngOnDestroy() {
    this.responseMessageSub.unsubscribe();
  }

}
