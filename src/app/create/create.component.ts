import { AuthService } from './../services/auth/auth.service';
import { ApiServiceService } from './../services/api-service.service';
import { Character } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  characterForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    category: ['', Validators.required],
    lightsaberColor: ['', Validators.required],
    species: ['', Validators.required],
    gender: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    description: ['', Validators.required],
    img: ['', Validators.required],
    correo: [''],
  });

  itsModify = false;
  characters: Character[];
  character: Character = {
    _id: null,
    name: null,
    category: null,
    lightsaberColor: null,
    species: null,
    gender: null,
    height: null,
    weight: null,
    description: null,
    img: null,
    correo: null,
  };
  correo: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    private api: ApiServiceService,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {
    if (!this.router.getCurrentNavigation().extras.state) {
      this.characters = JSON.parse(localStorage.getItem('characters'));
    } else {
      this.characters = JSON.parse(localStorage.getItem('characters'));
      this.character = this.router.getCurrentNavigation().extras.state.character;
      this.itsModify = true;
    }
    console.log(this.itsModify);
  }

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
    this.router.navigate(['../profile'], { relativeTo: this.route });
  }

  save(): void {
    if (this.itsModify) {
      this.api.modifyCard(this.character, this.character._id).subscribe(() => {
        Swal.fire('Card modified');
        this.router.navigate(['home']);
        console.log(this.characters);
      });
    } else {
      this.characterForm.value.correo = this.correo;
      this.character = this.characterForm.value;
      this.api.createCard(this.character).subscribe(() => {
        Swal.fire('Card created');
        this.router.navigate(['home']);
        console.log(this.characters);
      });
    }
  }
}
