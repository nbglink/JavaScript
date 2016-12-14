class WomanController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    getWoman(id) {
        this.model.getWoman(id).then(
            function (successData) {
                //this view view data
            }
        ).catch(
            function (errorData) {
                console.log(errorData)
            }
        );
    }

    getWomen() {
        this.model.getWomen(id).then(
            function (successData) {
               this.view.listWomen(successData);
            }
        ).catch(
            function (errorData) {
                console.log(errorData)
            }
        );
    }

    createWoman(data) {
        this.model.postWoman(data).then(
            function (successData) {
                console.log("Success");
            }
        ).catch(
            function (errorData) {
                console.log(errorData);
            }
        );
    }
}
