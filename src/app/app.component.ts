import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TestYourself';
  constructor(private ngxService: NgxUiLoaderService) {}
  ngOnInit() {
    this.ngxService.start(); 
    setTimeout(() => {
      this.ngxService.stop(); 
    }, 4000);
    this.ngxService.startBackground("do-background-things");
    this.ngxService.stopBackground("do-background-things");
    this.ngxService.startLoader("loader-01");
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); 
    }, 4000);
  }
}
