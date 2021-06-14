import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {AframeComponent} from "./aframe.component";
import {ArtsResolverService} from "../main/gallery/arts-resolver.service";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AframeComponent,
    resolve: {arts: ArtsResolverService}
  }
];

@NgModule({
  declarations: [
    AframeComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AframeModule {}
