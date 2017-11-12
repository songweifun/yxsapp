import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,NG_VALIDATORS, FormControl } from '@angular/forms'; //表单控价要实现的接口


@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      //把自己注册到token
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ImageListSelectComponent),//等待实例化后放入
      multi:true //一个令牌对应多个组件
    },
    {
      //把自己注册到validtaors令牌就可以支持验证了
      provide: NG_VALIDATORS,
      useExisting:forwardRef(()=>ImageListSelectComponent),//等待实例化后放入 注意这里是一个回调
      multi:true //一个令牌对应多个组件
    }
  ]
})
export class ImageListSelectComponent implements OnInit {

  @Input() title:string="选择";
  @Input() cols:number=6;
  @Input() rowHeight:string='64px';
  @Input() items:Array<string>=[];
  @Input() useSvgIcon:boolean=false;//既能处理图片又能处理svgicon
  @Input() itemWidth:string='80px';//图片宽度

  selected:string
  
    private propagateChange=(_:any)=>{} //空的函数体用于接收第二个函数的回调

  constructor() { }

  ngOnInit() {
  }

  onChange(i){
    this.selected=this.items[i];
    this.propagateChange(this.selected);//变化的时候通知表单
  }

  //接口的三个要实现的方法
  writeValue(obj: any): void{
    //设置表单控件的值
    this.selected=obj;

  }

  registerOnChange(fn: any): void{
    //通过回调函数来通知表单控件发生了变化
    this.propagateChange=fn

  }

  registerOnTouched(fn: any): void{}

  //自定义一个验证器
  validate(c:FormControl):{[key:string]:any}{
    return this.selected?null:{
      imageListInvalid:{
        valid:false
      }
    };
  }

}
