import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {User} from './user';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>('users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  // Firebase Google Sign-in
  async SigninWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.routeUserToRightPage(credential.user);
    return this.updateUserData(credential.user);
  }

  routeUserToRightPage(user: User) {
    this.db.firestore.doc('usersRegisterCode/' + user.uid).get().then(doc => {
      if (doc.exists) {
        this.router.navigate(['profile']);
      } else {
        this.router.navigate(['register']);
      }
    }).catch(error => {
      console.log('Couldn\'t get the entry ', error);
    });

  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc('users/' + user.uid);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified

    };

    return userRef.set(data, {merge: true});
  }


  // Firebase Logout
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      console.log('Logged out');
      this.router.navigate(['/']);
    });
  }

}
