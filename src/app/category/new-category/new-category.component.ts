import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA,MdDialogRef} from '@angular/material';//如果想接受到open方法发送过来的数据就要引入这个令牌
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent implements OnInit {
  title:string='';
  form:FormGroup;
  coverImgs=[];
  constructor(
    @Inject(MD_DIALOG_DATA) private data, //使用穿过来的数据同时要注入这个东西
    private dialogRef:MdDialogRef<NewCategoryComponent>,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.coverImgs=this.data.thumbnails;
    if(this.data.category){
      this.form=this.fb.group({
        name:[this.data.category.name,Validators.required],
        description:[this.data.category.description],
        coverImg:[this.recoveImgSrc(this.data.category.coverImg)]
      });
    }else{
      this.form=this.fb.group({
        name:['',Validators.required],
        description:[],
        coverImg:[this.data.img]
      });

    }
    this.title=this.data.title;
   
  }

  onSubmit({value,valid},ev:Event){
    //this.dialogRef.close('I received button close your message');
    if(!valid){
      return;
    }
    console.log(value)
    this.dialogRef.close(value);
  }

  onFileSelect($event){
    //console.log($event);
    //const fm =new FormData();
    //fm.append('img', $event[0]);
    this.form.get('coverImg').patchValue($event[0]);
    //this.form.get('name').patchValue('你好吗');
    
  }

  private recoveImgSrc(img:string):string{
    return img.indexOf('.')>-1?img.split('.')[0]+'_tn.jpg':img;
  }

}
