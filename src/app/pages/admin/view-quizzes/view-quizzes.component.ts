import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[];
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes = data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Error server","error");
        
      }
    );
  }
  //delete quiz 
  deleteQuiz(qId){
    // alert(qId);
    //cal function from quiz service
    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != qId)
            Swal.fire("Success","Quiz successfuly deleted","success");
          },
          (error)=>{
            Swal.fire("Error","Error in deleting quiz","error");
          }
        );
      }
    })
  }

}
