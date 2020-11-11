
import React from 'react';
import { connect } from 'dva';
import {CaretLeftOutlined,CaretRightOutlined,AlignRightOutlined} from "@ant-design/icons"
import { Button,Space,Empty} from 'antd';
import classNames from 'classnames/bind';
import singlar from "./singlar"
import ModalFeedback from '@/components/modal/feedback';
import Detialparent from "./deital/index"
import * as signalR from"@microsoft/signalr"
import Icon_B from '@/assets/images/mapIcon_blue.png';
import Icon_R from '@/assets/images/mapIcon_red.png';
import styleglobal  from "../../global.less"
import styles from './index.less';
import { size, remove } from 'lodash';



const { AMap } = window;
const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Man charged over missing wedding girl.',
  ];

const cx = classNames.bind(styles);

class HelpMap extends React.PureComponent {

	constructor (props) {
        super(props)
        this.state = {
			tabType: 'day',
			center:[104.249146,30.582415],
			selectItem: {},
			modalVisible: false,
			collapsed:false,
			collWidth:350,
			animationDisplay:""
		}
		this.addMarks=this.addMarks.bind(this)
		this.addMarks=this.addMarks.bind(this)
		this.biegnaddMarks=this.biegnaddMarks.bind(this)
		this.submitresult=this.submitresult.bind(this)
		this.removeMarks=this.removeMarks.bind(this)
		this.changelists=this.changelists.bind(this)
		this.setwidth=this.setwidth.bind(this)
		this.setdispaly=this.setdispaly.bind(this)
		this.fintparitent=this.fintparitent.bind(this)
    }
	cratemap(){
		let session =JSON.parse(sessionStorage.getItem("user")) 
		let mapoption
		if(session.latitude){
			 mapoption ={
				resizeEnable: true,
				center:[session.longitude,session.latitude] ,
				zoom: 14
			}
		}else{
			mapoption = {
				resizeEnable: true,
				zoom: 14
			}
		}
		this.map = new AMap.Map('mapContainer',mapoption)
	}
	setwidth(resutlwidth){
		this.setState((preState,prop)=>({//解决setstate异步更新
			collWidth:resutlwidth
		}))
	}
	setdispaly(dispaly){
		this.setState((preState,prop)=>({//解决setstate异步更新
			animationDisplay:dispaly
		}))
	}
	changelists(){
		if(this.state.collapsed){
			this.setState((preState,prop)=>({//解决setstate异步更新
				collapsed:!preState.collapsed
			}))
			this.setdispaly("")
			this.setwidth(350)
			// let count = 2//移动频率
			// let currentWidth = 420//当前长度
			// let lengtwidth = currentWidth/count//移动长度
			// let isdisplay = 420*(1/3) //控制过半隐藏元素
			// const timers =	setInterval(() => {
			// 	currentWidth = currentWidth+lengtwidth
			// 	this.setwidth(currentWidth)
			// 	if(currentWidth<isdisplay){//过半隐藏
			// 		this.setdispaly("")
			// 	}
			// 	if(currentWidth==0){//为零清除
			// 		clearInterval(timers)
			// 	}
			// }, 100);
		}else{
			this.setState((preState,prop)=>({//解决setstate异步更新
				collapsed:!preState.collapsed
			}))
			this.setdispaly("none")
			this.setwidth(0)
			// let count = 2//移动频率
			// let currentWidth = 420//当前长度
			// let lengtwidth = currentWidth/count//移动长度
			// let isdisplay = 420*(1/3) //控制过半隐藏元素
			// const timers =	setInterval(() => {
			// 	currentWidth = currentWidth-lengtwidth
			// 	this.setwidth(currentWidth)
			// 	if(currentWidth<isdisplay){//过半隐藏
			// 		this.setdispaly("none")
			// 	}
			// 	if(currentWidth==0){//为零清除
			// 		clearInterval(timers)
			// 	}
			// }, 100);
		}
	}
	fintparitent(e){
		let positionArr=e.currentTarget.id.split("&")
		   positionArr = positionArr.map(Number)
		 this.map.setCenter(positionArr)
	}
	componentDidMount() {
		const src="../../static/images/jieshou.mp3"
		this.autio = new Audio(src)//收到消息提示音
		const src1="../../static/images/send.mp3"
		this.autio1 = new Audio(src1)//处理成功提示音	
		this.cratemap()
	    this.websocket=  new singlar(this.addMarks,this.removeMarks,this.biegnaddMarks,this.autio,this.autio1,this.props.dispatch,this.map.clearMap)
		this.queryList();
		this.websocket.start()
	}
	componentDidUpdate(){
			console.log(this.props.helpMap.marklist);
	}
  componentWillUnmount(){
	this.websocket.close()
	this.map.destroy()//清除地图所有东西，释放内存
  }
		queryList() {
		// const { tabType } = this.state;
		const { dispatch, helpMap: { name_space } } = this.props;
		dispatch({
			type: `${name_space}/queryList`,
			payload: "",
			callback: (list) => {
				this.removeAllOverlay();
				this.biegnaddMarks(list)
			}
		});
	}

	onTabChange(type) {
		this.setState({
			tabType: type
		});
		this.queryList()
	}

	onSelectHandler = (obj) => {
		this.setState({ selectItem: obj })
	}

	onFeedbackHandler = (value) => {
		this.setState({ modalVisible: false });
	}

	showModal = () => {
		this.setState({ modalVisible: true });
	}

	hideModal = () => {
		this.setState({ modalVisible: false });
	}

	/**
	 * 清除所有覆盖物
	 */
	removeAllOverlay() {
		this.map.clearMap();
	}
	submitresult(e){
		e.stopPropagation()
		this.props.dispatch({
			type:'helpMap/detailparent',
			payload:e.currentTarget.id
		})
	}
	biegnaddMarks(list) {
		this.map.clearMap()
		if(list.length>0){
		// setTimeout(()=>this.autio.play(),1000)
		let markers= []
		for(var i=0;i<list.length;i++){
			let marker = new AMap.Marker({
				position: new AMap.LngLat(list[i].position[0],list[i].position[1]),
				draggable:false,
				// offset: new AMap.Pixel(-64, -64),
				icon: Icon_R, // 添加 Icon 图标 URL
			})
			marker.planId=list[i].planId
			marker.position = list[i].position
			markers.push(marker)
		}
		// let data = {
		// 	parentid:"22220",
		// 	position:[104.236517,30.577823],
		// 	marker
		// }
		this.props.dispatch({
		   type:'helpMap/addlostmark',
	       payload:markers
		})
		// marker.on('mouseover', (event) => {
		// })
		// marker.on('mouseout', (event) => {
		// })
		this.map.setCenter(markers[0].position)
		this.map.add(markers)
	}
    }
	addMarks(list) {
			setTimeout(()=>this.autio.play(),1000)
			console.log(list);
			// setTimeout(()=>this.palyer,1000)
			let marker = new AMap.Marker({
				position: new AMap.LngLat(list.position[0],list.position[1]),
				draggable:true,
				// offset: new AMap.Pixel(-64, -64),
				icon: Icon_R, // 添加 Icon 图标 URL
			})
			// let data = {
			// 	parentid:"22220",
			// 	position:[104.236517,30.577823],
			// 	marker
			// }
			list.marker = marker
			// marker.on('mouseover', (event) => {
			// });
			// marker.on('mouseout', (event) => {
			// });
			this.map.setCenter(list.position[0],list.position[1])
			this.map.add(marker)
			this.props.dispatch({
				type:'helpMap/addmark',
				payload:list
				})
	}
	removeMarks(planId){
		var list =	this.props.helpMap.marklist
		for(var i=0;i<list.length;i++){
			if(list[i].planId==planId){
				this.map.remove(list[i])
				this.props.dispatch({
					type:"helpMap/removemark",
					payload:planId
				})
				this.props.dispatch({
					type:"helpMap/removequeryparent",
					payload:planId
				})
			}
		}
	}
	render() {
		const { tabType, selectItem, modalVisible,collapsed,collWidth,animationDisplay } = this.state;
		const feedbackProps = {
			onOk: this.onFeedbackHandler,
			onCancel: this.hideModal
		}

		return (
			<div className={styles.container}>
				<div id="mapContainer" className={styles.map}></div>
				{/* <div className={styles.dateTab}>
					{
						TabList.map(obj => <div key={obj.type} className={cx({ active: obj.type === tabType })} onClick={() => this.onTabChange(obj.type)}>{obj.name}</div>)
					}
				</div> */}
				<div className={styles.lister}>
					<div className={styles.stretch} onClick={this.changelists}>
					{collapsed?<CaretLeftOutlined style={{color:"#fff"}}/>:<CaretRightOutlined  style={{color:"#fff"}}/>}
					</div>
				<div className={styles.listContainer} style={{width:collWidth}}>
					<div className={styles.listTtile} style={{display:animationDisplay}}>
						 <span>呼救列表</span>
						 <AlignRightOutlined className={styles.rigthicon}/>
					</div>
					<div className={styles.listcount} style={{display:animationDisplay}}>
						{
						this.props.helpMap.parent.length >0 ? this.props.helpMap.parent.map((item,index)=>(
								<div className={styles.countpaitent} onClick={this.fintparitent} key={index} id={item.lng+"&"+item.lat}>
								<div>
									<span>姓名：{item.name}</span>
								</div>
								<div className={styles.btnchu}>
									<span>性别：{item.gender}</span>
									<Button type="primary" size="small"className={styles.btnnow} onClick={this.submitresult} id={item.planId}>立即处理</Button>
								</div>
								<div>
									<span>时间：{item.time}</span>
								</div>
						   </div>
							)):<Empty />
						}
					</div>					
					 {/* <List
						header={
							< div>
							<BarsOutlined  style={{fontSize:20}}/>
							<span style={{marginLeft:12,fontSize:20}}>呼救列表</span>
							</div>
						}
						footer={null}
						bordered
						>
					 <List
				     	 className={styles.contanlist}
						footer={null}
						bordered
						dataSource={this.props.helpMap.parent}
						renderItem={item => (
							<List.Item className={styles.allList}>
								<div className={styles.list}>
									<div>
										姓名:{item.name}
									</div>
									<div>
										性别:{item.gender}
										<Button style={{marginLeft:160,fontSize:10}} type="primary" icon={<FormOutlined />} onClick={this.submitresult} id={item.planId}>立即处理</Button>
									</div>
									<div>
										年龄:{item.age}
									</div>
									<div>
										时间:{item.time}
									</div>
								</div>
							</List.Item>
						)}
						/>
							</List> */}
				</div>
				</div>
				{
					modalVisible ? <ModalFeedback {...feedbackProps} /> : null
				}{
				JSON.stringify(this.props.helpMap.detilalist)!=="{}"&&<Detialparent
				 detialshow={this.props.helpMap.detialshow} 
				 dispatch={this.props.dispatch} 
				 removeMarks={this.removeMarks}
				 detilalist={this.props.helpMap.detilalist}/>
				}
				
			</div>
		);
	}
}

export default connect(({ helpMap, loading }) => ({
	helpMap,
	loading: loading.models['helpMap'],
}))(HelpMap);
