import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentManagementModule { }
