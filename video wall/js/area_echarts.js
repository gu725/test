/*   */
$(function () {
    map();
    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
var data = [
    {name: '北京', value: 200},
    {name: '上海', value: 300},
    {name: '广东', value: 400},
    {name: '江苏', value: 300},
    {name: '浙江', value: 200},
    {name: '山东', value: 300},
    {name: '河南', value: 400},
    {name: '河北', value: 300},
    {name: '湖南', value: 200},
    {name: '湖北', value: 200},
    {name: '四川', value: 300},
    {name: '陕西', value: 200},
    {name: '重庆', value: 200},
    {name: '辽宁', value: 200},
    {name: '吉林', value: 100},
    {name: '黑龙江', value: 150},
    {name: '安徽', value: 200},
    {name: '江西', value: 200},
    {name: '福建', value: 200},
    {name: '新疆', value: 150},
    {name: '甘肃', value: 100},
    {name: '宁夏', value: 50},
    {name: '青海', value: 50},
    {name: '西藏', value: 20},
    {name: '海南', value: 50},
    {name: '山西', value: 100},
    {name: '贵州', value: 100},
    {name: '台湾', value: 200},
    {name: '香港', value: 100},
    {name: '澳门', value: 20}
];
var geoCoordMap = {
    '北京': [116.4074, 39.9042],
    '上海': [121.4737, 31.2304],
    '广东': [113.7633, 23.3790],
    '江苏': [118.7778, 32.0617],
    '浙江': [120.1536, 29.1832],
    '山东': [118.1689, 36.6681],
    '河南': [113.7530, 34.7655],
    '河北': [114.5149, 38.0428],
    '湖南': [112.9836, 28.1129],
    '湖北': [114.3055, 30.5931],
    '四川': [104.0665, 30.6594],
    '陕西': [108.9526, 34.2655],
    '重庆': [106.5516, 29.5630],
    '辽宁': [123.4291, 41.8057],
    '吉林': [126.6425, 43.8864],
    '黑龙江': [126.6613, 45.7423],
    '安徽': [117.2272, 31.8206],
    '江西': [115.6222, 27.6144],
    '福建': [119.2967, 26.0789],
    '新疆': [87.5120, 43.7930],
    '甘肃': [103.8342, 36.0595],
    '宁夏': [106.2782, 38.4616],
    '青海': [101.7787, 36.6171],
    '西藏': [91.1326, 29.6460],
    '海南': [110.1314, 20.0220],
    '山西': [112.5624, 37.8734],
    '贵州': [106.8748, 26.8154],
    '台湾': [120.9605, 23.6978],
    '香港': [114.1095, 22.3964],
    '澳门': [113.5439, 22.1987]
};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
   // backgroundColor: '#404a59',
  /***  title: {
        text: '实时行驶车辆',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },**/
    tooltip : {
        trigger: 'item',
		formatter: function (params) {
              if(typeof(params.value)[2] == "undefined"){
              	return params.name + ' : ' + params.value;
              }else{
              	return params.name + ' : ' + params.value[2];
              }
            }
    },
  
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,//禁止其放大缩小
        itemStyle: {
            normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
            },
            emphasis: {
                areaColor: '#293fff'
            }
        }
    },
    series : [
        {
            name: '消费金额',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 15;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffeb7b'
                }
            }
        }
		
		/**
		,
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffd800',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,.3)'
                }
            },
            zlevel: 1
        }
		**/
    ]
};
		
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

})

