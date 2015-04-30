var app = angular.module('starter');

/**
 * Created by Gustavo on 29/04/2015.
 */

app.controller('AppCtrl', function ($scope, UserService) {

    self = this;
    atividades = UserService.getAtividadesSemana();
    var json = [];

    atividades.$loaded().then(function (array) {
        array.forEach(function (entry) {
                //console.log(entry);
                difTime = weeksAgo(Date.parse(entry.begin));
                if (difTime < 3) {
                    console.log(Date.parse(entry.end));
                    console.log(Date.parse(entry.begin));
                    timeUsed = (Date.parse(entry.end) - Date.parse(entry.begin))/3600000;
                    console.log(timeUsed);
                    //if(!json.hasOwnProperty(array[entry].name)){
                    if (difTime==2) {
                        json.push({name: entry.name, data: [timeUsed,0,0]});
                    }
                    else if(difTime==1){
                        if(!json.hasOwnProperty(entry.name)) {
                            json.push({name: entry.name, data: [0,timeUsed, 0]});
                        }
                        else{
                            json[entry.name][1] = timeUsed;
                        }
                    }
                    else{
                        if(!json.hasOwnProperty(entry.name)) {
                            json.push({name: entry.name, data: [0, 0, timeUsed]});
                        }
                        else{
                            json[entry.name][2] = timeUsed;
                        }
                    }
                }

            }
        );
        //console.log(json);
        /*console.log(array[0]);
        var date = new Date();
        console.log();*/
    });

    var diasAntes = function (dias) {
        return new Date(+new Date - 1000 * 60 * 60 * 24 * dias);
    };

    var weeksAgo = function (tempo) {
        //console.log(new Date(tempo));
        //console.log(diasAntes(14));
        if ((tempo <= diasAntes(14).getTime()) && (tempo > diasAntes(21).getTime())) {
            return 2;
        } else if (tempo <= diasAntes(7).getTime() && tempo > diasAntes(14).getTime()) {
            return 1;
        } else if (tempo > diasAntes(7).getTime()) {
            return 0;
        }
        else return 3;
    };

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        xAxis: {
            categories: ['2 Week ago', '1 Week ago', 'This week']
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        series: json,
        title: {
            text: 'How am I spending my time'
        },

        loading: false
    };

});