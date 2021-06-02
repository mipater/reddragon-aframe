// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';
import {ResponseMessage} from "../../../shared/response-message.interface";
import {Subscription} from "rxjs";
import {GalleryService, Positions} from "../gallery.service";

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit, OnDestroy {
  addArtForm: FormGroup;
  image: File = null;
  responseMessage: ResponseMessage;
  responseMessageSub: Subscription;
  isLoading = false;
  positions: Positions[];
  position_names: [] = [];

  constructor(private galleryService: GalleryService, private dataStorageService: DataStorageService, private formService: FormService) { }

  ngOnInit(): void {
    this.addArtForm = this.formService.addArtForm;
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
    const formValue = this.addArtForm.value;
    if (this.image) {
      this.formService.submitNewArt(formValue, this.image);
    }
    this.addArtForm.reset();
  }

  onFileChange(event) {
    this.image = <File> event.target.files[0];
  }

  ngOnDestroy() {
    this.responseMessageSub.unsubscribe();
  }

  updatePositions() {
    this.positions = this.galleryService.getPositions();
  }

  onResetValues() {
    this.addArtForm.reset();
  }
}
