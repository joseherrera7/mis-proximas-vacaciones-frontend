import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  botonBuscar = false;
  imagen: any;
  closeModal: string;

  constructor(private apiService: ApiServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "en",
    width: "320px",
    height: "240px",
  };

  onImageChange(e) {
    console.log('imagen guardada', e)
    this.imagen = e;
    this.apiService.getImageInfo(e)
    this.botonBuscar = true;
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
