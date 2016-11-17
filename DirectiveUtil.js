app.directive('enter', function () {
    return function (scope, element, attr) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attr.enter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('rut', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, modelCtrl) {
            var rut = function (inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                } else {
                    var r = inputValue.replace('-', '').replace('.', '');
                    if (r.length > 2) {
                        r = r.substring(0, r.length - 1) + '-' + r.substring(r.length - 1, r.length);
                    }
                    if (r !== inputValue) {
                        modelCtrl.$setViewValue(r);
                        modelCtrl.$render();
                    }

                    return r;
                }
            };
            modelCtrl.$parsers.push(rut);
            rut(scope[attr.ngModel]);
        }
    };
});
app.directive('number', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
app.directive('upper', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var upper = function (inputValue) {
                if (inputValue === undefined)
                    inputValue = '';
                var u = inputValue.toUpperCase();
                if (u !== inputValue) {
                    modelCtrl.$setViewValue(u);
                    modelCtrl.$render();
                }
                return u;
            };
            modelCtrl.$parsers.push(upper);
            upper(scope[attrs.ngModel]);
        }
    };
});

app.directive('lower', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var lower = function (inputValue) {
                if (inputValue === undefined)
                    inputValue = '';
                var l = inputValue.toLowerCase();
                if (l !== inputValue) {
                    modelCtrl.$setViewValue(l);
                    modelCtrl.$render();
                }
                return l;
            };
            modelCtrl.$parsers.push(lower);
            lower(scope[attrs.ngModel]);
        }
    };
});