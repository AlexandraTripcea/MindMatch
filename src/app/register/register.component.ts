import {Component, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from '../services/user';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  private tempResponseBuilder = [];
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
  constructor(private fb: FormBuilder, private db: AngularFirestore, private router: Router) {
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
      if (!control.value) {
        this.tempResponseBuilder.push(this.possibleAnswersPersQues[i]);
      }
    });

    this.finalResponse.push(this.tempResponseBuilder[0]);
    console.log(this.finalResponse);

  }

  storeInfoToFirestore() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    this.db.collection('usersRegisterCode').doc(user.uid).set({userCNP: this.finalResponse}).then(r => {
      console.log(r);
    });

  }


}
