import { Component, OnInit, Injectable } from '@angular/core';
import { Opc } from './opc.model';
import { NgForm } from '@angular/forms';
import { OpcService } from './opc.service';


// @Injectable()

@Component({
  selector: 'app-opc',
  templateUrl: './opc.component.html',
  styleUrls: ['./opc.component.css']
})
export class OpcComponent implements OnInit {
  opc: Opc;

  constructor(private opcService:OpcService) { }

  ngOnInit() {
  }

  onSaveOpc(form: NgForm){

    if(form.invalid){
      return;
    }
    const opc ={
      _id: null,
      name: form.value.name,
      creator: null
    }

    this.opcService.addOpc(opc);
    form.resetForm();

  }





}
