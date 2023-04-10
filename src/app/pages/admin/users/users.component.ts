import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = null;
  uId;
  constructor(private _snack:MatSnackBar ,private _users:UserService) { }

  ngOnInit(): void {
    this._users.allUser().subscribe(
      (data:any)=>{
        this.users = data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
      });
  }
    // delete user
    deleteUser(id){
      // this.uId = this._route.snapshot.params.id;
      this.uId = id;
      if(this.uId == 1){
        this._snack.open('Error this user, it is not Normal user','OK',{
          duration:8000,
        });
        return;
      }
      Swal.fire({
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'Delete',
        title:'Are you sure, want to delete this user?',
      }).then((result)=>{
        if(result.isConfirmed){
          this._users.deleteUserById(this.uId).subscribe(
            (data)=>{
              this._snack.open('User Deleted','',{
                duration:3000,
              });
              this.users = this.users.filter((u)=>u.id != id);
            },
            (error)=>{
              this._snack.open('Error For this user, it is not possible to delete','OK',{
                duration:8000,
              });
            console.log(error);
            });
          }
      });
    }
}
