import { AuthService } from './../services/auth/auth.service';
import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

export interface Character {
  _id: number;
  name: string;
  category: string;
  lightsaberColor: string;
  species: string;
  gender: string;
  height: number;
  weight: number;
  description: string;
  img: string;
  correo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1,
  };

  characters: Character[];
  breakpoint: number;

  constructor(
    public router: Router,
    private api: ApiServiceService,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let correo = sessionStorage.getItem('correo');
    this.api.getCards(correo).subscribe((res) => {
      this.characters = res;
      localStorage.setItem('characters', JSON.stringify(this.characters));
    });
  }

  logout(): void {
    this.authservice.logout();
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }

  navigateProfile(): void {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  goDetail(character): void {
    const navext: NavigationExtras = {
      state: {
        character,
      },
    };
    this.router.navigate(['home/detail'], navext);
  }
}
