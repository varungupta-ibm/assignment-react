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

    const _getNextSibling = (elem, selector) => {
        var sibling = elem.nextElementSibling;
        if (!selector) return sibling;
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    };

    let nextElm = _getNextSibling(Elm, '.error-message');

    const _showErrorMessage = (elem) => {
        elem.classList.add("error");

        if (msg) {
            let spanTag = document.createElement("span");
            spanTag.classList = "error-message";
            spanTag.innerHTML = msg;
            if (!nextElm) {
                elem.parentNode.insertBefore(spanTag, elem.nextSibling);
            }
        }
        return false;
    }

    const _removeError = (elem) => {
        if (nextElm) {
            nextElm.remove();
        }
        elem.classList.remove("error");
        return true;
    }

    const _validateEmail = function (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

    switch (Elm.type) {
        case 'email':
            if (!Elm.value) {
                _showErrorMessage(Elm);
                return false;
            } else if (!_validateEmail(Elm.value)) {
                _showErrorMessage(Elm);
                return false
            } else {
                _removeError(Elm);
                return true;
            }
        case 'password':
            if (!Elm.value) {
                _showErrorMessage(Elm);
                return false;
            } else {
                _removeError(Elm);
                return true;
            }
        case 'tel':
        case 'text':
            if (!Elm.value) {
                _showErrorMessage(Elm);
                return false;
            } else {
                _removeError(Elm);
                return true;
            }
        case 'select-one':
            if (Elm.value === '-1') {
                _showErrorMessage(Elm);
                return false;
            } else {
                _removeError(Elm);
                return true;
            }
    }
    return true;
}

module.exports.content = Content;
module.exports.validate = Validate;
