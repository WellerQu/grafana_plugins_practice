'use strict';

System.register(['app/plugins/sdk', 'lodash', 'app/core/utils/kbn', 'echarts'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, kbn, echarts, _slicedToArray, _createClass, Controller;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_appCoreUtilsKbn) {
            kbn = _appCoreUtilsKbn.default;
        }, function (_echarts) {
            echarts = _echarts.default;
        }],
        execute: function () {
            _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;

                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);

                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }

                    return _arr;
                }

                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('Controller', Controller = function (_MetricsPanelCtrl) {
                _inherits(Controller, _MetricsPanelCtrl);

                function Controller($scope, $injector, $rootScope) {
                    _classCallCheck(this, Controller);

                    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this, $scope, $injector));

                    _this.$rootScope = $rootScope;

                    // 定义默认配置项
                    var optionDefaults = {
                        pieType: 'pie',
                        legend: {
                            show: true, // disable/enable legend
                            values: true
                        },
                        links: [],
                        datasource: null,
                        maxDataPoints: 3,
                        interval: null,
                        targets: [{}],
                        cacheTimeout: null,
                        nullPointMode: 'connected',
                        legendType: 'Under graph',
                        aliasColors: {},
                        format: 'short',
                        valueName: 'current',
                        strokeWidth: 1,
                        fontSize: '80%',
                        combine: {
                            threshold: 0.0,
                            label: 'Others'
                        }
                    };

                    console.dir(_this.panel);
                    _.defaults(_this.panel, optionDefaults);
                    _.defaults(_this.panel.legend, optionDefaults.legend);

                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    return _this;
                }

                _createClass(Controller, [{
                    key: 'onRender',
                    value: function onRender() {
                        console.info('onRender trigger');
                        console.trace();
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        var _this2 = this;

                        console.info('onDataReceived trigger');
                        console.trace();

                        console.log('didi--------------');

                        var _dataList = _slicedToArray(dataList, 1),
                            data = _dataList[0];

                        console.dir(data);
                        this.xAxis = [];
                        this.seriesData = [];

                        if (data) {
                            data.rows.forEach(function (_ref) {
                                var _ref2 = _slicedToArray(_ref, 2),
                                    kills = _ref2[0],
                                    killer = _ref2[1];

                                _this2.seriesData.push(kills);
                                _this2.xAxis.push(killer);
                            });
                        }

                        this.render();
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError() {
                        console.info('onDataError trigger');
                        console.trace();

                        this.data.xAxis = [];
                        this.data.seriesData = [];
                        this.render(); // 渲染界面
                    }
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        console.info('onInitEditMode trigger');
                        console.trace();

                        this.addEditorTab('Options', 'public/plugins/practice-panel/partials/module.editor.html', 2);
                        this.unitFormats = kbn.getUnitFormats();
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        console.info('link trigger');
                        console.trace();

                        ctrl.events.on('render', function () {
                            renderHandler(false);
                        });

                        var dom = elem.find('.practice-panel'),
                            // DOM
                        panel = void 0,
                            // 配置
                        myChart = void 0; // echarts实例

                        function renderHandler(incrementRenderCounter) {
                            if (!ctrl.xAxis || !ctrl.seriesData) {
                                return;
                            }

                            panel = ctrl.panel;

                            if (setElementHeight()) {
                                if (!myChart) myChart = echarts.init(dom.get(0));

                                buildChart();
                            }

                            if (incrementRenderCounter) {
                                ctrl.renderingCompleted();
                            }
                        }

                        function setElementHeight() {
                            try {
                                var height = ctrl.height || panel.height || ctrl.row.height;
                                if (_.isString(height)) {
                                    height = parseInt(height.replace('px', ''), 10);
                                }

                                height -= 5; // padding
                                height -= panel.title ? 24 : 9; // subtract panel title bar

                                dom.css('height', height + 'px');

                                return true;
                            } catch (e) {
                                // IE throws errors sometimes
                                return false;
                            }
                        }

                        function buildChart() {
                            var xAxis = ctrl.xAxis,
                                seriesData = ctrl.seriesData;

                            // 指定图表的配置项和数据
                            var option = {
                                title: {
                                    text: 'ECharts 入门示例'
                                },
                                tooltip: {},
                                legend: {
                                    data: ['击杀']
                                },
                                xAxis: {
                                    data: [].concat(_toConsumableArray(xAxis))
                                },
                                yAxis: {},
                                series: [{
                                    name: '击杀',
                                    type: 'bar',
                                    data: [].concat(_toConsumableArray(seriesData))
                                }]
                            };

                            // 使用刚指定的配置项和数据显示图表。
                            myChart.setOption(option);
                        }
                    }
                }]);

                return Controller;
            }(MetricsPanelCtrl));

            _export('Controller', Controller);

            Controller.templateUrl = './partials/module.html';
        }
    };
});
//# sourceMappingURL=controller.js.map
