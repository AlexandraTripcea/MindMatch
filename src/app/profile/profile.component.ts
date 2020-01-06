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
export class ProfileComponent implements OnInit {

  profile: User;
  profileData: FirebaseFirestore;
  profileName = '';
  profileEmail = '';
  profileImage = '';
  hop;
  profileDescription;
  profileRandomStuff;

  constructor() {

    console.log('cons');

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
    this.profileData.doc('users/' + this.profile.uid).update({displayName: this.profileName});

  }

  ngOnInit() {
    this.savealways();
    if (firebase.auth().currentUser) {
      console.log('da');
    } else {
      console.log('nu');
    }

    this.profile = firebase.auth().currentUser;
    this.profileData = firebase.firestore();


    console.log(this.profile.uid);
// --------
    this.profileData.doc('users/' + this.profile.uid).get().then(name => {
      if (name.exists) {
        this.profileName = name.data.name;
        // console.log(name.data.toString());
      } else {
        console.log('nu mere');
      }
    });
    // console.log(this.hop.displayName);
    // console.log(this.profileName);

    this.profileName = this.profile.displayName;
    this.profileEmail = this.profile.email;
    this.profileImage = this.profile.photoURL;

  }

  savealways() {

  }

}
