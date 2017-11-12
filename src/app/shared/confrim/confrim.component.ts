import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confrim',
  template: `
  <form action="">
  <h3 md-dialog-title>{{title}}</h3> 
  <md-dialog-content> 
    {{content}}
  </md-dialog-content>
  <md-dialog-actions>
    <button type="button" md-raised-button color="primary" (click)="onClick(true)" >确定</button>
    <button type="button" md-button md-dialog-close (click)="onClick(false)">取消</button>
  </md-dialog-actions>
</form>

  `,
  styles: []
})
export class ConfrimComponent implements OnInit {
  title:string;
  content:string;

  constructor(
    @Inject(MD_DIALOG_DATA) private data, //使用穿过来的数据同时要注入这个东西
    private dialogRef:MdDialogRef<ConfrimComponent>,
  ) { }

  ngOnInit() {
    this.title=this.data.title
    this.content=this.data.content
  }
  onClick(event:boolean){
    this.dialogRef.close(event)
  }

}
