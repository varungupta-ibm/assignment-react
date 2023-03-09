const Content = {
    errors: {
        EMAIL: 'Enter a valid email address.',
        PHONE: 'Enter a valid phone number.',
        NAME: 'Enter a valid name.',
        EMPLOYER: 'Select an employer.',
        PASSWORD: 'Enter a valid password.'
    },
    ADMIN: 'EMPLOYER',
    USER: 'EMPLOYEE'
};

const Validate = (Elm, msg) => {

    const _getNextSibling = function (elem, selector) {
        var sibling = elem.nextElementSibling;
        if (!selector) return sibling;
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    };

    const _validateEmail = function (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

    let nextElm = _getNextSibling(Elm, '.error-message');

    switch (Elm.type) {
        case 'email':
            if (!Elm.value) {
                Elm.classList.add("error");

                if (msg) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = msg;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else if (!_validateEmail(Elm.value)) {
                Elm.classList.add("error");

                if (msg) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = msg;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'password':
            if (!Elm.value) {
                Elm.classList.add("error");

                let spanTag = document.createElement("span");
                spanTag.classList = "error-message";
                spanTag.innerHTML = msg;
                if (!nextElm) {
                    Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'tel':
        case 'text':
            if (!Elm.value) {
                Elm.classList.add("error");

                if (msg) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = msg;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'select-one':
            if (Elm.value === '-1') {
                Elm.classList.add("error");

                if (msg) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = msg;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        default:
            return true;
    }
}

module.exports.content = Content;
module.exports.validate = Validate;
