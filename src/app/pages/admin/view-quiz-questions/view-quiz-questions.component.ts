import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId;
  qTitle;
  questions ;
  constructor(private _route:ActivatedRoute, private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data)=>{
        console.log(data);
        this.questions = data;
        // this.questions.push(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  // delete questions
//  .then((result)=>{
//     if(result.isConfirmed){
//       this._quiz.deleteQuiz(qId).subscribe(
//         (data)=>{
//           this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != qId)
//           Swal.fire("Success","Quiz successfuly deleted","success");
//         },
//         (error)=>{
//           Swal.fire("Error","Error in deleting quiz","error");
//         });
//     }
//   })
  deleteQuestion(qid){
    console.log(qid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question?',
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            this._snack.open('Question Deleted','',{
              duration:3000,
            });
            this.questions = this.questions.filter((q)=>q.quesId != qid);
          },
          (error)=>{
            this._snack.open('Error in delete question','',{
              duration:3000,
            });
          console.log(error);
          });
        }
    });
  }
}
