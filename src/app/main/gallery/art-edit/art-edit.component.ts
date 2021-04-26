// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../../shared/data-storage.service';
import {GalleryService} from '../gallery.service';
import {FormGroup} from '@angular/forms';
import {FormService} from '../form.service';

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css']
})
export class ArtEditComponent implements OnInit {
  editArtForm: FormGroup;
  image: File;

  constructor(private dataStorageService: DataStorageService, private galleryService: GalleryService, private formService: FormService) { }

  ngOnInit(): void {
    this.editArtForm = this.formService.editArtForm;
  }

  onSubmit() {
    const formValue = this.editArtForm.value;
    if (this.editArtForm.dirty && this.editArtForm.valid) {
      this.formService.updateArt(formValue, this.image);
    }
  }

  onFileChange(event) {
    this.image = <File> event.target.files[0];
  }

}
