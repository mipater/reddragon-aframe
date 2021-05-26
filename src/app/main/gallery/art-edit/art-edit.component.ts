// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {GalleryService} from '../gallery.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';
import {ResponseMessage} from "../../../shared/response-message.interface";
import {getExtension, isImage} from "../../../shared/utils";

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css']
})
export class ArtEditComponent implements OnInit {
  editArtForm: FormGroup;
  file: File;
  responseMessage: ResponseMessage = {};

  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService, private formService: FormService) { }

  ngOnInit(): void {
    this.editArtForm = this.formService.editArtForm;
  }

  onSubmit() {
    const formValue = this.editArtForm.value;

    if (this.editArtForm.dirty && this.editArtForm.valid) {
      if (this.file && !isImage(this.file.name)){
        this.responseMessage = {message: `Filetype ${getExtension(this.file.name)} is not supported`, isError: true};
        return;
      }
      this.responseMessage = this.formService.updateArt(formValue, this.file);
      console.log(this.responseMessage)
    }
  }

  onFileChange(event) {
    this.file = <File> event.target.files[0];
  }

}
