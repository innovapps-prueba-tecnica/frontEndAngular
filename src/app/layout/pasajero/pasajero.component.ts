import { Component, OnInit } from '@angular/core';
import { PasajeroService } from '../../shared';
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
    templateUrl: './pasajero.component.html',
    styleUrls: ['./pasajero.component.scss']
})
export class PasajeroComponent implements OnInit {
    data: any;
    constructor(private pasajeroService: PasajeroService) {}

    ngOnInit() {
        this.pasajeroService.getAll().subscribe(
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
            text: 'Deseas eliminar el pasajero?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.value) {
                this.pasajeroService.delete(id).subscribe(res => {
                    swal({
                        title: 'Exíto',
                        text: 'Se elimino el pasajero exisotamente'
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
    templateUrl: './pasajero.create.component.html',
    styleUrls: ['./pasajero.component.scss']
})
export class PasajeroCreateComponent implements OnInit {
    constructor(private pasajeroService: PasajeroService, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(60)]))
        });
    }
    userForm: any;

    formErrors = {
        name: [],
        lastName: [],
        amount: [],
        email: [],
        telephone: []
    };

    validationMessages = {
        name: {
            required: 'El nombre es obligatorio.',
            maxlength: 'El nombre no puede tener mas de 45 caracteres'
        },
        email: {
            required: 'El correo es obligatorio.',
            email: 'El formato del correo eléctronico no es valido',
            maxlength: 'El correo electronico no puede tener mas de 60 caracteres'
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
    templateUrl: './pasajero.edit.component.html',
    styleUrls: ['./pasajero.component.scss']
})
export class PasajeroEditComponent implements OnInit {
    id;
    // tslint:disable-next-line:member-ordering
    userForm: any;
    formErrors = {
        name: [],
        lastName: [],
        amount: [],
        email: [],
        telephone: []
    };

    validationMessages = {
        name: {
            required: 'El nombre es obligatorio.',
            maxlength: 'El nombre no puede tener mas de 45 caracteres'
        },
        email: {
            required: 'El correo es obligatorio.',
            email: 'El formato del correo eléctronico no es valido',
            maxlength: 'El correo electronico no puede tener mas de 60 caracteres'
        }
    };

    constructor(private pasajeroService: PasajeroService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(45)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(60)]))
        });
        this.getData();
    }

    getData() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.pasajeroService.show(this.id).subscribe(
            res => {
                this.userForm.controls['name'].setValue(res.name);
                this.userForm.controls['email'].setValue(res.email);
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
