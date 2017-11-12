import { Component, OnInit, Input, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { cardAnim } from '../../anim/card.anim';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  animations:[
    cardAnim
  ],
})
export class CategoryItemComponent implements OnInit {

  @Input() item

  @HostBinding('@card') cardState='out';//绑定宿主的属性@card到变量cardState并赋值为out 相当于在父元素中绑定到属性
  
  @Output() onEdit=new EventEmitter<void>();
  @Output() onDel=new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }

  //监听宿主的事件
  @HostListener('mouseenter',['$event.target'])
  onMouseEnter(target){
    this.cardState='hover'
  }

  @HostListener('mouseleave',['$event.target'])
  onMouseOut(target){
    this.cardState='out'
  }

  onEditClick(){
    this.onEdit.emit();
  }

  onDelClick(){
    this.onDel.emit()
  }

}
