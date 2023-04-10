import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private _loationSt:LocationStrategy, private _route:ActivatedRoute,private _question:QuestionService) { }
  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false; 

  timer : any;

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    // console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        // console.log(this.questions.length);
        this.questions.forEach(q=>{
          q['givenAnswer'] = ''
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        // console.log(error);
        Swal.fire('Error !!','Error in loading questions of quiz','error');
      }
    );
  }
  preventBackButton(){
    history.pushState(null,null,location.href);
    this._loationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    });
  }
  
  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'submit',
      icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        this.evalQuiz();
      }
    });
  }
  startTimer(){
    let t:any = window.setInterval(()=>{
      if(this.timer <= 0 ){
        this.marksGot = 0;
        this.correctAnswers = 0;
        this.attempted = 0;
        this.isSubmit = true;        
        clearInterval(t);
      }else{
        this.timer -- ;
      }
    },1000);
  }
  getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm *60;
    return `${mm} min : ${ss} sec`
  }

  evalQuiz(){

    //call to server to check questions
    this._question.evalquiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error)=>{
        console.log(error);
        
      }
    );
    // // calculation
    // this.questions.forEach(q=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswers ++
    //     let marksSingel = this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksSingel;
    //   }
    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted ++;
    //   }
      
    // });

    // console.log("Corrent Answers :" + this.correctAnswers);
    // console.log("Marks Got :" + this.marksGot);
    // console.log("attempted :" + this.attempted);
    // console.log(this.questions);
    
  }

  printPage(){
    window.print();
  }
}
