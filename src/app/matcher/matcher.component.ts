import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {

  myCNP = 'abcde1234567';
  othersCNP = [ 'abert6523417', 'iucde9872341', 'alcie1235678'];


  cnp1 = '';
  cnp2 = '';
  solution = 0;

  constructor() { }

  matcher() {

  }

  scoreCreator() {
    console.log(this.cnp1);
    console.log(this.cnp2);
    let count = 0;
    for ( let i = 0; i < this.cnp1.length; i++) {
      if ( this.cnp1[i] === this.cnp2[i]) {
        if ( i < 5 ) {
          count += 13;
        } else {
          count += 5;
        }
      }
    }
    this.solution = count;
  }


  ngOnInit() {
  }

}
