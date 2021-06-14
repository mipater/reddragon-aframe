import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GalleryComponent} from "./gallery.component";
import {ArtsResolverService} from "./arts-resolver.service";
import {AuthGuard} from "../auth/auth.guard";
import {CommonModule} from "@angular/common";
import {ArtEditComponent} from "./art-edit/art-edit.component";
import {AddArtComponent} from "./add-art/add-art.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    canActivate: [AuthGuard],
    resolve: {arts: ArtsResolverService}
  }
];

@NgModule({
  declarations: [
    GalleryComponent,
    ArtEditComponent,
    AddArtComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GalleryModule {}
