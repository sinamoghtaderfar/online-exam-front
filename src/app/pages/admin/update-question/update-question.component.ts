import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private _route: ActivatedRoute, private _question: QuestionService,private _location: Location, private _snack:MatSnackBar) { }
  qId;
  quesId = 0;
  question;
  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;
    this._question.getQuestion(this.quesId).subscribe((data: any) => {
      this.question = data;
      console.log(this.question);
    },
    (error)=>{
      console.log(error);
    });
  }
// cal update function from category service...
public updateData(){
  // validations
  if (this.question.content == '' || this.question.content == null) {
    // alert('User is required !!');
    this._snack.open('Content field is required !! ', '', {
      duration: 3000,
    });
    return;
  }
  if (this.question.answer == '' || this.question.answer == null) {
    // alert('User is required !!');
    this._snack.open('Answer field is required !! ', '', {
      duration: 3000,
    });
    return;
  }
  this._question.updateQuestion(this.question).subscribe(
    (data)=>{
      Swal.fire('Success','Question is successfuly update','success').then((e)=>{
        this._location.back();
      });
    },
    (error)=>{
      Swal.fire('Error !!','error in updating question','error');
      console.log(error);
    }
  );
}
}
