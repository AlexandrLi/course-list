import { Component, OnInit, } from '@angular/core';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public logoURL: string = '../../../assets/img/angular-logo.png';
    public title: string = 'Mentoring Program';

    constructor() { }

    ngOnInit() { }
}
