import {templates} from './../template.js'

var contactController = function () {
  const hardcoded = [
    {
      name: 'Alexander Nestorov',
      taUser: 'Alexander.N',
      git: 'https://github.com/alexnestorov'
    },
    {
      name: 'Kristiyan Vachev',
      taUser: 'SexPistols',
      git: 'https://github.com/KristiyanVachev'
    },
    {
      name: 'Stoiko Neykov',
      taUser: 'StoikoNeykov',
      git: 'https://github.com/StoikoNeykov'
    },
    {
      name: 'Todor Arabadzhiev',
      taUser: 'todor_ia',
      git: 'https://github.com/todorarabadzhiev'
    }
  ]

  function all(context) {
    templates.get('contact')
      .then(function (template) {
        context.$element().html(template(hardcoded))
      });
  }

  return {
    all: all
  };
} ();

export {contactController}