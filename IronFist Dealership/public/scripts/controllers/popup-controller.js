var popup = function (selector, message) {
    $(selector)
        .text(message)
        .show()
        .delay(5000)
        .fadeOut();
}

export {popup}