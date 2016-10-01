import {templates} from './../template.js'
import {createCar} from './../models/car.js'
import {popup} from './popup-controller.js'
import { carsGetAll, carCreate } from '../data.js'

var carController = function () {

    function all(context) {
        let allCars = [];

        carsGetAll()
            .then((data) => {
                allCars = data;
                templates.get('all-cars')
                    .then(function (template) {
                        console.log(JSON.stringify(allCars));
                        context.$element().html(template(allCars));
                    });
            })
            .catch((error) => {
                popup('#errorBox', error.message)
            });
    }

    function add(context) {
        templates.get('add-car')
            .then(function (template) {
                context.$element().html(template)

                $('#btn-add-car').on('click', function () {
                    let make = $('#tb-make').val();
                    let model = $('#tb-model').val();
                    let year = $('#tb-year').val();
                    let horsePowers = $('#tb-horsePowers').val();
                    let engine = $('#tb-engine').val();
                    let extras = $('#tb-extras').val();
                    let authorId = localStorage.authKey;


                    console.log(authorId);

                    let attributes = {
                        Make: make,
                        Model: model,
                        Year: year,
                        HorsePowers: horsePowers,
                        Engine: engine,
                        Extras: extras,
                        Owner: authorId
                    };
                    carCreate(attributes)
                        .then((data) => {
                            document.location = 'all-cars';
                        })
                        .catch(console.log);
                });
            })
    }

    // function all(context) {
    //     let allCars = [];

    //     dataAccess.Cars.get()
    //         .then(function (data) {
    //             allCars = data.result;
    //             templates.get('all-cars')
    //                 .then(function (template) {
    //                     context.$element().html(template(allCars));
    //                 })
    //         }),
    //         function (error) {
    //             popup('#errorBox', error.message)
    //         }
    // }
    return {
        all: all,
        add: add
    }
} ();

export {carController}
