import { Injectable,Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable'
import { Category } from '../domain';



@Injectable()
export class CategoryService {
    private readonly domain="category";
    private headers=new Headers({
        'Content-Type':'application/json'
    });
    constructor(
        private http:Http,
        @Inject('BASE_CONFIG') private config
    ){

    }

    //增加 post
    add(category:Category):Observable<Category>{
        //console.log(category);
        category.id=null;
        const uri=`${this.config.uri}/${this.domain}/add`;

        //const fm=new FormData();
        // fm.append('name',category.name);
        // fm.append('description',category.description);
        // fm.append('coverImg',category.coverImg);
        // const headers=new Headers({
        //     'Content-Type': undefined //这个必须的
        // });
        return this.http
            .post(uri,category,{headers:this.headers})
            .map(res=>res.json())

    }

    //更新 put
    update(category:Category):Observable<Category>{
        const uri=`${this.config.uri}/${this.domain}/update/${category.id}`;
        const toUpdate={
            name:category.name,
            description:category.description,
            coverImg:category.coverImg
        }
        return this.http
            .patch(uri,JSON.stringify(toUpdate),{headers:this.headers})
            .map(res=>res.json())

    }

    //删除 delete
    del(category:Category):Observable<Category>{
        // const delTasks$=Observable.from(category.taskLists)
        //     .mergeMap(listId=>this.http.delete(`${this.config.uri}/taskLists/${listId}`)) //这步级联删除task
        //     .count();

        // return delTasks$.switchMap(_=>this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
        //     .mapTo(project);//直接把输入的Obserable返回出去 .map(_=>project);/
        const uri=`${this.config.uri}/${this.domain}/delete/${category.id}`;
        return this.http
        .delete(uri,{headers:this.headers})
        .map(res=>res.json())

    }

    //取得列表 get
    get():Observable<Category[]>{
        const uri=`${this.config.uri}/${this.domain}/all`;
        return this.http
            .get(uri)
            .map(res=>res.json() as Category[]);

    }
}