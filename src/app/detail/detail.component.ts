import { AuthService } from './../services/auth/auth.service';
import { ApiServiceService } from './../services/api-service.service';
import { Character } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  character: Character;
  characters: Character[];

  constructor(
    public router: Router,
    private api: ApiServiceService,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.character = this.router.getCurrentNavigation().extras.state.character;
    }
    this.characters = JSON.parse(localStorage.getItem('characters'));
    console.log(this.character);
  }

  ngOnInit(): void {}

  logout(): void {
    this.authservice.logout();
  }

  deleteItem(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this card!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })
      .then((result) => {
        if (result.value) {
          this.api.deleteCard(this.character._id).subscribe((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Your card has been deleted.', 'success');
            this.router.navigate(['home']);
          });

          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your card is safe :)', 'error');
        }
      })
      .finally(() => {});
  }

  goEdit(character): void {
    const navext: NavigationExtras = {
      state: {
        character,
      },
    };
    this.router.navigate(['home/modify'], navext);
  }

  navigateHome(): void {
    this.router.navigate(['home']);
  }

  navigateProfile(): void {
    this.router.navigate(['../profile'], { relativeTo: this.route });
  }
}
