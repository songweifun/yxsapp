import { NgModule,ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';
import { CategoryService } from './category.service';
//如果要根据不同的条件初始化ngModule的元数据可以不写元数据中在类中定义工厂方法并返回 forRoot等这样使用 然后在coremodule中导入
@NgModule()
export class ServicesModule { 
  static forRoot():ModuleWithProviders{
    return {
      ngModule:ServicesModule,
      providers:[
        QuoteService,
        CategoryService
      ]
    }
  }
}
