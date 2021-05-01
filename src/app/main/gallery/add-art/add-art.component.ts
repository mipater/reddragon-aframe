// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {
  addArtForm: FormGroup;
  image: File = null;

  constructor(private dataStorageService: DataStorageService, private formService: FormService) { }

  ngOnInit(): void {
    this.addArtForm = this.formService.addArtForm;
  }

  onSubmit() {
    console.log(this.addArtForm.value);
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
