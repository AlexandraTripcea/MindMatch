import {Component, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DivcontrolComponent} from '../divcontrol/divcontrol.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  private tempResponseBuilder = [];
  private responseValidation1 = true;
  private responseValidation2 = true;
  private formPosition = 0;
  private finalResponse = [];
  showTheQuestionnaire = false;
  personalQuestions = [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5'
  ];
  private personalQuestionnaireGroup: FormGroup[] = Array(this.personalQuestions.length);

  wouldYouRatherQuestions = [
    'wyr1',
    'wyr2',
    'wyr3',
    'wyr4',
    'wyr5',
    'wyr6',
    'wyr7',
  ];
  possibleAnswersPersQues = ['A', 'B', 'C', 'D'];

  // personalQuestionnaireGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    let i: number;
    for (i = 0; i < this.personalQuestions.length; ++i) {
      this.personalQuestionnaireGroup[i] = this.fb.group({
        question: this.personalQuestions[i],
        answers: this.mapPossibleAnswersPersQues()
      });
    }
  }

  mapPossibleAnswersPersQues() {
    const answerArr = this.possibleAnswersPersQues.map(answer => {
      return this.fb.control('false');
    });
    return this.fb.array(answerArr);
  }

  getAnswersArrayAtIndex(index: number) {
    return this.personalQuestionnaireGroup[index].get('answers') as FormArray;
  }

  getSelectedAnswers(index: number) {
    this.tempResponseBuilder = [];
    this.getAnswersArrayAtIndex(index).controls.forEach((control, i) => {
      if (control.value) {
        this.tempResponseBuilder.push(this.possibleAnswersPersQues[i]);
      }
    });
    this.finalResponse.concat(this.tempResponseBuilder);
    console.log(this.finalResponse);

  }


}
