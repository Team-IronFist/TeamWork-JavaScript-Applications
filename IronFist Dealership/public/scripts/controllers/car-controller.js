import {templates} from './../template.js'
import {createCar} from './../models/car.js'
import {popup} from './popup-controller.js'
import { cars } from '../data.js'

var carController = function () {

    const Car_Added_Message = 'Car successfully added!';
    const No_Cars_From_This_User = 'There are no cars published by this user'

    function allFromUser(context) {
        let allUserCars = [];
        cars.carsGetAll()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (localStorage.authKey === data[i].Owner) {
                        allUserCars.push(data[i]);
                    }
                }
                if (allUserCars.length === 0) {
                    popup('#errorBox', No_Cars_From_This_User);
                    document.location = "#/cars/user";
                    return;
                }
                ;

                templates.get('all-cars')
                    .then(function (template) {
                        context.$element().html(template(allUserCars));
                    },
                    function (error) {
                        console.log(error);
                    });
            })
            .catch(console.log);
    }


    function all(context) {
        let allCars = [];
        cars.carsGetAll()
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
                    let price = $('#tb-price').val();
                    let authorId = localStorage.authKey;
                    let image = $('#tb-select-cars').val();


                    console.log(authorId);

                    let attributes = {
                        Make: make,
                        Model: model,
                        Year: year,
                        HorsePowers: horsePowers,
                        Engine: engine,
                        Extras: extras,
                        Price: price,
                        Owner: authorId,
                        Image: './images/' + image + '.png'
                    };

                    let allCars;

                    // TODO Fix this if anyone find out how!

                    cars.carCreate(attributes)
                        .then(() => {
                            popup('#infoBox', Car_Added_Message)
                            console.log(context)
                        })
                        // .then(() => {
                        //     return carsGetAll();
                        // })
                        // .then((data) => {
                        //     allCars = data;
                        //     return templates.get('all-cars')
                        // })
                        // .then((template) => {
                        //     $('#content').html(template(allCars));
                        // })
                        .catch((error) => {
                            popup('#infoBox', error);
                            console.log(error);
                        });
                });
            })
    }

    function showSingle(context, id) {
        console.log(context);
        console.log(id);

        let car;
        let owner;

        cars.getCarById(id)
            .then((data) => {
                car = data;
                return cars.userGetById(car.Owner)
            })
            .then((data) => {
                owner = data;
                car.username = owner.Username;
                return templates.get('single-car')
            })
            .then((template) => {
                console.log(car.username)
                context.$element().html(template(car))
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
        add: add,
        showSingle: showSingle,
        allFromUser: allFromUser
    }
} ();

export {carController}
