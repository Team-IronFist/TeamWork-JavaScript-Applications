import {templates} from './../template.js'
import {createCar} from './../models/car.js'
import {popup} from './popup-controller.js'
import { carsGetAll } from '../data.js'

var carController = function () {

    function all(context) {
        let allCars = [];

        carsGetAll()
            .then((data) => {
                allCars = data.result;
                templates.get('all-cars')
                    .then(function (template) {
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
                console.log('Time to make it work dude!')
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
