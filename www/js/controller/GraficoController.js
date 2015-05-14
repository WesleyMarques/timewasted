var app = angular.module('starter');

/**
 * Created by Gustavo on 29/04/2015.
 */

app.controller('GraficoController', function ($scope, UserService) {

    self = this;
    atividades = UserService.getAtividadesSemana();
    var jsonTarefa = [];
    var jsonCategoria = [];

    atividades.$loaded().then(function (array) {
        array.forEach(function (entry) {
                difTime = weeksAgo(new Date(entry.begin));
                if (difTime < 3) {
                    timeUsed = Number(((new Date(entry.end) - new Date(entry.begin)) / 3600000).toFixed(2));
                    if (difTime == 2) {
                        for (var index in jsonTarefa) {
                            if (jsonTarefa[index].id == entry.name) {
                                console.log(jsonTarefa[index].data);
                                jsonTarefa[index].data[0] = jsonTarefa[index].data[0] + timeUsed;
                                console.log(jsonTarefa[index].data);
                                jsonTarefa.push({id: entry.name, name: entry.name, data: jsonTarefa[index].data});
                                return;
                            }
                        }
                        jsonTarefa.push({id: entry.name, name: entry.name, data: [timeUsed, 0, 0]});
                    }
                    else if (difTime == 1) {
                        for (var index in jsonTarefa) {
                            if (jsonTarefa[index].id == entry.name) {
                                console.log(jsonTarefa[index].data);
                                jsonTarefa[index].data[1] = jsonTarefa[index].data[1] + timeUsed;
                                console.log(jsonTarefa[index].data);
                                jsonTarefa.push({id: entry.name, name: entry.name, data: jsonTarefa[index].data});
                                return;
                            }
                        }
                        jsonTarefa.push({id: entry.name, name: entry.name, data: [0, timeUsed, 0]});
                    }
                    else {
                        for (var index in jsonTarefa) {
                            if (jsonTarefa[index].id == entry.name) {
                                console.log(jsonTarefa[index].data);
                                jsonTarefa[index].data[2] = jsonTarefa[index].data[2] + timeUsed;
                                console.log(jsonTarefa[index].data);
                                jsonTarefa.push({id: entry.name, name: entry.name, data: jsonTarefa[index].data});
                                return;
                            }
                        }
                        jsonTarefa.push({id: entry.name, name: entry.name, data: [0, 0, timeUsed]});

                    }
                }

            }
        )
        ;
    });

    atividades.$loaded().then(function (array) {
        array.forEach(function (entry) {
                difTime = weeksAgo(new Date(entry.begin));
                //console.log(jsonTarefa);
                if (difTime < 3) {
                    timeUsed = Number(((new Date(entry.end) - new Date(entry.begin)) / 3600000).toFixed(2));
                    if (difTime == 2) {
                        for (var index in jsonCategoria) {
                            if (jsonCategoria[index].id == entry.category) {
                                jsonCategoria[index].data[0] = jsonCategoria[index].data[0] + timeUsed;
                                jsonCategoria.push({id: entry.category, name: entry.category, data: jsonCategoria[index].data});
                                return;
                            }
                        }
                        jsonCategoria.push({id: entry.category, name: entry.category, data: [timeUsed, 0, 0]});
                    }
                    else if (difTime == 1) {
                        for (var index in jsonCategoria) {
                            if (jsonCategoria[index].id == entry.category) {
                                jsonCategoria[index].data[1] = jsonCategoria[index].data[1] + timeUsed;
                                jsonCategoria.push({id: entry.category, name: entry.category, data: jsonCategoria[index].data});
                                return;
                            }
                        }
                        jsonCategoria.push({id: entry.category, name: entry.category, data: [0, timeUsed, 0]});
                    }
                    else {
                        for (var index in jsonCategoria) {
                            if (jsonCategoria[index].id == entry.category) {
                                jsonCategoria[index].data[2] = jsonCategoria[index].data[2] + timeUsed;
                                jsonCategoria.push({id: entry.category, name: entry.category, data: jsonCategoria[index].data});
                                return;
                            }
                        }
                        jsonCategoria.push({id: entry.category, name: entry.category, data: [0, 0, timeUsed]});

                    }
                }

            }
        )
        ;
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
                marginRight: 50,
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

    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.6, cy: 0.7, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

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