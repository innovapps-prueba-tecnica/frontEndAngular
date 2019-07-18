import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import swal, { SweetAlertType } from 'sweetalert2';
import {
    Validators,
    FormGroup,
    FormBuilder,
    FormControl
} from '@angular/forms';

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
    templateUrl: './vuelo.component.html',
    styleUrls: ['./vuelo.component.scss']
})
export class VueloComponent implements OnInit {
    data: any;
    constructor(private vueloService: VueloService) {}

    ngOnInit() {
        this.vueloService.getAll().subscribe(
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
            text: 'Deseas eliminar el vuelo?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
            .then(result => {
                if (result.value) {
                    this.vueloService.delete(id).subscribe(res => {
                        swal({
                            title: 'Exíto',
                            text: 'Se elimino el vuelo exisotamente'
                        })
                            .then(willDelete => {
                                this.ngOnInit();
                            })
                            .catch(swal.noop);
                    });
                }
            })
            .catch(swal.noop);
    }
}

@Component({
    templateUrl: './vuelo.create.component.html',
    styleUrls: ['./vuelo.component.scss']
})
export class VueloCreateComponent implements OnInit {
    constructor(
        private vueloService: VueloService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.userForm = new FormGroup({
            description: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            ),
            departure_date: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            origin_city: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            ),
            destination_city: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            )
        });
    }
    userForm: any;

    formErrors = {
        description: [],
        departure_date: [],
        origin_city: [],
        destination_city: []
    };

    validationMessages = {
        description: {
            required: 'La descripción es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        departure_date: {
            required: 'La fecha de salida es obligatoria.'
        },
        origin_city: {
            required: 'La ciudad de origen es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        destination_city: {
            required: 'La ciudad de destino es obligatoria.',
            maxlength:
                'La ciudad de destino no puede tener mas de 45 caracteres'
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
            this.vueloService.save(this.userForm.value).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se creo el vuelo exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/vuelos']);
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
    templateUrl: './vuelo.edit.component.html',
    styleUrls: ['./vuelo.component.scss']
})
export class VueloEditComponent implements OnInit {
    id;
    // tslint:disable-next-line:member-ordering
    userForm: any;
    formErrors = {
        description: [],
        departure_date: [],
        origin_city: [],
        destination_city: []
    };

    validationMessages = {
        description: {
            required: 'La descripción es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        departure_date: {
            required: 'La fecha de salida es obligatoria.'
        },
        origin_city: {
            required: 'La ciudad de origen es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        destination_city: {
            required: 'La ciudad de destino es obligatoria.',
            maxlength:
                'La ciudad de destino no puede tener mas de 45 caracteres'
        }
    };

    constructor(
        private vueloService: VueloService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.userForm = new FormGroup({
            description: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            ),
            departure_date: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            origin_city: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            ),
            destination_city: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(45)
                ])
            )
        });
        this.getData();
    }

    getData() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.vueloService.show(this.id).subscribe(
            res => {
                this.userForm.controls['description'].setValue(res.description);
                this.userForm.controls['departure_date'].setValue(
                    res.departureDate
                );
                this.userForm.controls['origin_city'].setValue(res.originCity);
                this.userForm.controls['destination_city'].setValue(
                    res.destinationCity
                );
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
                 this.vueloService.edit(this.userForm.value, this.id).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se edito el vuelo exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/vuelos']);
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
