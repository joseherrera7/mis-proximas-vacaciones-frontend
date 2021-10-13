import { AuthService } from './../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  correo: string;

  constructor(public router: Router, private authservice: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.correo = sessionStorage.getItem('correo');
  }

  logout(): void {
    this.authservice.logout();
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }

  navigateProfile(): void {
    this.router.navigate(['home/profile'], { relativeTo: this.route});
  }


}
