import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewCategoryComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ViewCategoryComponent],
  entryComponents: [ViewCategoryComponent]
})
export class SharedModule { }
