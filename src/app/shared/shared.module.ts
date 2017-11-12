import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MdSidenavModule,
  MdIconModule,
  MdToolbarModule,
  MdSlideToggleModule,
  MdButtonModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdGridListModule,
  MdDialogModule,
  
  
} from '@angular/material';
import { ConfrimComponent } from './confrim/confrim.component';
import { InputFileComponent } from './input-file/input-file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from '_ng2-file-upload@1.2.1@ng2-file-upload';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdSlideToggleModule,
    MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdGridListModule,
    MdDialogModule,
    FileUploadModule
    
  
  ],
  declarations: [
    ConfrimComponent,
    InputFileComponent,
    FileUploadComponent,
    ImageListSelectComponent,

  ],
  exports:[
    CommonModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdSlideToggleModule,
    MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdGridListModule,
    MdDialogModule,
    InputFileComponent,
    FileUploadComponent,
    FileUploadModule,
    ImageListSelectComponent,
    
    
    
    
  ],
  entryComponents:[
    ConfrimComponent
  ]
})
export class SharedModule { }
