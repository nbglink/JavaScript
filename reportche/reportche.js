function startApp() {


    //$("#linkListTasks").click(listTasks);

    // Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function () {
        $(this).fadeOut();
    });

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    listTasks();

    function listTasks() {
        $('#tasks').empty();
        //showView('viewtTasks');
        $.ajax({
            method: "GET",
            url: "http://localhost/deskdev",
            success: loadTasksSuccess,
            error: handleAjaxError


        });




        function loadTasksSuccess(tasks) {
            let table = $(`  
                <table>
                    <tr id = firstTr>
                        <th>Машина</th>
                        <th>Оператор</th>
                        <th>Локация</th>
                        <th>Дейност</th>
                        <th>Време за стартиране</th>
                        <th>Време за завършване</th>       
                    </tr>
                </table>`);
            for (let task of tasks) {
                let tr = $("<tr>");
                displayTableRow(tr, task);
                tr.appendTo(table);
            }
            $("#tasks").append(table);
        }

        function displayTableRow(tr, task) {
            let plan = "";

            switch(task.PlanTypeId){
                case 9:
                plan = "Changed";
                break;
                case 10:
                    plan = "Scheduled";
                    break;
                case 13:
                    plan = "New";
                    break;
                case 14:
                    plan = "Emergency";
                    break;
                case 17:
                    plan = "Carried over";
                    break;
                case 18:
                    plan = "Carried forward";
                    break;
            }

            tr.append(
                $("<td>").text(task.eCode),
                $("<td>").text(task.emCode),
                $("<td>").text(task.Location),
                $("<td>").text(task.ActivityID),
                $("<td>").text(task.st),
                $("<td>").text(plan)

            );



        }



        loadTimeline();

    }

    function loadTimeline() {

        $("<div></div>").appendTo("#timeline");


        google.charts.load('current', {'packages':['timeline']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var container = $("#timeline")[0];
            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();
            // set a padding value to cover the height of title and axis values


            dataTable.addColumn({ type: 'string', id: 'Plan' });
            dataTable.addColumn({ type: 'string', id: 'planName' });
            dataTable.addColumn({ type: 'date', id: 'Start' });
            dataTable.addColumn({ type: 'date', id: 'End' });





            dataTable.addRows([
                [ 'Scheduled', 'Scheduled', new Date("2015-07-22T12:00:00.000Z"), new Date("2015-07-22T13:25:00.000Z") ],
                [ 'Scheduled', 'Scheduled',        new Date("2015-07-22T09:00:00.000Z"),  new Date("2015-07-22T10:00:00.000Z") ],
                [ 'New', 'New',  new Date("2015-07-22T08:00:00.000Z"),  new Date("2015-07-22T13:05:00.000Z") ],
                [ 'Emergency', 'Emergency',  new Date("2015-07-22T11:00:00.000Z"),  new Date("2015-07-22T13:30:00.000Z") ],
                [ 'Emergency', 'Emergency',  new Date("2015-07-22T11:00:00.000Z"),  new Date("2015-07-22T13:30:00.000Z") ],
                [ 'Emergency', 'Emergency',  new Date("2015-07-22T11:00:00.000Z"),  new Date("2015-07-22T13:30:00.000Z") ]
            ]);


            var rowHeight = 49;
            var chartHeight = (dataTable.getNumberOfRows() + 2) * rowHeight;

            var options = {
                height: chartHeight
            }

            var options = {
                timeline: {colorByRowLabel: true, groupByRowLabel: false,  showRowLabels: false },
                colors: ['blue', 'green', 'red'],
                height: chartHeight,
            };

            chart.draw(dataTable, options);
        }

    }



    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }


    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

}
