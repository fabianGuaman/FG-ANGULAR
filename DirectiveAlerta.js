/*

    DIRECTIVE ALERTA
    ----------------
    <script src="DirectiveAlerta.js" type="text/javascript"></script>
 
    var app = angular.module('todoApp', ['FgAlerta']);
    app.controller('TodoListController', function ($scope, DtoAlerta) {
    
        $scope.objAlerta = DtoAlerta.objAlerta;
        $scope.objAlerta.setObjAlerta('clase-ul', 'clase-li', 'clase-efect-in', 'clase-efect-out);

        $scope.addMensaje = function (mensaje) {
            $scope.objAlerta.addAlerta(mensaje);
        };
    );
 
 */
var appAlerta = angular.module('FgAlerta', []);

appAlerta.directive('fgAlerta', function () {
    return {
        template: '' +
                '<ul class="{{objAlerta.claseUl}}">' +
                '<li ng-repeat="obj in objAlerta.listAlerta track by $index" ng-show="obj.ocultar" class="{{objAlerta.claseLi}} animated {{objAlerta.claseIn}} {{obj.claseOut}}">' +
                '{{obj.mensaje}}' +
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
            listAlerta: [],
            setObjAlerta: function (claseUl, claseLi, claseIn, claseOut) {
                this.claseUl = claseUl;
                this.claseLi = claseLi;
                this.claseIn = claseIn;
                this.claseOut = claseOut;
            },
            addAlerta: function (mensaje) {
                var obj = {id: generateId(), mensaje: mensaje, ocultar: true};
                this.listAlerta.push(obj);
                var aux = this.listAlerta;
                var out = this.claseOut;
                $timeout(function () {
                    angular.forEach(aux, function (value) {
                        if (value.id === obj.id) {
                            value.claseOut = out;
                            $timeout(function () {
                                value.ocultar = false;
                            }, 500);
                        }
                    });
                }, 4000);
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