let expect =  require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');


document.body.innerHTML = `<div id="wrapper">
<input type="text" id="name">
<input type="text" id="income">
<div>`;


let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};


describe('sharedObject', function () {
    it('name property should start as null', function () {
        expect(sharedObject.name).to.equal(null, "Name did not start with value null");
    });
    it('income property should start as null', function () {
        expect(sharedObject.name).to.equal(null, "Name did not start with value null");
    });
    describe('changeName', function () {
        it('with invalidparameters, should not change name property', function () {
            sharedObject.changeName("");
            expect(sharedObject.name).to.equal(null, "Name changed incorrectly")
        });

        it('with invalid parameters and preexisting value, should not change name property', function () {
           sharedObject.name='Pesho';
            sharedObject.changeName("");
            expect(sharedObject.name).to.equal('Pesho', "Name changed incorrectly")
        });

        it('with invalid parameters and preexisting value, should not change name property', function () {
            let nameTextBox = $('#name');
            nameTextBox.val('Ivan');
            sharedObject.changeName("");
            expect(nameTextBox.val()).to.equal('Ivan', "Name changed incorrectly")
        });

        it("with valid name, should change name property", function () {
            sharedObject.changeName('Joro');
            expect(sharedObject.name).to.equal('Joro', 'Name did not change')
        });


        it("with valid name, should change name textbox value", function () {
            sharedObject.changeName('Stamat');
            let nameTextBox = $('#name');
            expect(nameTextBox.val()).to.equal('Stamat', 'Name did not change')
        });
    });


    describe('changeIncome', function () {
        it('with invalid parameters, should not change income property', function () {
            sharedObject.income = 130;
            sharedObject.changeIncome({name:"pesho"});
            expect(sharedObject.income).to.equal(130, "Income changed incorrectly")
        });

        it('with a floating point number, should not change income property', function () {
            sharedObject.income = 13;
            sharedObject.changeName(245.24);
            expect(sharedObject.income).to.equal(13, "Income changed incorrectly")
        });

        it('with a negative integer, should not change income property', function () {
            sharedObject.income = 13;
            sharedObject.changeName(-10);
            expect(sharedObject.income).to.equal(13, "Income changed incorrectly")
        });

        it('with a zero, should not change income property', function () {
            sharedObject.income = 13;
            sharedObject.changeName(0);
            expect(sharedObject.income).to.equal(13, "Income changed incorrectly")
        });

        it('with invalid parameters, should not change income textbox', function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('5');
            sharedObject.changeIncome({name:"pesho"});
            expect(incomeTextbox.val()).to.equal('5', "Income changed incorrectly")
        });

        it('with a floating point number, should not change income textbox', function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('5');
            sharedObject.changeIncome(24.55);
            expect(incomeTextbox.val()).to.equal('5', "Income changed incorrectly")
        });

        it('with a negative integer, should not change income textbox', function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('5');
            sharedObject.changeIncome(-15);
            expect(incomeTextbox.val()).to.equal('5', "Income changed incorrectly")
        });

        it('with a zero, should not change income textbox', function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val('5');
            sharedObject.changeIncome(0);
            expect(incomeTextbox.val()).to.equal('5', "Income changed incorrectly")
        });

        it('with valid integer, shuld change income property', function () {
            sharedObject.changeIncome(56);
            expect(sharedObject.income).to.equal(56, "Income did not change")
        });

        it('with valid integer, shuld change income property', function () {
            sharedObject.changeIncome(56);
            let incomeTextbox = $('#income');
            expect(incomeTextbox.val()).to.equal("56", "Income did not change")
        });
    });

    describe ('updateName', function () {
        it('with invalid parameter, sholud not change name property', function () {
            sharedObject.name = "Test";
            let nameTextbox = $('#name');
            nameTextbox.val("");
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('Test', "Name changed incorrectly")
        });

        it('with invalid name, sholud not change name property', function () {
            let nameTextbox = $('#name');
            nameTextbox.val("testing");
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('testing', "Name changed incorrectly")
        })
    });

    describe ('updateIncome', function () {
        it('with non number string, sholud not change income property', function () {
            sharedObject.income = 55;
            let incomeTextbox = $('#income');
            incomeTextbox.val("pesho");
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(55, "Income changed incorrectly")
        });

        it('with floating point string, sholud not change income property', function () {
            sharedObject.income = 55;
            let incomeTextbox = $('#income');
            incomeTextbox.val("23.17");
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(55, "Income changed incorrectly")
        });

        it('with negative number string, sholud not change income property', function () {
            sharedObject.income = 55;
            let incomeTextbox = $('#income');
            incomeTextbox.val("-20");
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(55, "Income changed incorrectly")
        });

        it('with a emty string number string, sholud not change income property', function () {
            sharedObject.income = 55;
            let incomeTextbox = $('#income');
            incomeTextbox.val("");
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(55, "Income changed incorrectly")
        });

        it('with a valid string representation of an integer, sholud  change income property', function () {
            let incomeTextbox = $('#income');
            incomeTextbox.val("177");
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(177, "Income did not change")
        })


    });


});

