import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories =[];
  
  constructor(private _category:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(this.categories);
    }),
    (error)=>{
      console.log(error);
      Swal.fire('Error !!','error in loading data','error');
    }
  }
  // delete category
  deleteCategory(cid){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this Category?',
    }).then((result)=>{
      if(result.isConfirmed){
        this._category.deleteCategory(cid).subscribe(
          (data)=>{
            this._snack.open('Category Deleted','',{
              duration:3000,
            });
            this.categories = this.categories.filter((c)=>c.cid != cid);
          },
          (error)=>{
            this._snack.open('Error For this question category, it is not possible to delete','OK',{
              duration:8000,
            });
          console.log(error);
          });
        }
    });
  }
}
