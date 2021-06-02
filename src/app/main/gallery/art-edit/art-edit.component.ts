// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {GalleryService, Positions} from '../gallery.service';
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
  setFormValueSub: Subscription;
  oldFormValue = {};
  isLoading = false;
  positions: Positions[];
  position_names: [] = [];

  constructor(private galleryService: GalleryService, private formService: FormService) { }

  ngOnInit(): void {
    this.editArtForm = this.formService.editArtForm;
    this.setFormValueSub = this.formService.setFormValue.subscribe(value => this.oldFormValue = value)
    this.updatePositions();
    this.positions.forEach(position => {
      let _pos = position.name.split('-')[0].trim();
      if (!this.position_names.includes(_pos)) {
        this.position_names.push(_pos);
      }
    });
    this.responseMessageSub = this.formService.responseMessage
      .subscribe(
        (resMessage: ResponseMessage) => {
          this.isLoading = false;
          this.responseMessage = resMessage;
          this.updatePositions();
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
    this.setFormValueSub.unsubscribe();
  }

  updatePositions() {
    this.positions = this.galleryService.getPositions();
  }

  onResetValues() {
    this.editArtForm.setValue(this.oldFormValue)
    console.log(this.oldFormValue)
  }
}
