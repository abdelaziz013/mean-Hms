import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Service } from './service.model';
import { ServiceService } from './service.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public service: Service;
  private id;
  public mode = 'add';

  constructor(private serviceService: ServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.serviceService.getserviceById(this.id).subscribe((serviceData) => {
          this.service = serviceData.service;
        });




      } else {
        this.mode = 'add';
      }
    });
  }


  onSaveService(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const service: Service = {
      _id: null,
      serviceName: form.value.name,
      serviceCategory: form.value.category,
      serviceCost: form.value.cost,
      creator: null
    };

    console.log(this.mode)
    if (this.mode === 'edit') {
      this.serviceService.updateService(this.id, service).subscribe(() => {
        this.router.navigate(['/admin/service-list'])
      })

    } else {
      this.serviceService.addService(service);
    }




    form.resetForm();

  }

}
