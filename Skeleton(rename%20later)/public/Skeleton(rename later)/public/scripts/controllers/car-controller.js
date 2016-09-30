import {templates} from './../template.js'
import {popup} from './popup-controller.js'

var carController = function () {

    // const Authentication_Key = 'zhumgwq8m2cn6p2e';
    // const dataAccess = new Everlive(Authentication_Key);

    function all(context) {
        let allCars = [];

        dataAccess.Cars.get()
            .then(function (data) {
                allCars = data.result;
                templates.get('all-cars')
                    .then(function (template) {
                        context.$element().html(template(allCars));
                    })
            }),
            function (error) {
                popup('#errorBox', error.message)
            }
    }

    function add(context){
        templates.get('add-car')
            .then(function(template){
                context.$element().html(template)
                console.log('Time to make it work dude!')
            })
    }

    return {
        all,
        add
    }
} ();