let yuanoption  = {
    title: {
        left: 'center',
        text: '数量',
        textStyle:{
            color:"#fff"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        textStyle: { //图例文字的样式
            color: '#fff',
        },
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};

let zheoption  = {
    title: {
        left: 'center',
        text: '折线图堆叠',
        textStyle:{
            color:"#fff"
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
            lineStyle: {
                color: "#fff",
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: "#fff",
            }
        }
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
    ]
};
let cirleoption  = {
    title: {
        text: '签约率统计',
        left: 'center',
        textStyle:{
            color:"#fff"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    series: [
        {
            name: '姓名',
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            data: [
                {value: 335, name: '手表系统'},
                {value: 310, name: '血压系统'},
                {value: 234, name: '心电系统'},
                {value: 135, name: '广告系统'},
                {value: 1548, name: '呼吸系统'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

var geoCoordMap = {//自定义城市坐标
    "通州区":[116.662928,39.917001],
    "东城区":[116.42272,39.934579],
    "丰台区":[116.293105,39.865042],
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


export const getmap = (data)=>{
                return  {
                    tooltip: {
                      show: false
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b})'
                    },
                    geo: {
                      map: "北京",
                      roam: false,// 一定要关闭拖拽
                    //   zoom: 1.12,
                    //   center: [105, 36], // 调整地图位置
                      label: {
                        normal: {
                          show: true, //关闭省份名展示
                          fontSize: "10",
                          color: "#fffff"
                        },
                        emphasis: {
                          show: false
                        }
                      },
                      itemStyle: {
                        normal: {
                          areaColor: "#0d0059",
                          borderColor: "#389dff",
                          borderWidth: 1, //设置外层边框
                          shadowBlur: 5,
                          shadowOffsetY: 8,
                          shadowOffsetX: 0,
                          shadowColor: "#01012a"
                        },
                        emphasis: {
                          areaColor: "#184cff",
                          shadowOffsetX: 0,
                          shadowOffsetY: 0,
                          shadowBlur: 5,
                          borderWidth: 0,
                          shadowColor: "rgba(0, 0, 0, 0.5)"
                        },
                
                      }
                    },
                    series: [
                      {
                        type: "map",
                        map: "北京",
                        // mapType: 'china',
                        roam: false,
                        // zoom: 1.12,
                        // center: [105, 36],
                        // geoIndex: 1,
                        // aspectScale: 0.75, //长宽比
                        // showLegendSymbol: false, // 存在legend时显示
                        label: {
                          normal: {
                            show: false,
                            textStyle: {
                                color: "#fff"
                              }
                          },
                          emphasis: {
                            show: false,
                            textStyle: {
                              color: "#fff"
                            }
                          }
                        },
                        itemStyle: {
                          normal: {
                            areaColor: "#0d0059",
                            borderColor: "#389dff",
                            borderWidth: 0.5
                          },
                          emphasis: {
                            areaColor: "#17008d",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 5,
                            borderWidth: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                          }
                        },
                        // 地图系列中的数据内容数组，数组项可以为单个数值
                         data: [
                             { name: '延庆区', value: 31.4, lng: 115.981186, lat: 40.462706 },
                             { name: '怀柔区', value: 38.4, lng: 116.63853, lat: 40.322563 },
                             { name: '密云区', value: 47.9, lng: 116.849551, lat: 40.382999 },
                             { name: '昌平区', value: 196.3, lng: 116.237832, lat: 40.226854 },
                             { name: '顺义区', value: 102, lng: 116.663242, lat: 40.1362 },
                             { name: '平谷区', value: 42.3, lng: 117.128025, lat: 40.147115 },
                             { name: '门头沟区', value: 30.8, lng: 116.108179, lat: 39.94648 },
                             { name: '海淀区', value: 369.4, lng: 116.304872, lat: 39.96553 },
                             { name: '石景山区', value: 65.2, lng: 116.229612, lat: 39.912017 },
                             { name: '西城区', value: 129.8, lng: 116.372397, lat: 39.918561 },
                             { name: '东城区', value: 90.5, lng: 116.42272, lat: 39.934579 },
                             { name: '朝阳区', value: 395.5, lng: 116.449767, lat: 39.927254 },
                             { name: '通州区', value: 137.8, lng: 116.662928, lat: 39.917001 },
                             { name: '大兴区', value: 156.2, lng: 116.348053, lat: 39.732833 },
                             { name: '房山区', value: 104.6, lng: 116.149892, lat: 39.755039 },
                             { name: '丰台区', value: 232.4, lng: 116.293105, lat: 39.865042 }
                           ],
                      },
                      {
                        name: '',
                        type: 'effectScatter',//影响散点
                        coordinateSystem: 'geo',
                            symbolSize: 12,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    color: '#fff',
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
                                    color: '#fff',
                                    shadowBlur: 10,
                                    shadowColor: '#fff'
                                },
                            },
                        data: convertData([
                            {name: "通州区"},
                            {name: "东城区"},
                            {name: "丰台区"},
                        ]),
                    }
                    ]
                  };

}
export const getAgeList = (data)=>{
    let List  =[]
    let precent = []
    data.items.map(item=>{
        List.push(item.totalCount)
    })
    data.items.map(item=>{
        precent.push(item.patientSignRate)
    })
    return  {
        color: ['#3398DB'],
        title: {
            left: 'center',
            text: '年龄统计',
            textStyle:{
                color:"#fff"
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top:"10%",
            // bottom: '-3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['40岁以下', '40-50岁', '50-60岁', '60-70岁', '70-80岁', '80岁以上'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                }
            },
            {

            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100,
                axisLine: {
                    lineStyle: {
                        color: "#fff",
                    }
                }
            }
        ],
        series: [
            {
                name: '总人数',
                type: 'bar',
                barWidth: '60%',
                data: List
            },
            {
                name: '比率',
                type: 'line',
                data: precent
            },
        ]
    };
}
export const parentPrecent =(DATA)=>{
    let xvalue = []
    DATA.items.map(item=>{
        xvalue.push(item.caption)
    })
    let yvalue1=[],yvalue2=[]
    DATA.items.map(item=>{
        yvalue1.push(item.totalPatients)
    })
    DATA.items.map(item=>{
        yvalue2.push(item.patientSignRate)
    })
    return {
        title: {
            text: '近6个月患者新增趋势',
            left: 'center',
            textStyle:{
                color:"#fff"
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top:"7%",
            data: ['患者人数'],
            textStyle:{
                color:"#fff"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            // bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xvalue,
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }
        },
        yAxis: {
            type: 'value',
            min:0,
            max:DATA.maxPatientCount,
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }
        },
        series: [
            {
                name: '患者人数',
                type: 'line',
                stack: '总量',
                data: yvalue1,
                areaStyle: {}
            },
            // {
            //     name: '签约率',
            //     type: 'line',
            //     stack: '总量',
            //     data:  yvalue2
            // },
        ]
    }
}
export const alarm = (DATA)=>{//近6个月报警新增
    let xvalue = []
    DATA.items.map(item=>{
        xvalue.push(item.caption)
    })
    let yvalue1=[]
    DATA.items.map(item=>{
        yvalue1.push(item.totalCount)
    })
    return {
        title: {
            text: '近6个月报警新增趋势',
            left: 'center',
            textStyle:{
                color:"#fff"
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            // bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xvalue,
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }
        },
        yAxis: {
            type: 'value',
            min:0,
            max:DATA.maxPatientCount,
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }
        },
        series: [
            {
                name: '报警次数',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                itemStyle : {  
                    normal : {  
                        lineStyle:{  
                            color:'#ffff00'  
                        }  
                    }  
                },  
                data: yvalue1,
            }
        ]
    }
}
export const pie = (DATA)=>{

return {
    title: {
        text: '设备发放信息',
        left: 'center',
        textStyle:{
            color:"#fff"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        top:"6%",
        right : 'right',
        data: ['实际发放数量', '待发放数'],
        textStyle:{
            color:"#fff"
        }
    },
    series: [
        {
            name: '设备发放信息',
            type: 'pie',
            radius: '40%',
            center: ['50%', '40%'],
            data: [
                {value: DATA.realProvideCount, name: '实际发放数量',itemStyle:{color:"#FFD700"}},
                {value: DATA.needProvideCount, name: '待发放数',itemStyle:{color:"#FF7F00"}},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
}
export const cricle  = (datas)=>{
// var value = precent1, // 值，0~1之间
// startAngle = 215, // 开始角度
// endAngle = -35, // 结束角度
// splitCount = 40, // 刻度数量
// pointerAngle = (startAngle - endAngle) * (1 - value) + endAngle; // 当前指针（值）角度

// var value1 =precent2, // 值，0~1之间
// startAngle1 = 335, // 开始角度
// endAngle1 = 30, // 结束角度
// splitCount1 = 40, // 刻度数量
// pointerAngle1 = (startAngle1 - endAngle1) * (1 - value1) + endAngle1; // 当前指针（值）角度

// var value2 = precent3, // 值，0~1之间
// startAngle2 = 150, // 开始角度
// endAngle2 = -155, // 结束角度
// splitCount2 = 40, // 刻度数量
// pointerAngle2 = (startAngle2 - endAngle2) * (1 - value2) + endAngle2; // 当前指针（值）角度
    //  return   {
    //     tooltip: {
    //         formatter: '{a} <br/>{b} : {c}%'
    //     },
    //     series: [
    //         {
    //             type: 'gauge',
    //             radius: '90%',
    //             startAngle: pointerAngle,
    //             endAngle: endAngle,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 27,
    //               splitNumber: Math.ceil((1 - value) * splitCount),
    //               lineStyle: {
    //                 color: '#001242',
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             // markPoint: {
    //             //   animation: false,
    //             //   silent: false,
    //             //   data: [
    //             //     {
    //             //       symbol: 'image://'+ document.getElementById('round').src,
    //             //       x: '50%',
    //             //       y: '50%',
    //             //       symbolSize: 280,
    //             //       itemStyle: {
    //             //         borderWidth: 3
    //             //       }
    //             //     },
    //             //     {
    //             //       symbol: 'circle',
    //             //       symbolSize: 200
    //             //     }
    //             //   ]
    //             // },
    //             data: [
    //               {
    //                 value: value,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '90%',
    //             startAngle: startAngle,
    //             endAngle: pointerAngle,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 27,
    //               splitNumber: Math.ceil(value * splitCount),
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '95%',
    //             startAngle: pointerAngle,
    //             endAngle: pointerAngle,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: {
    //                  show: true,
    //                  offsetCenter:["3%","-10%"],
    //                  color:'#FCFF00',
    //                  formatter:(name)=>{
    //                      return Number(name*100).toFixed(1)+'%'+'\n'+'患者签约率'
    //                  }
    //             },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 20,
    //               splitNumber: 1,
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {//左边
    //             type: 'gauge',
    //             radius: '60%',
    //             center:["15%","50%"],
    //             startAngle: pointerAngle1,
    //             endAngle: endAngle1,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 15,
    //               splitNumber: Math.ceil((1 - value1) * splitCount1),
    //               lineStyle: {
    //                 color: '#001242',
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             // markPoint: {
    //             //   animation: false,
    //             //   silent: false,
    //             //   data: [
    //             //     {
    //             //       symbol: 'image://'+ document.getElementById('round').src,
    //             //       x: '50%',
    //             //       y: '50%',
    //             //       symbolSize: 280,
    //             //       itemStyle: {
    //             //         borderWidth: 3
    //             //       }
    //             //     },
    //             //     {
    //             //       symbol: 'circle',
    //             //       symbolSize: 200
    //             //     }
    //             //   ]
    //             // },
    //             data: [
    //               {
    //                 value: value1,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '60%',
    //             center:["15%","50%"],
    //             startAngle: startAngle1,
    //             endAngle: pointerAngle1,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 15,
    //               splitNumber: Math.ceil(value1 * splitCount1),
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value1,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '65%',
    //             center:["15%","50%"],
    //             startAngle: pointerAngle1,
    //             endAngle: pointerAngle1,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: {
    //                  show: true,
    //                  offsetCenter:["3%","-5%"],
    //                  color:'#FCFF00',
    //                  fontSize:'20',
    //                  formatter:(name)=>{
    //                      return Number(name*100).toFixed(1)+'%'+'\n'+'及时处理率'
    //                  }
    //             },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 20,
    //               splitNumber: 1,
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value1,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {//右边
    //             type: 'gauge',
    //             radius: '60%',
    //             center:["85%","50%"],
    //             startAngle: pointerAngle2,
    //             endAngle: endAngle2,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 15,
    //               splitNumber: Math.ceil((1 - value2) * splitCount2),
    //               lineStyle: {
    //                 color: '#001242',
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             // markPoint: {
    //             //   animation: false,
    //             //   silent: false,
    //             //   data: [
    //             //     {
    //             //       symbol: 'image://'+ document.getElementById('round').src,
    //             //       x: '50%',
    //             //       y: '50%',
    //             //       symbolSize: 280,
    //             //       itemStyle: {
    //             //         borderWidth: 3
    //             //       }
    //             //     },
    //             //     {
    //             //       symbol: 'circle',
    //             //       symbolSize: 200
    //             //     }
    //             //   ]
    //             // },
    //             data: [
    //               {
    //                 value: value2,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '60%',
    //             center:["85%","50%"],
    //             startAngle: startAngle2,
    //             endAngle: pointerAngle2,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: { show: false },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 15,
    //               splitNumber: Math.ceil(value2 * splitCount2),
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value2,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //           {
    //             type: 'gauge',
    //             radius: '65%',
    //             center:["85%","50%"],
    //             startAngle: pointerAngle2,
    //             endAngle: pointerAngle2,
    //             splitNumber: 1,
    //             axisLine: {
    //               show: false,
    //               lineStyle: {
    //                 width: 3,
    //                 opacity: 0
    //               }
    //             },
    //             title: { show: false },
    //             detail: {
    //                  show: true,
    //                  offsetCenter:["3%","-5%"],
    //                  color:'#FCFF00',
    //                  fontSize:'20',
    //                  formatter:(name)=>{
    //                      return Number(name*100).toFixed(1)+'%'+'\n'+'设备发放率'
    //                  }
    //             },
    //             splitLine: { show: false },
    //             axisTick: {
    //               length: 20,
    //               splitNumber: 1,
    //               lineStyle: {
    //                 color: {
    //                   image: document.getElementById('bg_img'),
    //                   repeat: 'no-repeat'
    //                 },
    //                 width: 3
    //               }
    //             },
    //             axisLabel: { show: false },
    //             pointer: { show: false },
    //             itemStyle: {},
    //             data: [
    //               {
    //                 value: value2,
    //                 name: 'test gauge'
    //               }
    //             ]
    //           },
    //       ]
    // };
  var  data = { //显示的数据
      "name": '患者签约率',
      "num": datas
  }
 var  max = 100 //最大馆藏量
 return  {
        angleAxis: {
          show: false,
          max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
          type: 'value',
          startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
          splitLine: {
              show: false //隐藏坐标
          }
      },
      barMaxWidth: 18, //圆环宽度
      radiusAxis: { //隐藏坐标
          show: false,
          type: 'category',
      },
      polar: { //设置圆环位置和大小
          center: ['50%', '55%'],
          radius: '280'
      },
      series: [
        {
              type: 'bar',
              data: [{ //上层圆环，用于显示真实数据
                  value: data.num,
                  itemStyle: {
                      color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 1, //从左到右 0-1
                          y2: 0,
                          colorStops: [{
                              offset: 0,
                              color: '#CD48AE' // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: '#2CABFC' // 100% 处的颜色
                          }],
                          globalCoord: false // 缺省为 false
                      },
                      shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                      shadowBlur: 10
                  }
              }],
              barGap: '-100%', //柱间距离,用来将上下两层圆环重合
              coordinateSystem: 'polar', //类型，极坐标
              roundCap: true, //顶端圆角
              z: 2 //圆环层级，和zindex相似
          }, { //下层圆环，用于显示最大值
              type: 'bar',
              data: [{
                  value: max,
                  itemStyle: {
                      color: '#265195',
                      shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                      shadowBlur: 5,
                      shadowOffsetY: 2
                  }
              }],
              barGap: '-100%', //柱间距离,用来将上下两层圆环重合
              coordinateSystem: 'polar', //类型，极坐标
              roundCap: true, //顶端圆角
              z: 1 //圆环层级，和zindex相似
          },
          { //仪表盘
              type: 'gauge',
              radius: '88%',
              center:["50%","55%"],
              startAngle: 210, //起始角度，同极坐标
              endAngle: -30, //终止角度，同极坐标
              max: max,
              splitNumber: 5, //分割线个数（除原点外）
              axisLine: { // 坐标轴线
                  show: false
              },
              pointer: {
                  show: false
              },
              axisLabel: {
                  // 坐标轴数字
                  textStyle: {
                      fontSize: 8,
                      color: "#13B5FC"
                  },
  
              },
              axisTick: { // 坐标轴标记
                  length: 10,
                  lineStyle: {
                      color: "#13B5FC"
                  }
              },
              splitLine: { // 分隔线
                  length: 5,
                  lineStyle: {
                      width: 1,
                  }
              },
              title: { //标题，显示'馆藏量'
                  textStyle: {
                      color: '#fff',
                      shadowColor: '#fff',
                      fontSize: 30
                  },
                  offsetCenter: ["0", '-35%'] //位置偏移
              },
              detail: { //仪表盘数值
                  formatter: function (params) {
                      var name = data.num.toString()
                      var list = ''
                      for (var i = 0; i < name.length; i++) {
                          list += '{value|' + name[i] + '}' //每个数字用border隔开
                          if (i !== name.length - 1) {
                              list += '{margin|}' //添加margin值
                          }
                      }
                      list +='{margin|}{value|%}'
                      return [list]
                  },
                  offsetCenter: ["0", '7%'],
                  rich: { //编辑富文本样式
                      value: {
                          width: 34,
                          height: 42,
                          borderColor: '#02A0F0',
                          borderWidth: 2,
                          borderRadius: 5,
                          lineHeight: 1000,
                          fontSize: 36,
                          padding: [0, 0, 4, 0],
                          color: '#fff',
                          shadowColor: 'rgb(2,157,239)',
                          shadowBlur: 5
                      },
                      margin: {
                          width: 8,
                          height: 42,
                      }
                  }
  
              },
              data: [{
                  value: data.num,
                  name: data.name
              }]
          },
        {
              type: 'bar',
              data: [{ //上层圆环，用于显示真实数据
                  value: data.num,
                  itemStyle: {
                      color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 1, //从左到右 0-1
                          y2: 0,
                          colorStops: [{
                              offset: 0,
                              color: '#CD48AE' // 0% 处的颜色
                          }, {
                              offset: 1,
                              color: '#2CABFC' // 100% 处的颜色
                          }],
                          globalCoord: false // 缺省为 false
                      },
                      shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                      shadowBlur: 10
                  }
              }],
              barGap: '-100%', //柱间距离,用来将上下两层圆环重合
              coordinateSystem: 'polar', //类型，极坐标
              roundCap: true, //顶端圆角
              z: 2 //圆环层级，和zindex相似
          }, { //下层圆环，用于显示最大值
              type: 'bar',
              data: [{
                  value: max,
                  itemStyle: {
                      color: '#265195',
                      shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                      shadowBlur: 5,
                      shadowOffsetY: 2
                  }
              }],
              barGap: '-100%', //柱间距离,用来将上下两层圆环重合
              coordinateSystem: 'polar', //类型，极坐标
              roundCap: true, //顶端圆角
              z: 1 //圆环层级，和zindex相似
          },
          { //仪表盘
              type: 'gauge',
              radius: '88%',
              center:["50%","55%"],
              startAngle: 210, //起始角度，同极坐标
              endAngle: -30, //终止角度，同极坐标
              max: max,
              splitNumber: 5, //分割线个数（除原点外）
              axisLine: { // 坐标轴线
                  show: false
              },
              pointer: {
                  show: false
              },
              axisLabel: {
                  // 坐标轴数字
                  textStyle: {
                      fontSize: 8,
                      color: "#13B5FC"
                  },
  
              },
              axisTick: { // 坐标轴标记
                  length: 10,
                  lineStyle: {
                      color: "#13B5FC"
                  }
              },
              splitLine: { // 分隔线
                  length: 5,
                  lineStyle: {
                      width: 1,
                  }
              },
              title: { //标题，显示'馆藏量'
                  textStyle: {
                      color: '#fff',
                      shadowColor: '#fff',
                      fontSize: 30
                  },
                  offsetCenter: ["0", '-35%'] //位置偏移
              },
              detail: { //仪表盘数值
                  formatter: function (params) {
                      var name = data.num.toString()
                      var list = ''
                      for (var i = 0; i < name.length; i++) {
                          list += '{value|' + name[i] + '}' //每个数字用border隔开
                          if (i !== name.length - 1) {
                              list += '{margin|}' //添加margin值
                          }
                      }
                      list +='{margin|}{value|%}'
                      return [list]
                  },
                  offsetCenter: ["0", '7%'],
                  rich: { //编辑富文本样式
                      value: {
                          width: 34,
                          height: 42,
                          borderColor: '#02A0F0',
                          borderWidth: 2,
                          borderRadius: 5,
                          lineHeight: 1000,
                          fontSize: 36,
                          padding: [0, 0, 4, 0],
                          color: '#fff',
                          shadowColor: 'rgb(2,157,239)',
                          shadowBlur: 5
                      },
                      margin: {
                          width: 8,
                          height: 42,
                      }
                  }
  
              },
              data: [{
                  value: data.num,
                  name: data.name
              }]
          }
      ]      
      }
}
export const cricle1  = (datas)=>{
  var  data = { //显示的数据
    "name": '及时处理率',
    "num": datas
}
var  max = 100 //最大馆藏量
return  {
      angleAxis: {
        show: false,
        max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
        type: 'value',
        startAngle: 295, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
        splitLine: {
            show: false //隐藏坐标
        }
    },
    barMaxWidth: 10, //圆环宽度
    radiusAxis: { //隐藏坐标
        show: false,
        type: 'category',
    },
    polar: { //设置圆环位置和大小
        center: ['70%', '55%'],
        radius: '150'
    },
    series: [
      {
            type: 'bar',
            data: [{ //上层圆环，用于显示真实数据
                value: data.num,
                itemStyle: {
                    color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右 0-1
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#CD48AE' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#2CABFC' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 10
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 2 //圆环层级，和zindex相似
        }, { //下层圆环，用于显示最大值
            type: 'bar',
            data: [{
                value: max,
                itemStyle: {
                    color: '#265195',
                    shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 5,
                    shadowOffsetY: 2
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 1 //圆环层级，和zindex相似
        },
        { //仪表盘
            type: 'gauge',
            radius: '90%',
            center:["70%","55%"],
            startAngle: 295, //起始角度，同极坐标
            endAngle: 50, //终止角度，同极坐标
            max: max,
            splitNumber: 5, //分割线个数（除原点外）
            axisLine: { // 坐标轴线
                show: false
            },
            pointer: {
                show: false
            },
            axisLabel: {
                // 坐标轴数字
                textStyle: {
                    fontSize: 8,
                    color: "#13B5FC"
                },

            },
            axisTick: { // 坐标轴标记
                length: 10,
                lineStyle: {
                    color: "#13B5FC"
                }
            },
            splitLine: { // 分隔线
                length: 5,
                lineStyle: {
                    width: 1,
                }
            },
            title: { //标题，显示'馆藏量'
                textStyle: {
                    color: '#fff',
                    shadowColor: '#fff',
                    fontSize: 12
                },
                offsetCenter: ["0", '-35%'] //位置偏移
            },
            detail: { //仪表盘数值
                formatter: function (params) {
                    var name = data.num.toString()
                    var list = ''
                    for (var i = 0; i < name.length; i++) {
                        list += '{value|' + name[i] + '}' //每个数字用border隔开
                        if (i !== name.length - 1) {
                            list += '{margin|}' //添加margin值
                        }
                    }
                    list +='{margin|}{value|%}'
                    return [list]
                },
                offsetCenter: ["0", '7%'],
                rich: { //编辑富文本样式
                    value: {
                        width: 15,
                        height: 28,
                        borderColor: '#02A0F0',
                        borderWidth: 2,
                        borderRadius: 5,
                        lineHeight: 1000,
                        fontSize: 10,
                        padding: [0, 0, 4, 0],
                        color: '#fff',
                        shadowColor: 'rgb(2,157,239)',
                        shadowBlur: 5
                    },
                    margin: {
                        width: 8,
                        height: 42,
                    }
                }

            },
            data: [{
                value: data.num,
                name: data.name
            }]
        },
      {
            type: 'bar',
            data: [{ //上层圆环，用于显示真实数据
                value: data.num,
                itemStyle: {
                    color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右 0-1
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#CD48AE' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#2CABFC' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 10
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 2 //圆环层级，和zindex相似
        }, { //下层圆环，用于显示最大值
            type: 'bar',
            data: [{
                value: max,
                itemStyle: {
                    color: '#265195',
                    shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 5,
                    shadowOffsetY: 2
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 1 //圆环层级，和zindex相似
        },
        { //仪表盘
            type: 'gauge',
            radius: '90%',
            center:["70%","55%"],
            startAngle: 295, //起始角度，同极坐标
            endAngle: 50, //终止角度，同极坐标
            max: max,
            splitNumber: 5, //分割线个数（除原点外）
            axisLine: { // 坐标轴线
                show: false
            },
            pointer: {
                show: false
            },
            axisLabel: {
                // 坐标轴数字
                textStyle: {
                    fontSize: 8,
                    color: "#13B5FC"
                },

            },
            axisTick: { // 坐标轴标记
                length: 10,
                lineStyle: {
                    color: "#13B5FC"
                }
            },
            splitLine: { // 分隔线
                length: 5,
                lineStyle: {
                    width: 1,
                }
            },
            title: { //标题，显示'馆藏量'
                textStyle: {
                    color: '#fff',
                    shadowColor: '#fff',
                    fontSize: 12
                },
                offsetCenter: ["0", '-35%'] //位置偏移
            },
            detail: { //仪表盘数值
                formatter: function (params) {
                    var name = data.num.toString()
                    var list = ''
                    for (var i = 0; i < name.length; i++) {
                        list += '{value|' + name[i] + '}' //每个数字用border隔开
                        if (i !== name.length - 1) {
                            list += '{margin|}' //添加margin值
                        }
                    }
                    list +='{margin|}{value|%}'
                    return [list]
                },
                offsetCenter: ["0", '7%'],
                rich: { //编辑富文本样式
                    value: {
                        width: 15,
                        height: 28,
                        borderColor: '#02A0F0',
                        borderWidth: 2,
                        borderRadius: 5,
                        lineHeight: 1000,
                        fontSize: 10,
                        padding: [0, 0, 4, 0],
                        color: '#fff',
                        shadowColor: 'rgb(2,157,239)',
                        shadowBlur: 5
                    },
                    margin: {
                        width: 8,
                        height: 42,
                    }
                }

            },
            data: [{
                value: data.num,
                name: data.name
            }]
        }
    ]      
    }
}
export const cricle2  = (data)=>{
  var  data = { //显示的数据
    "name": '设备发放率',
    "num": data
}
var  max = 100 //最大馆藏量
return  {
      angleAxis: {
        show: false,
        max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
        type: 'value',
        startAngle: 125, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
        splitLine: {
            show: false //隐藏坐标
        }
    },
    barMaxWidth: 10, //圆环宽度
    radiusAxis: { //隐藏坐标
        show: false,
        type: 'category',
    },
    polar: { //设置圆环位置和大小
        center: ['31%', '55%'],
        radius: '150'
    },
    series: [
      {
            type: 'bar',
            data: [{ //上层圆环，用于显示真实数据
                value: data.num,
                itemStyle: {
                    color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右 0-1
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#CD48AE' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#2CABFC' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 10
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 2 //圆环层级，和zindex相似
        }, { //下层圆环，用于显示最大值
            type: 'bar',
            data: [{
                value: max,
                itemStyle: {
                    color: '#265195',
                    shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 5,
                    shadowOffsetY: 2
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 1 //圆环层级，和zindex相似
        },
        { //仪表盘
            type: 'gauge',
            radius: '90%',
            center:["31%","55%"],
            startAngle: 125, //起始角度，同极坐标
            endAngle: -120, //终止角度，同极坐标
            max: max,
            splitNumber: 5, //分割线个数（除原点外）
            axisLine: { // 坐标轴线
                show: false
            },
            pointer: {
                show: false
            },
            axisLabel: {
                // 坐标轴数字
                textStyle: {
                    fontSize: 8,
                    color: "#13B5FC"
                },

            },
            axisTick: { // 坐标轴标记
                length: 10,
                lineStyle: {
                    color: "#13B5FC"
                }
            },
            splitLine: { // 分隔线
                length: 5,
                lineStyle: {
                    width: 1,
                }
            },
            title: { //标题，显示'馆藏量'
                textStyle: {
                    color: '#fff',
                    shadowColor: '#fff',
                    fontSize: 12
                },
                offsetCenter: ["0", '-35%'] //位置偏移
            },
            detail: { //仪表盘数值
                formatter: function (params) {
                    var name = data.num.toString()
                    var list = ''
                    for (var i = 0; i < name.length; i++) {
                        list += '{value|' + name[i] + '}' //每个数字用border隔开
                        if (i !== name.length - 1) {
                            list += '{margin|}' //添加margin值
                        }
                    }
                    list +='{margin|}{value|%}'
                    return [list]
                },
                offsetCenter: ["0", '7%'],
                rich: { //编辑富文本样式
                    value: {
                        width: 15,
                        height: 28,
                        borderColor: '#02A0F0',
                        borderWidth: 2,
                        borderRadius: 5,
                        lineHeight: 1000,
                        fontSize: 10,
                        padding: [0, 0, 4, 0],
                        color: '#fff',
                        shadowColor: 'rgb(2,157,239)',
                        shadowBlur: 5
                    },
                    margin: {
                        width: 8,
                        height: 42,
                    }
                }

            },
            data: [{
                value: data.num,
                name: data.name
            }]
        },
      {
            type: 'bar',
            data: [{ //上层圆环，用于显示真实数据
                value: data.num,
                itemStyle: {
                    color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1, //从左到右 0-1
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: '#CD48AE' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#2CABFC' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 10
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 2 //圆环层级，和zindex相似
        }, { //下层圆环，用于显示最大值
            type: 'bar',
            data: [{
                value: max,
                itemStyle: {
                    color: '#265195',
                    shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                    shadowBlur: 5,
                    shadowOffsetY: 2
                }
            }],
            barGap: '-100%', //柱间距离,用来将上下两层圆环重合
            coordinateSystem: 'polar', //类型，极坐标
            roundCap: true, //顶端圆角
            z: 1 //圆环层级，和zindex相似
        },
        { //仪表盘
            type: 'gauge',
            radius: '90%',
            center:["31%","55%"],
            startAngle: 125, //起始角度，同极坐标
            endAngle: -120, //终止角度，同极坐标
            max: max,
            splitNumber: 5, //分割线个数（除原点外）
            axisLine: { // 坐标轴线
                show: false
            },
            pointer: {
                show: false
            },
            axisLabel: {
                // 坐标轴数字
                textStyle: {
                    fontSize: 8,
                    color: "#13B5FC"
                },

            },
            axisTick: { // 坐标轴标记
                length: 10,
                lineStyle: {
                    color: "#13B5FC"
                }
            },
            splitLine: { // 分隔线
                length: 5,
                lineStyle: {
                    width: 1,
                }
            },
            title: { //标题，显示'馆藏量'
                textStyle: {
                    color: '#fff',
                    shadowColor: '#fff',
                    fontSize: 12
                },
                offsetCenter: ["0", '-35%'] //位置偏移
            },
            detail: { //仪表盘数值
                formatter: function (params) {
                    var name = data.num.toString()
                    var list = ''
                    for (var i = 0; i < name.length; i++) {
                        list += '{value|' + name[i] + '}' //每个数字用border隔开
                        if (i !== name.length - 1) {
                            list += '{margin|}' //添加margin值
                        }
                    }
                    list +='{margin|}{value|%}'
                    return [list]
                },
                offsetCenter: ["0", '7%'],
                rich: { //编辑富文本样式
                    value: {
                        width: 15,
                        height: 28,
                        borderColor: '#02A0F0',
                        borderWidth: 2,
                        borderRadius: 5,
                        lineHeight: 1000,
                        fontSize: 10,
                        padding: [0, 0, 4, 0],
                        color: '#fff',
                        shadowColor: 'rgb(2,157,239)',
                        shadowBlur: 5
                    },
                    margin: {
                        width: 8,
                        height: 42,
                    }
                }

            },
            data: [{
                value: data.num,
                name: data.name
            }]
        }
    ]      
    }
}