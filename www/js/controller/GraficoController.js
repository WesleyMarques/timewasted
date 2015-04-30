var app = angular.module('starter');

/**
 * Created by Gustavo on 29/04/2015.
 */

app.controller('GraficoController', function($scope) {

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
            series: [{
                name: 'Categoria 1',
                data: [1, 0, 2]
            }, {
                name: 'Categoria 2',
                data: [3, 2, 3]
            }],
            title: {
                text: 'How am I spending my time'
            },

            loading: false
        };

    });