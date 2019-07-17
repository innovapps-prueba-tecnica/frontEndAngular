import { Component, OnInit } from '@angular/core';
import { TiqueteService, AvionService, PasajeroService, VueloService } from '../../shared';
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
    templateUrl: './tiquetes.component.html',
    styleUrls: ['./tiquetes.component.scss']
})
export class TiquetesComponent implements OnInit {
    data: any;
    constructor(private tiqueteService: TiqueteService) {}

    ngOnInit() {
        this.tiqueteService.getAll().subscribe(
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
                    this.tiqueteService.delete(id).subscribe(res => {
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
    templateUrl: './tiquetes.create.component.html',
    styleUrls: ['./tiquetes.component.scss']
})
export class TiquetesCreateComponent implements OnInit {

    // tslint:disable-next-line:max-line-length
    constructor(private tiqueteService: TiqueteService, private avionService: AvionService, private pasajeroService: PasajeroService, private vueloService: VueloService, private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            valor_tiquete: new FormControl('', Validators.compose([Validators.required])),
            descuento_tiquete: new FormControl('', Validators.compose([])),
            id_pasajero: new FormControl('', Validators.compose([Validators.required])),
            id_vuelo: new FormControl('', Validators.compose([Validators.required])),
            id_avion: new FormControl('', Validators.compose([Validators.required]))
        });
        this.getDatosRegistro();
    }
    userForm: any;
    datosAviones: any;
    datosPasajeros: any;
    datosVuelos: any;

    formErrors = {
        valor_tiquete: [],
        id_pasajero: [],
        id_vuelo: [],
        id_avion: []
    };

    validationMessages = {
        valor_tiquete: {
            required: 'El valor del tiquete es obligatorio.',
        },
        id_pasajero: {
            required: 'El pasajero es obligatorio.',
        },
        id_vuelo: {
            required: 'El vuelo es obligatorio.',
        },
        id_avion: {
            required: 'El avion es obligatorio.',
        }
    };

    getDatosRegistro() {
        this.avionService.getAll().subscribe(
            res => {
                this.datosAviones = res;
            },
            error => {
                console.log('error', error);
            }
        );
        this.pasajeroService.getAll().subscribe(
            res => {
                this.datosPasajeros = res;
            },
            error => {
                console.log('error', error);
            }
        );
        this.vueloService.getAll().subscribe(
            res => {
                this.datosVuelos = res;
            },
            error => {
                console.log('error', error);
            }
        );
    }

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
    templateUrl: './tiquetes.edit.component.html',
    styleUrls: ['./tiquetes.component.scss']
})
export class TiquetesEditComponent implements OnInit {
    id;
    // tslint:disable-next-line:member-ordering
    userForm: any;
    datosAviones: any;
    datosPasajeros: any;
    datosVuelos: any;

    formErrors = {
        valor_tiquete: [],
        id_pasajero: [],
        id_vuelo: [],
        id_avion: []
    };

    validationMessages = {
        valor_tiquete: {
            required: 'El valor del tiquete es obligatorio.',
        },
        id_pasajero: {
            required: 'El pasajero es obligatorio.',
        },
        id_vuelo: {
            required: 'El vuelo es obligatorio.',
        },
        id_avion: {
            required: 'El avion es obligatorio.',
        }
    };

    // tslint:disable-next-line:max-line-length
    constructor(private tiqueteService: TiqueteService, private route: ActivatedRoute, private avionService: AvionService, private pasajeroService: PasajeroService, private vueloService: VueloService,  private router: Router, private fb: FormBuilder) {
        this.userForm = new FormGroup({
            valor_tiquete: new FormControl('', Validators.compose([Validators.required])),
            descuento_tiquete: new FormControl('', Validators.compose([])),
            id_pasajero: new FormControl('', Validators.compose([Validators.required])),
            id_vuelo: new FormControl('', Validators.compose([Validators.required])),
            id_avion: new FormControl('', Validators.compose([Validators.required]))
        });
        this.getDatosRegistro();
    }

    getDatosRegistro() {
        this.avionService.getAll().subscribe(
            res => {
                this.datosAviones = res;
            },
            error => {
                console.log('error', error);
            }
        );
        this.pasajeroService.getAll().subscribe(
            res => {
                this.datosPasajeros = res;
            },
            error => {
                console.log('error', error);
            }
        );
        this.vueloService.getAll().subscribe(
            res => {
                this.datosVuelos = res;
            },
            error => {
                console.log('error', error);
            }
        );
    }

    getData() {
        this.id = this.route.snapshot.paramMap.get('id');
                this.tiqueteService.show(this.id).subscribe(
            res => {
                this.userForm.controls['valor_tiquete'].setValue(res.valor_tiquete);
                this.userForm.controls['descuento_tiquete'].setValue(res.descuento_tiquete);
                this.userForm.controls['id_pasajero'].setValue(res.id_pasajero);
                this.userForm.controls['id_vuelo'].setValue(res.id_vuelo);
                this.userForm.controls['id_avion'].setValue(res.id_avion);
            },
            error => {
                console.log('error', error);
            }
        );
    }

    ngOnInit() {
        this.getData();
    }

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
