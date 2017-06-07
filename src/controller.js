import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import echarts from 'echarts';

export class Controller extends MetricsPanelCtrl {
    constructor($scope, $injector, $rootScope) {
        super($scope, $injector);
        this.$rootScope = $rootScope;

        // 定义默认配置项
        const optionDefaults = {
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

        console.dir(this.panel);
        _.defaults(this.panel, optionDefaults);
        _.defaults(this.panel.legend, optionDefaults.legend);

        this.events.on('render', this.onRender.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-error', this.onDataError.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    }

    onRender() {
        console.info('onRender trigger')
        console.trace();
    }

    onDataReceived(dataList) {
        console.info('onDataReceived trigger')
        console.trace();

        console.log('didi--------------')
        const [ data ] = dataList;
        console.dir(data);
        this.xAxis = [];
        this.seriesData = [];

        if (data) {
            data.rows.forEach(([kills, killer]) => {
                this.seriesData.push(kills);
                this.xAxis.push(killer);
            });
        }

        this.render();
    }

    onDataError() {
        console.info('onDataError trigger')
        console.trace();

        this.xAxis = [];
        this.seriesData = [];
        this.render(); // 渲染界面
    }

    onInitEditMode() {
        console.info('onInitEditMode trigger')
        console.trace();

        this.addEditorTab('Options', 'public/plugins/practice-panel/partials/module.editor.html', 2);
        this.unitFormats = kbn.getUnitFormats();
    }

    link(scope, elem, attrs, ctrl) {
        console.info('link trigger')
        console.trace();

        ctrl.events.on('render', () => {
            renderHandler(false);
        });

        let dom = elem.find('.practice-panel'), // DOM
            panel, // 配置
            myChart; // echarts实例

        function renderHandler(incrementRenderCounter) {
            if (!ctrl.xAxis || !ctrl.seriesData) { return; }

            panel = ctrl.panel;

            if (setElementHeight()) {
                if (!myChart)
                    myChart = echarts.init(dom.get(0));

                buildChart();
            } 

            if (incrementRenderCounter){
                ctrl.renderingCompleted();
            }
        }

        function setElementHeight() {
            try {
                let height = ctrl.height || panel.height || ctrl.row.height;
                if (_.isString(height)) {
                    height = parseInt(height.replace('px', ''), 10);
                }

                height -= 5; // padding
                height -= panel.title ? 24 : 9; // subtract panel title bar

                dom.css('height', height + 'px');

                return true;
            } catch(e) { // IE throws errors sometimes
                return false;
            }
        }

        function buildChart() {
            const { xAxis, seriesData } = ctrl;
            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['击杀']
                },
                xAxis: {
                    data: [...xAxis]
                },
                yAxis: {},
                series: [{
                    name: '击杀',
                    type: 'bar',
                    data: [...seriesData]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);     
        }
    }

}

Controller.templateUrl = './partials/module.html';
