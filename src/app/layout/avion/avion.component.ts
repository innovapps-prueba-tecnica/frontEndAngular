import { Component, OnInit } from '@angular/core';
import { AvionService } from '../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import swal, { SweetAlertType } from 'sweetalert2';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

export interface Swal {
    title?: string;
    text: string;
    type?: SweetAlertType;
    showCancelButton?: boolean;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    handlerConfirm?: any;
    handlerCancel?: any;
    allowOutsideClick?: boolean;
}

@Component({
    templateUrl: './avion.component.html',
    styleUrls: ['./avion.component.scss']
})
export class AvionComponent implements OnInit {
    data: any;
    constructor(private avionService: AvionService) {}

    ngOnInit() {
        this.avionService.getAll().subscribe(
            res => {
                this.data = res;
            },
            error => {
                console.log('error', error);
            }
        );
    }

    delete(id) {
         swal({
            title: 'Advertencia',
            text: 'Deseas eliminar el avion?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                this.avionService.delete(id).subscribe(res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se elimino el avion exisotamente'
                    })
                        .then(willDelete => {
                            this.ngOnInit();
                        })
                        .catch(swal.noop);
                });
            }
        }).catch(swal.noop);
    }
}

@Component({
    templateUrl: './avion.create.component.html',
    styleUrls: ['./avion.component.scss']
})
export class AvionCreateComponent implements OnInit {
    constructor(private avionService: AvionService, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            airline: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            description: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            maximunQuantity: new FormControl('', Validators.compose([Validators.required]))
        });
    }
    userForm: any;

    formErrors = {
        airline: [],
        description: [],
        maximunQuantity: []
    };

    validationMessages = {
        airline: {
            required: 'La aerolinea es obligatoria.',
            maxlength: 'La aerolinea no puede tener mas de 45 caracteres'
        },
        descripcion: {
            required: 'La descripcion es obligatoria.',
            maxlength: 'La descripcion no puede tener mas de 45 caracteres'
        },
        maximunQuantity: {
            required: 'La cantidad maxima de pasajeros obligatoria.'
        }
    };

    listarMensajes(msj: Array<any>) {
        let listMensajes = '';
        msj.forEach(function(value) {
            listMensajes = listMensajes + '<li>' + value + '</li>';
        });
        listMensajes = '<ul>' + listMensajes + '</ul>';
        return listMensajes;
    }

    ngOnInit() {}

    onSubmit() {
        const errorValidacion = [];
        const form = this.userForm;

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            this.formErrors[field] = [];
            this.userForm[field] = '';
            const control = form.get(field);
            if (control && !control.valid) {
                const messages = this.validationMessages[field];

                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    errorValidacion.push(messages[key]);
                }
            }
        }
        if (this.userForm.valid) {
            this.avionService.save(this.userForm.value).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se creo el avion exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/aviones']);
                        })
                        .catch(swal.noop);
                },
                error => {
                    swal({
                        title: 'Error',
                        text: error.error.mensaje,
                        type: 'warning'
                    }).catch(swal.noop);
                }
            );
        } else {
            swal({
                title: 'Error',
                html: this.listarMensajes(errorValidacion),
                type: 'warning'
            }).catch(swal.noop);
        }
    }
}

@Component({
    templateUrl: './avion.edit.component.html',
    styleUrls: ['./avion.component.scss']
})
export class AvionEditComponent implements OnInit {
    id;
    // tslint:disable-next-line:member-ordering
    userForm: any;
    formErrors = {
        airline: [],
        description: [],
        maximunQuantity: []
    };

    validationMessages = {
        airline: {
            required: 'La aerolinea es obligatoria.',
            maxlength: 'La aerolinea no puede tener mas de 45 caracteres'
        },
        description: {
            required: 'La descripcion es obligatoria.',
            maxlength: 'La descripcion no puede tener mas de 45 caracteres'
        },
        maximunQuantity: {
            required: 'La cantidad maxima de pasajeros obligatoria.'
        }
    };

    constructor(private avionService: AvionService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            airline: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            description: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            maximunQuantity: new FormControl('', Validators.compose([Validators.required]))
        });
        this.getData();
    }

    getData() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.avionService.show(this.id).subscribe(
            res => {
                this.userForm.controls['airline'].setValue(res.airline);
                this.userForm.controls['description'].setValue(res.description);
                this.userForm.controls['maximunQuantity'].setValue(res.maximunQuantity);
            },
            error => {
                console.log('error', error);
            }
        );
    }

    ngOnInit() {}

    onSubmit() {
        const errorValidacion = [];
        const form = this.userForm;

        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            this.formErrors[field] = [];
            this.userForm[field] = '';
            const control = form.get(field);
            if (control && !control.valid) {
                const messages = this.validationMessages[field];

                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    errorValidacion.push(messages[key]);
                }
            }
        }
        if (this.userForm.valid) {
            this.avionService.edit(this.userForm.value, this.id).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se edito el usuario exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/aviones']);
                        })
                        .catch(swal.noop);
                },
                error => {
                    swal({
                        title: 'Error',
                        text: error.error.mensaje,
                        type: 'warning'
                    }).catch(swal.noop);
                }
            );
        } else {
            swal({
                title: 'Error',
                html: this.listarMensajes(errorValidacion),
                type: 'warning'
            }).catch(swal.noop);
        }
    }

    listarMensajes(msj: Array<any>) {
        let listMensajes = '';
        msj.forEach(function(value) {
            listMensajes = listMensajes + '<li>' + value + '</li>';
        });
        listMensajes = '<ul>' + listMensajes + '</ul>';
        return listMensajes;
    }
}
