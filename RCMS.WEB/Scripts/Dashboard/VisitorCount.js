$(document).ready(function () {
    VisitorCountManager.GetVisitorCount();
    $("#myonoffswitch").change(function () {
        var isRealtime = $("#myonoffswitch").is(":checked");
        if (isRealtime) {
            VisitorCountManager.GetVisitorCount();
        }
    });

    //function loadChart() {
    //    var chart = AmCharts.makeChart("chartdiv", {
    //        "type": "serial",
    //        "theme": "light",
    //        "marginRight": 40,
    //        "marginLeft": 40,
    //        "autoMarginOffset": 20,
    //        "mouseWheelZoomEnabled": true,
    //        "dataDateFormat": "DD-MM-YYYY",
    //        "valueAxes": [
    //            {
    //                "id": "v1",
    //                "axisAlpha": 0,
    //                "position": "left",
    //                "ignoreAxisWidth": true
    //            }
    //        ],
    //        "balloon": {
    //            "borderThickness": 1,
    //            "shadowAlpha": 0
    //        },
    //        "graphs": [
    //            {
    //                "id": "g1",
    //                "balloon": {
    //                    "drop": true,
    //                    "adjustBorderColor": false,
    //                    "color": "#ffffff"
    //                },
    //                "bullet": "round",
    //                "bulletBorderAlpha": 1,
    //                "bulletColor": "#FFFFFF",
    //                "bulletSize": 5,
    //                "hideBulletsCount": 50,
    //                "lineThickness": 2,
    //                "title": "red line",
    //                "useLineColorForBulletBorder": true,
    //                "valueField": "value",
    //                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    //            }
    //        ],
    //        "chartScrollbar": {
    //            "graph": "g1",
    //            "oppositeAxis": false,
    //            "offset": 30,
    //            "scrollbarHeight": 80,
    //            "backgroundAlpha": 0,
    //            "selectedBackgroundAlpha": 0.1,
    //            "selectedBackgroundColor": "#888888",
    //            "graphFillAlpha": 0,
    //            "graphLineAlpha": 0.5,
    //            "selectedGraphFillAlpha": 0,
    //            "selectedGraphLineAlpha": 1,
    //            "autoGridCount": true,
    //            "color": "#AAAAAA"
    //        },
    //        "chartCursor": {
    //            "pan": true,
    //            "valueLineEnabled": true,
    //            "valueLineBalloonEnabled": true,
    //            "cursorAlpha": 1,
    //            "cursorColor": "#258cbb",
    //            "limitToGraph": "g1",
    //            "valueLineAlpha": 0.2,
    //            "valueZoomable": true
    //        },
    //        "valueScrollbar": {
    //            "oppositeAxis": false,
    //            "offset": 50,
    //            "scrollbarHeight": 10
    //        },
    //        "categoryField": "date",
    //        "categoryAxis": {
    //            "parseDates": true,
    //            "dashLength": 1,
    //            "minorGridEnabled": true
    //        },
    //        "export": {
    //            "enabled": true
    //        },
    //        "dataProvider": data1
    //    });
    //    function zoomChart() {
    //        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    //    }
    //    chart.addListener("rendered", zoomChart);

    //    zoomChart();
    //}






});

var VisitorCountManager = {

    GetVisitorCount: function () {

        var data1 = null;
        $.ajax({
            url: '/Dashboard/VisitorCount',
            type: 'GET',
            success: function (response) {
              
                data1 = response;
            //    loadChart();
                VisitorCountManager.LoadChart(data1);
                
                
                setTimeout(function () {
                    var isRealtime = $("#myonoffswitch").is(":checked");
                    if (isRealtime) {
                        VisitorCountManager.GetVisitorCount();
                    }
                 

                }, 10000);
            },
            error: function (error) {
                $(this).remove();
                DisplayError(error.statusText);
            }
        });
    },
    LoadChart: function (data1) {
        var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "light",
            "marginRight": 40,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "mouseWheelZoomEnabled": true,
            "dataDateFormat": "DD-MM-YYYY",
            "valueAxes": [
                {
                    "id": "v1",
                    "axisAlpha": 0,
                    "position": "left",
                    "ignoreAxisWidth": true
                }
            ],
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "graphs": [
                {
                    "id": "g1",
                    "balloon": {
                        "drop": true,
                        "adjustBorderColor": false,
                        "color": "#ffffff"
                    },
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletColor": "#FFFFFF",
                    "bulletSize": 5,
                    "hideBulletsCount": 50,
                    "lineThickness": 2,
                    "title": "red line",
                    "useLineColorForBulletBorder": true,
                    "valueField": "value",
                    "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
                }
            ],
            "chartScrollbar": {
                "graph": "g1",
                "oppositeAxis": false,
                "offset": 30,
                "scrollbarHeight": 80,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#888888",
                "graphFillAlpha": 0,
                "graphLineAlpha": 0.5,
                "selectedGraphFillAlpha": 0,
                "selectedGraphLineAlpha": 1,
                "autoGridCount": true,
                "color": "#AAAAAA"
            },
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 1,
                "cursorColor": "#258cbb",
                "limitToGraph": "g1",
                "valueLineAlpha": 0.2,
                "valueZoomable": true
            },
            "valueScrollbar": {
                "oppositeAxis": false,
                "offset": 50,
                "scrollbarHeight": 10
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": true
            },
            "dataProvider": data1
        });
        function zoomChart() {
            chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
        }
        chart.addListener("rendered", zoomChart);

        zoomChart();
    }
}

