import {Component} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  showTheQuestionnaire = false;
  personalQuestions: string[];
  wouldYouRatherQuestions: string[];

  constructor() {
    this.personalQuestions = [
      'question1',
      'question2',
      'question3',
      'question4',
      'question5'
    ];
    this.wouldYouRatherQuestions = [
      'wyr1',
      'wyr2',
      'wyr3',
      'wyr4',
      'wyr5',
      'wyr6',
      'wyr7',
    ];
  }

}
