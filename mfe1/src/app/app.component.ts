import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngVersion = require('../../package.json').dependencies['@angular/core'];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('MFE1', this.ngVersion);
    this.router.navigateByUrl(location.pathname.substr(1));
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(location.pathname.substr(1));
    });
  }
}
