import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../shared';
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
                            text: 'Se elinino el usuario exisotamente'
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
    constructor(private vueloService: VueloService, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            descripcion: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            fechaSalida: new FormControl('', Validators.compose([Validators.required])),
            ciudadOrigen: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            ciudadDestino: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)]))
        });
    }
    userForm: any;

    formErrors = {
        descripcion: [],
        fechaSalida: [],
        ciudadOrigen: [],
        ciudadDestino: []
    };

    validationMessages = {
        descripcion: {
            required: 'La descripción es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        fechaSalida: {
            required: 'La fecha de salida es obligatoria.'
        },
        ciudadOrigen: {
            required: 'La ciudad de origen es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        ciudadDestino: {
            required: 'La ciudad de destino es obligatoria.',
            maxlength: 'La ciudad de destino no puede tener mas de 45 caracteres'
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
            /*             this.userService.saveUser(this.userForm.value).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se creo el usuario exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/user']);
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
            ); */
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
        descripcion: [],
        fechaSalida: [],
        ciudadOrigen: [],
        ciudadDestino: []
    };

    validationMessages = {
        descripcion: {
            required: 'La descripción es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        fechaSalida: {
            required: 'La fecha de salida es obligatoria.'
        },
        ciudadOrigen: {
            required: 'La ciudad de origen es obligatoria.',
            maxlength: 'La ciudad de origen no puede tener mas de 45 caracteres'
        },
        ciudadDestino: {
            required: 'La ciudad de destino es obligatoria.',
            maxlength: 'La ciudad de destino no puede tener mas de 45 caracteres'
        }
    };

    constructor(private vueloService: VueloService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            descripcion: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            fechaSalida: new FormControl('', Validators.compose([Validators.required])),
            ciudadOrigen: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            ciudadDestino: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)]))
        });
        this.getData();
    }

    getData() {
        this.id = this.route.snapshot.paramMap.get('id');
                this.vueloService.show(this.id).subscribe(
            res => {
                this.userForm.controls['descripcion'].setValue(res.descripcion);
                this.userForm.controls['fechaSalida'].setValue(res.fecha_salida);
                this.userForm.controls['ciudadOrigen'].setValue(res.ciudad_origen);
                this.userForm.controls['ciudadDestino'].setValue(res.ciudad_destino);
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
            /*      this.userService.editUser(this.userForm.value, this.id).subscribe(
                res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se edito el usuario exisotamente'
                    })
                        .then(willDelete => {
                            this.router.navigate(['/user']);
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
            ); */
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
