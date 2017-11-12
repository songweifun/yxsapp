import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


 import { loadSvgResources } from '../utils/svg.util';
 import 'hammerjs';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports:[
    //此处要导出 要不只有在当前模块可以使用
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  providers:[
    {
      provide:"BASE_CONFIG",
      useValue:{
        uri:"http://localhost/after/bhyxs/yxsapi/public/api/v1"
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent:CoreModule,
    ir :MdIconRegistry,
    ds:DomSanitizer
  ){
    if(parent){
      throw new Error('核心模块已存在，不能再次加载')
     }
     loadSvgResources(ir,ds)

  }
 }
