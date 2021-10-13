import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  profileForm = this.fb.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required],
  })

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: Router) {
 
}

  ngOnInit(): void {}

  create(): void {
    this.authService.register(this.profileForm.value).subscribe( (res)=>{
      console.log(res);
      Swal.fire('User created');
      this.router.navigate(['login']);
    });
  }
}
