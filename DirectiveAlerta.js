/*
 
 DIRECTIVE ALERTA
 ----------------
 
 <script src="DirectiveAlerta.js" type="text/javascript"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
 
 var app = angular.module('App', ['FgAlerta']);
    app.controller('EjemploController', function ($scope, DtoAlerta) {

    $scope.objAlerta = DtoAlerta.objAlerta;
    $scope.objAlerta.setObjAlerta('alerta-ul', 'alert alert-success', 'flipInY', 'flipOutY', 4000);

    $scope.setAlerta = function () {
        $scope.objAlerta.addAlerta('Este es un mensaje de prueba :D!!!', 'fa fa-user pad-right-15');
    };
});
 
 */
var appAlerta = angular.module('FgAlerta', []);

appAlerta.directive('fgAlerta', function () {
    return {
        template: '' +
                '<ul class="{{objAlerta.claseUl}}">' +
                '<li ng-repeat="obj in objAlerta.listAlerta track by $index" ng-show="obj.ocultar" class="{{objAlerta.claseLi}} animated {{objAlerta.claseIn}} {{obj.claseOut}}">' +
                '<i class="{{obj.icono}}"></i>{{obj.mensaje}}' +
                '</li>' +
                '</ul>'
    };
});
appAlerta.factory('DtoAlerta', function ($timeout) {
    return{objAlerta: {
            claseUl: null,
            claseLi: null,
            claseIn: null,
            claseOut: null,
            tiempo: 0,
            listAlerta: [],
            setObjAlerta: function (claseUl, claseLi, claseIn, claseOut, tiempo) {
                this.claseUl = claseUl;
                this.claseLi = claseLi;
                this.claseIn = claseIn;
                this.claseOut = claseOut;
                this.tiempo = tiempo;
            },
            addAlerta: function (mensaje, icono) {
                var obj = {id: generateId(), mensaje: mensaje, icono: icono, ocultar: true};
                this.listAlerta.push(obj);
                var list = this.listAlerta;
                var out = this.claseOut;
                $timeout(function () {
                    angular.forEach(list, function (value) {
                        if (value.id === obj.id) {
                            value.claseOut = out;
                            $timeout(function () {
                                value.ocultar = false;
                            }, 500);
                        }
                    });
                }, this.tiempo);
            }
        }
    };
    function generateId() {
        var t = "";
        var p = "qwertyuiopasdfghjklzxcvbnm";
        for (var i = 0; i < 10; i++)
            t += p.charAt(Math.floor(Math.random() * p.length));
        return t;
    }
});
