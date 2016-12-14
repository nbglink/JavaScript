class Textbox {
    constructor(selector, regex){
        this._elements = $(selector);
        this._invalidSymbols = regex;

        let that = this;
        this.elements.on('input', function () {
            that.value = $(this).val();// that е this-а на класа а this-a на тази линия е this-a на евента.//Дава текста изписан в
            // твкстбокса на set-ера на класа.
        });
    }

    isValid() {
       return !this._invalidSymbols.test(this.value);
    }

    get elements() {
        return this._elements;
    }

    get value() {
        return this._value;
    }

    set value(text) {
        this.elements.val(text);
        this._value = text;
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');
textbox.value = "pesho";
inputs.on('input',function(){console.log(textbox.value);});//евент, който вика geter-a и конзол логва

