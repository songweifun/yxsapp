import { Component, OnInit, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { slideToRight } from '../../anim/router.anim';
import { listAnimation } from '../../anim/list.anim';

import { MdDialog } from '@angular/material';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { ConfrimComponent } from '../../shared/confrim/confrim.component';
import { CategoryService } from '../../services/category.service';
import * as _ from 'lodash';
import { Category } from '../../domain';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations:[
    slideToRight,
    listAnimation
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

  @HostBinding('@routeAnim') state
  categories;
  // categories=[
  //   {
  //     "id":"1",
  //     "name":"科研数据中心",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/0.jpg",
  //     "members":["1","2"]
  //   },
  //   {
  //     "id":"2",
  //     "name":"软件系统",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/1.jpg",
  //     "members":["1"]
  //   },
  //   {
  //     "id":"3",
  //     "name":"新兴产业人才库",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/2.jpg",
  //     "members":["1","2"]
  //   },
  //   {
  //     "id":"4",
  //     "name":"科研人才分析",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/3.jpg",
  //     "members":["1"]
  //   },
  //   {
  //     "id":"5",
  //     "name":"学科资源库",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/4.jpg",
  //     "members":["1","2"]
  //   },
  //   {
  //     "id":"6",
  //     "name":"资源发现",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/5.jpg",
  //     "members":["1"]
  //   },
  //   {
  //     "id":"7",
  //     "name":"SCIVIEW",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/6.jpg",
  //     "members":["1","2"]
  //   },
  //   {
  //     "id":"8",
  //     "name":"党建资源库",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/7.jpg",
  //     "members":["1"]
  //   },
  //   {
  //     "id":"9",
  //     "name":"TS",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/8.jpg",
  //     "members":["1","2"]
  //   },
  //   {
  //     "id":"10",
  //     "name":"机构知识库",
  //     "description":"这是一个企业内部项目",
  //     "coverImg":"assets/img/covers/9.jpg",
  //     "members":["1"]
  //   },
    
  // ]

  constructor(
    private dialog:MdDialog,//注入MdDialog服务
    private cd:ChangeDetectorRef,
    private categoryService$:CategoryService
    
  ) { }

  ngOnInit() {
    this.categoryService$.get()
      .subscribe(categories=>{
        this.categories=categories;
        this.cd.markForCheck();//脏值检测
      });
    
  }

  launchEditDialog(category:Category){
    //alert(2222)
    const dialogRef=this.dialog.open(NewCategoryComponent,{data:{title:'编辑分类',category:category,thumbnails:this.getThumbnails()}});//用这个服务打开一个组件或者模板
    

    ////filter后确保流流里面有值，来区分直接关闭还是保存 一般不做subscrbe的subscribe 用合并流的方式处理
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .map(val=>({...val,id:category.id,coverImg:this.buildImgSrc(val.coverImg)})) //做一个转换有缩略图变为去不缩略的 另外模型中是没有id的
      .switchMap(v=>this.categoryService$.update(v))
      .subscribe(category=>{
        const index=this.categories.map(category=>category.id).indexOf(category.id);
        this.categories=[...this.categories.slice(0,index),category,...this.categories.slice(index+1)];
        this.cd.markForCheck();
      })
  }

  launchConfirmDialog(category:Category){
    const dialogRef=this.dialog.open(ConfrimComponent,{data:{title:'删除项目',content:'您确定要删除此项目吗?'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .switchMap(_=>this.categoryService$.del(category))
      .subscribe(
        cate=>{
          this.categories=this.categories.filter(p=>p.id!==cate.id);
          this.cd.markForCheck()
        }
    )
  }

  openNewProjectDialog(){
    const selectedImg=`/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`
    const dialogRef=this.dialog.open(NewCategoryComponent,{data:{title:'添加分类',thumbnails:this.getThumbnails(),img:selectedImg}});//用这个服务打开一个组件或者模板
    //第二个参数可以传递宽高等 {width:'100px',height:'100px'} 改变大小 {position:{left:0,top:0}}也可以传递data


    ////filter后确保流流里面有值，来区分直接关闭还是保存 一般不做subscrbe的subscribe 用合并流的方式处理
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .map(val=>({...val,coverImg:this.buildImgSrc(val.coverImg)})) //做一个转换有缩略图变为去不缩略的
      .switchMap(v=>this.categoryService$.add(v))
      .subscribe(project=>{
        this.categories=[...this.categories,project]; //界面上的
        this.cd.markForCheck();
      })
    // .subscribe( 
    //   data=>{
    //     // console.log(data);
    //     //this.categories=[...this.categories,{'id':"11",'name':"TOWNINDEX","description":"这是一个大型项目","coverImg":"assets/img/covers/10.jpg","members":["3"]}];
    //     // if(data){
    //     //   this.categoryService$.add(data).subscribe(category=>{
    //     //     //this.categories=[...this.categories,data];
    //     //   })
    //     this.categoryService$.add(data);

    //     // }
        
        
    //     // this.cd.markForCheck()
    //   }
    // )
  }

  private getThumbnails(){
    return _.range(0,40).map(i=>`/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img:string):string{
    return img.indexOf('_')>-1?img.split('_')[0]+'.jpg':img;
  }

  

}
