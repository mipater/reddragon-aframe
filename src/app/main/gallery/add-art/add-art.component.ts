// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';
import {ResponseMessage} from "../../../shared/response-message.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {
  addArtForm: FormGroup;
  image: File = null;
  responseMessage: ResponseMessage;
  responseMessageSub: Subscription;
  isLoading = false;

  constructor(private dataStorageService: DataStorageService, private formService: FormService) { }

  ngOnInit(): void {
    this.addArtForm = this.formService.addArtForm;
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
    const formValue = this.addArtForm.value;
    if (this.image) {
      this.formService.submitNewArt(formValue, this.image);
    }
    this.addArtForm.reset();
  }

  onFileChange(event) {
    this.image = <File> event.target.files[0];
  }
}
