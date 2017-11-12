import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
     { path: '', redirectTo:'/login',pathMatch:'full' },
     //{ path: '', loadChildren: './login/login.module#LoginModule' },
     { path: 'category', redirectTo:'/category',pathMatch:'full' },
    //  { path: 'tasklists', redirectTo:'/tasklists',pathMatch:'full' },
    
    
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}