import {Component, OnInit} from '@angular/core';
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

export class ProfileComponent implements OnInit {

  profile: User;

  profileName = '';
  profileEmail = '';
  profileImage = '';
  hop;
  profileDescription;
  profileRandomStuff;

  constructor(private profileData: FirebaseFirestore) {

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
    this.profile = firebase.auth().currentUser;
    this.profileData = firebase.firestore();
    console.log(this.profile.uid);

    this.hop = this.profileData.doc('users/' + this.profile.uid).get();
    console.log(this.hop.displayName);

    this.profileName = this.profile.displayName;
    this.profileEmail = this.profile.email;
    this.profileImage = this.profile.photoURL;
  }

}
