var app = angular.module('starter');

/**
 * Created by Gustavo on 29/04/2015.
 */

app.controller('GraficoController', function($scope, UserService) {

    self = this;
    atividades = UserService.getAtividadesSemana();
    var jsonTarefa = [];
    var jsonCategoria = [];

    atividades.$loaded().then(function (array) {
        array.forEach(function (entry) {
                difTime = weeksAgo(new Date(entry.begin));
                if (difTime < 3) {
                    timeUsed = Number(((new Date(entry.end) - new Date(entry.begin))/3600000).toFixed(2));
                    if (difTime==2) {
                        jsonTarefa.push({name: entry.name, data: [timeUsed,0,0]});
                    }
                    else if(difTime==1){
                        if(!jsonTarefa.hasOwnProperty(entry.name)) {
                            jsonTarefa.push({name: entry.name, data: [0,timeUsed, 0]});
                        }
                        else{
                            jsonTarefa[entry.name][1] = timeUsed;
                        }
                    }
                    else{
                        if(!jsonTarefa.hasOwnProperty(entry.name)) {
                            jsonTarefa.push({name: entry.name, data: [0, 0, timeUsed]});
                        }
                        else{
                            jsonTarefa[entry.name][2] = timeUsed;
                        }
                    }
                }

            }
        );
    });

    atividades.$loaded().then(function (array) {
        array.forEach(function (entry) {
                difTime = weeksAgo(new Date(entry.begin));
                if (difTime < 3) {
                    timeUsed = Number(((new Date(entry.end) - new Date(entry.begin))/3600000).toFixed(2));
                    if (difTime==2) {
                        jsonCategoria.push({name: entry.category, data: [timeUsed,0,0]});
                    }
                    else if(difTime==1){
                        if(!jsonCategoria.hasOwnProperty(entry.category)) {
                            jsonCategoria.push({name: entry.category, data: [0,timeUsed, 0]});
                        }
                        else{
                            jsonCategoria[entry.category][1] = timeUsed;
                        }
                    }
                    else{
                        if(!jsonCategoria.hasOwnProperty(entry.category)) {
                            jsonCategoria.push({name: entry.category, data: [0, 0, timeUsed]});
                        }
                        else{
                            jsonCategoria[entry.category][2] = timeUsed;
                        }
                    }
                }

            }
        );
    });

    var diasAntes = function (dias) {
        return new Date(+new Date - 1000 * 60 * 60 * 24 * dias);
    };

    var weeksAgo = function (tempo) {
        if ((tempo <= diasAntes(14).getTime()) && (tempo > diasAntes(21).getTime())) {
            return 2;
        } else if (tempo <= diasAntes(7).getTime() && tempo > diasAntes(14).getTime()) {
            return 1;
        } else if (tempo > diasAntes(7).getTime()) {
            return 0;
        }
        else return 3;
    };

    $scope.chartTarefaConfig = {
        options: {
            chart: {
                marginRight:50,
                type: 'bar'
            }
        },
        xAxis: {
            categories: ['2 Weeks ago', '1 Week ago', 'This week']
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        series: jsonTarefa,
        title: {
            text: 'How am I spending my time'
        },

        loading: false
    };


    $scope.chartCategoriaConfig = {
        title: {
            text: 'How am I spending my time',
            x: -20 //center
        },
        xAxis: {
            categories: ['2 Weeks ago', '1 Week ago', 'This week']
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        series: jsonCategoria
    };
});