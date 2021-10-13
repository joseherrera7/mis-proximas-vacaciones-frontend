import Swal from 'sweetalert2';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    correo: ['', Validators.required],
    contrasena: ['', Validators.required],
  })

  constructor(public router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
   
   }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.signIn(this.loginForm.value).subscribe((res)=>{
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('auth', res.auth)
      sessionStorage.setItem('correo', res.correo)
      this.router.navigate(['home']);
    }, (err) => {
      Swal.fire('Credenciales incorrectas')
    });
    
  }

  createAccount(): void {
    this.router.navigate(['register'])
  }

}
