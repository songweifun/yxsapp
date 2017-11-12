import{ trigger,stagger,transition,style,animate,query} from '@angular/animations';

export const listAnimation=trigger(
    'listAnim',
    [
        
        transition('*=>*',[
            query(':enter',style({opacity:0}),{ optional: true }),//进场的子节点隐藏
            query(':enter',stagger(100,[
                animate('1s',style({opacity:1}))
            ]),{ optional: true }), //所有的子节点间隔1s相继变化
            query(':leave',style({opacity:1}),{ optional: true }),//进场的子节点隐藏
            query(':leave',stagger(100,[
                animate('1s',style({opacity:0}))
            ]),{ optional: true })
        ]),

        
        
    ]
)