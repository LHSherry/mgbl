import { Card,Space,Button} from 'antd';
import {SmileFilled} from "@ant-design/icons"
import React,{useRef} from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import "../../assets/map/js/province/beijing.js"
import "../../assets/map/js/china.js"
// echarts.registerMap("beijing",beijingJSON)
import styles from "./index.less"
import Cards from "@/components/card/index.js"
import { connect } from 'dva';
import eventEmitter from "@/utils/event"
import {getmap,cricle,parentPrecent,alarm} from "./models/pictureData"
import img from "../../assets/images/yibiaopan.png"
import round from "../../assets/images/cricle.jpg"
class Home extends React.Component{
    constructor(props){
       super(props)
       this.map= getmap(null)
       this.echarts1 = React.createRef()
       this.echarts2 = React.createRef()
       this.echarts3 = React.createRef()
       this.echarts4 = React.createRef()
       this.eventEmitter= null       

    }
    componentDidMount(){
        document.title = '首页'
        this.eventEmitter =  eventEmitter.addListener("setEchart",(width)=>{
            if(this.echarts1.current.echartsElement!=null){
                this.echarts1.current.echartsElement.style.width =`${width}px`  
            }
            if(this.echarts2.current.echartsElement!=null){
                this.echarts2.current.echartsElement.style.width =`${width}px`  
            }
            if(this.echarts3.current.echartsElement!=null){
                this.echarts3.current.echartsElement.style.width =`${width}px`  
            }
            if(this.echarts3.current.echartsElement!=null){
                this.echarts3.current.echartsElement.style.width =`${width}px`  
            }
            if(this.echarts4.current.echartsElement!=null){
                this.echarts4.current.echartsElement.style.width =`${width}px`  
            }
            // this.echarts1.current.echartsElement.style.width =`calc(100%/2 - ${width}-625px)`     
        })
        
    }
    componentWillUnmount(){
        eventEmitter.removeAllListeners();
    }
    render(){
        return(
		<div className={styles.container}  >
                <div className={styles.title}>
                    慢病管理大数据
                </div>
                <div className={styles.centerTop}>
                    <Cards value={this.props.homeAarray.AlarmInfo.totalCount} name={"sos次数"}/>
                    <Cards value={this.props.homeAarray.PatientInfo.totalPatients} name={"患者人数"}/>
                    <Cards value={this.props.homeAarray.PatientInfo.contractsCount} name={"签约数量"}/>
                    <Cards value={this.props.homeAarray.DeviceProvideInfo.totalCount} name={"设备数量"}/>
                </div>
                <div className={styles.centerMap}>
                    <div className={styles.leftArray}>
                        <div className={styles.picture}>
                            <div className={styles.horn}>
                                {
                           this.props.homeAarray.ageList!=null &&      <ReactEcharts
                                ref={this.echarts1}
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.ageList}
                                // style={{width:"99%"}}
                                /> 
                                }

                            </div>
                        </div>
                        <div className={styles.picture}>
                            <div className={styles.horn}>
                            {
                           this.props.homeAarray.parentList!=null && <ReactEcharts
                                ref={this.echarts2}
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.parentList}
                                // style={{width:"99%"}}
                                /> 
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.center}>
                    {/* <img src={img} id="bg_img" style={{display:'none'}} />
                    <img src={round} id="round"  style={{display:'none'}} /> */}
                    <div className={styles.picture1}>
                            <div className={styles.horn1}>
                                <div className={styles.c1}>
                                {                     
                            this.props.homeAarray.cricleList1 && <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList1}
                                // style={{marginLeft:100}}
                                /> 
                                }                    
                                </div>
                                <div className={styles.c2}>
                                {                     
                            this.props.homeAarray.cricleList && <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList}
                                // style={{marginLeft:100}}
                                /> 
                                }  
                                </div>
                                <div className={styles.c1}>
                                {                     
                            this.props.homeAarray.cricleList2 && <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList2}
                                // style={{marginLeft:100}}
                                /> 
                                } 
                                </div>
                            {/* {                     
                            this.props.homeAarray.cricleList && <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList}
                                // style={{marginLeft:100}}
                                /> 
                                }
                            {                     
                            this.props.homeAarray.cricleList && <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList}
                                // style={{marginLeft:100}}
                                /> 
                                } */}
                            {/* <ReactEcharts
                                notMerge={true}
                                lazyUpdate={true}
                                option={this.props.homeAarray.cricleList}
                                // style={{width:"99%"}}
                                /> */}
                            </div>
                        </div>
                    </div>
                    {/* <ReactEcharts
                    option={this.map}
                    notMerge={true}
                    lazyUpdate={true}
                    // onEvents={onEvents}
                    style={{width: 620,height:450}}
                    /> */}
                    <div className={styles.rightArray}>
                        <div className={styles.picture}>
                            <div className={styles.horn}>
                                {
                           this.props.homeAarray.alarmList!=null && <ReactEcharts
                              notMerge={true}
                              lazyUpdate={true}
                              ref={this.echarts3}
                              option={this.props.homeAarray.alarmList}
                              // style={{width:"99%"}}
                              />
                                }

                            </div>                        
                        </div>
                        <div className={styles.picture}>
                            <div className={styles.horn}>
                                {
                       this.props.homeAarray.devcieList!=null && <ReactEcharts
                            notMerge={true}
                            lazyUpdate={true}
                            ref={this.echarts4}
                            option={this.props.homeAarray.devcieList}
                            // style={{width:"99%"}}
                            />
                                }

                            </div>                        
                        </div>
                    </div>
                </div>

        </div>            
        )
    }
}
// const Home = ({homeAarray}) => {
//     document.title = '首页'
//     const   echarts= useRef(null)
//     const resizeEcharts =()=>{
//         echarts.current.echartsElement.style.width="302px"
//     }
// 	return (

// 	);
// };
export default connect(({homeAarray,loading})=>({
	homeAarray,
	loading:loading.models['homeAarray']
  }))(Home)