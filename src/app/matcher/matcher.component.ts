// import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import {Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Subscription, Observable, timer} from 'rxjs';
import {FirebaseFirestore} from '@angular/fire';
import firebase from '@firebase/app';
import {AngularFirestore, AngularFirestoreCollection, QuerySnapshot} from '@angular/fire/firestore';
import {Task} from 'protractor/built/taskScheduler';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {any} from 'codelyzer/util/function';
// import * as firebase from 'firebase';
// import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {

  private firestore: FirebaseFirestore;

  public books: AngularFirestoreCollection<Observable<any[]>>;

  myCNP = 'abcde1234567';
  othersCNP = ['abert6523417', 'iucde9872341', 'alcie1235678'];

  profileData: AngularFirestore;

  arr: Array<{ uid: string, score: number, cnp: string[], description: string, randomFun: string }> = [];

  iterationOfArray = -1;
  arrCnp = '';
  arrUid = '';
  personalCNP = ['A', 'B', 'C', 'B', 'B'];
  score = 0;

  arr2 = [];


  cnp1 = '';
  cnp2 = '';
  solution = 0;

  testy: any[];


  constructor(public db: AngularFirestore) {
  }


  nextProfile() {

    this.iterationOfArray += 1;
    if (this.iterationOfArray < this.arr.length) {
      this.arrCnp = this.arr[this.iterationOfArray].description;
      this.arrUid = this.arr[this.iterationOfArray].randomFun;
      this.score = this.arr[this.iterationOfArray].score;
    } else {
      this.arrCnp = null;
      this.arrUid = 'finish';
      this.score = 0;
    }
  }

  scoreCreator() {
    let count = 0;
    for (let i = 0; i < this.cnp1.length; i++) {
      if (this.cnp1[i] === this.cnp2[i]) {
        if (i < 5) {
          count += 13;
        } else {
          count += 5;
        }
      }
    }
    this.solution = count;
  }

  getUserData2() {
    this.firestore.collection('usersRegisterCode').get().then(x => {
      for (let i = 0; i < x.docs.length; i++) {
        this.arr[i] = {
          uid: x.docs[i].id, score: this.comparCNP(this.personalCNP, x.docs[i].get('userCNP')),
          cnp: x.docs[i].get('userCNP'), description: x.docs[i].get('description'), randomFun: x.docs[i].get('randomFun')
        };
        // this.codrin.push(x.docs[i].id);
      }
    });

    this.arr2 = this.arr.sort((a, b) => {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    });
  }

  comparCNP(personalCNP: string[], strangerCNP: string[]) {
    if (personalCNP.length !== strangerCNP.length) {
      return -1;
    }
    let count = 0;
    for (let i = 0; i < personalCNP.length; i++) {
      if (personalCNP[i] === strangerCNP[i]) {
        i < 5 ? count += 13 : count += 5;
      }
    }
    return count;
  }


  sortData() {

    this.arr2 = this.arr.sort((a, b) => {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    });
    // console.log(this.arr2);


  }

  ngOnInit() {
    this.firestore = firebase.firestore();
    this.getUserData2();


  }

}
