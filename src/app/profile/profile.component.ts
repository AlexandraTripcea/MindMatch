import {Component, Injectable, OnInit} from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import {FirebaseAuth, FirebaseFirestore} from '@angular/fire';
import {User} from 'firebase';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
  }
)
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ProfileComponent implements OnInit {

  profile: User;
  // profileData: FirebaseFirestore;
  profileName = '';
  profileEmail = '';
  profileImage = '';
  userDescription: string;
  randomFun: string;


  private firestore: FirebaseFirestore;

  constructor() {

    // console.log('cons');

    // this.profileDescription = this.profile.des;
  }

  getUserName() {
    return this.profileName;
  }

  getUserEmail() {
    return this.profileEmail;
  }

  getProfileImage() {
    return this.profileImage;
  }

  saveChanges() {
    console.log(this.userDescription);
    console.log(this.randomFun);
    this.firestore.doc('users/' + this.profile.uid).update({displayName: this.profileName});
    this.firestore.doc('usersRegisterCode/' + this.profile.uid).update({description: this.userDescription});
    this.firestore.doc('usersRegisterCode/' + this.profile.uid).update({randomFun: this.randomFun});


  }

  ngOnInit() {
    this.savealways();
    if (firebase.auth().currentUser) {
      // console.log('da');
    } else {
      // console.log('nu');
    }

    this.profile = firebase.auth().currentUser;
    this.firestore = firebase.firestore();


    // console.log(this.profile.displayName);
    this.profileName = this.profile.displayName;
// --------
    this.firestore.doc('users/' + this.profile.uid).get().then(user => {
      if (user.exists) {
        // console.log(user._document.proto.fields.displayName);
        console.log(user.get('email'));
        // this.profileName = user.get('displayName');
        // this.profileName = user.// console.log(name.data.toString());
      } else {
        console.log('nu mere');
      }
    });
    // console.log(this.firestore.collection('users').get().then( x => { console.log(x); } ));
    // (this.firestore.collection('users').get().then( x => { console.log(x); } )
    // console.log(this.hop.displayName);
    // console.log(this.profileName);

    this.profileName = this.profile.displayName;
    this.profileEmail = this.profile.email;
    this.profileImage = this.profile.photoURL;

  }

  savealways() {

  }

}
