import { Component } from '@angular/core';
import { OverlayContainer} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme:boolean = false;
  
    squareState:string;
  
    constructor(
      private oc:OverlayContainer
    ){
    }
  
    switchTheme(event:boolean){
      //console.log(event)
      this.darkTheme=event
      this.oc.themeClass=event?'myapp-dark-theme':null //这个dark可以从主题中一步步弄进去
    }
}
