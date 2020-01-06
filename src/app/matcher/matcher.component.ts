// import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import {Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Subscription, Observable, timer} from 'rxjs';
import {FirebaseFirestore} from '@angular/fire';
import firebase from '@firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {

  // private subscription: Subscription;
  // @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  // @Input() SearchDate: moment.Moment = moment();
  // @Input() ElapsTime = 3;

  myCNP = 'abcde1234567';
  othersCNP = ['abert6523417', 'iucde9872341', 'alcie1235678'];

  profileData: AngularFirestore;

  cnp1 = '';
  cnp2 = '';
  solution = 0;

  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 10000);


  constructor() {
    // this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
  }

  matcher() {
    // this.profileData = firebase.firestore();
    // this.profileData.collection('users').get().then(doc => {console.log(doc.forEach(i.proto.fields.c)); });
    // const docRef = this.profileData.collection('users');
    //
    // docRef.get().then(x => {
    //   console.log(x.forEach(result => {
    //     console.log(result.data());
    //   }));
    // });
    const docRef = this.profileData.collection('users');
    const ok = docRef.get();
    console.log(ok);
  }


  // async matcher() {
  //   const snapshot = await firebase.firestore().collection('users').get().then(po => {console.log(po.docs)});
  //   return snapshot.map(doc => doc.data());
  // }

  scoreCreator() {
    console.log(this.cnp1);
    console.log(this.cnp2);
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


  ngOnInit() {
    // this.subscription = this.everySecond.subscribe((seconds) => {
    //   console.log('cici');
    //   const currentTime: moment.Moment = moment();
    //   this.remainingTime = this.searchEndDate.diff(currentTime);
    //   this.remainingTime = this.remainingTime / 1000;
    //   if (this.remainingTime <= 0) {
    //     this.SearchDate = moment();
    //     this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
    //     this.TimerExpired.emit();
    //   } else {
    //     this.minutes = Math.floor(this.remainingTime / 60);
    //     this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
    //   }
    // this.ref.markForCheck();
    // });
  }

}
