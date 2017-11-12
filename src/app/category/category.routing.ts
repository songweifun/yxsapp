import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
    { path: 'category', component: CategoryListComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {}
