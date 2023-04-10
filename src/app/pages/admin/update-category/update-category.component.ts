import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _category: CategoryService,private _router:Router, private _snack:MatSnackBar) { }
  cId = 0;
  category;
  ngOnInit(): void {
    this.cId = this._route.snapshot.params.cid;
    this._category.getCategory(this.cId).subscribe((data: any) => {
      this.category = data;
      console.log(this.category);
    },
    (error)=>{
      console.log(error);
    });
  }
// cal update function from category service...
public updateData(){
  // validations
  if (this.category.title == '' || this.category.title == null) {
    // alert('User is required !!');
    this._snack.open('Title field is required !! ', '', {
      duration: 3000,
    });
    return;
  }
  if (this.category.description == '' || this.category.description == null) {
    // alert('User is required !!');
    this._snack.open('Description field is required !! ', '', {
      duration: 3000,
    });
    return;
  }
  this._category.updateCategory(this.category).subscribe(
    (data)=>{
      Swal.fire('Success','Category is successfuly update','success').then((e)=>{
        this._router.navigate(['/admin/categpries']);
      });
    },
    (error)=>{
      Swal.fire('Error !!','error in updating category','error');
      console.log(error);
    }
  );
}
}
