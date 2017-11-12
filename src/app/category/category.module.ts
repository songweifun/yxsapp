import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoryRoutingModule } from './category.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CategoryRoutingModule,
    SharedModule
  ],
  declarations: [
    CategoryListComponent, 
    CategoryItemComponent,
    NewCategoryComponent
    ],
    entryComponents:[
      //对话框要出现在这里
      NewCategoryComponent,
    ]
})
export class CategoryModule { }
