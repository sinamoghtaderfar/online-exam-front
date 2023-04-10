import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private _userService: UserService, private _snack: MatSnackBar,private _router:Router) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required !!');
      this._snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this._snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //validate

    //addUser: userservice
    this._userService.addUser(this.user).subscribe(
      (data: any) => {
        //if success

        // console.log(data);
        //alert('success');
        this.user.email='';
        this.user.firstName='';
        this.user.lastName='';
        this.user.password='';
        this.user.phone='';
        this.user.username='';
        Swal.fire('Success !!', 'Your registration was successfully', 'success').then((e)=>{
          this._router.navigate(['/login']);
        });
      },
      (error) => {
        //if error
        // console.log(error);
        this._snack.open("Server error !!","", {
          duration: 3000,
        });
      }
    );
  }

  //this.user
}
