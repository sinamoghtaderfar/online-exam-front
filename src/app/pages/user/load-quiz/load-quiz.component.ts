import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId;
  quizzes;
  constructor(private _router:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar) { }

  ngOnInit(): void {

    this._router.params.subscribe((params)=>{
      // console.log(params);
      this.catId = params.catId;      
      if(this.catId == 0){
        console.log('load all the quiz');
        this._quiz.getActiveQuizzes().subscribe(
          (data)=>{
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            this._snack.open('Error in loading all quizzess','',{
              duration:3000,
            });
          });
      }else{
        console.log('load specific quiz');
        this._quiz.getQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error)=>{
            this._snack.open('Error in loading quiz','OK',{
              duration:8000
            });
          });
      }
    });
  }

}
