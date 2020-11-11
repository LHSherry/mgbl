import react,{}from "react"
import {Modal,Input,Space,Button,message} from "antd"
const { AMap } = window;
// import styles from "./index.less"
export default class SerMapModel extends react.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            loaction:[],
            show:this.props.show
        }
        this.changePosition = this.changePosition.bind(this)
    }   

    createMap(){
        var mapser = new AMap.Map('mapser',{
				resizeEnable: true,
				zoom: 14
            })
            // var autoOptions = {
            //     city:'', 
            //     input: "tipinput"
            // };
            // AMap.plugin(['AMap.AutoComplete','AMap.PlaceSearch'], function(){
                
            //     var auto = new AMap.AutoComplete(autoOptions);
            //     var placeSearch = new AMap.PlaceSearch({
            //         map: mapser
            //     });  //构造地点查询类
            //     auto.on("select", select);//注册监听，当选中某条记录时会触发
            //     function select(e) {
            //         placeSearch.setCity(e.poi.adcode);
            //         placeSearch.search(e.poi.name);  //关键字查询查询
            //     }
            // });
            var _slef = this
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                  //city 限定城市，默认全国
                  city: '全国',
                  input: "tipinput"
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                var  placeSearch = new AMap.PlaceSearch({
                map:  mapser
              });  //构造地点查询类
             function   select(e) {
                _slef.setState({
                    loaction:[e.poi.location.lng,e.poi.location.lat,e.poi.name]
                })
                placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name);  //关键字查询查询
            }
            AMap.event.addListener(autoComplete, "select",select);//注册监听，当选中某条记录时会触发                
                // autoComplete.search(keyword, function(status, result) {
                //  console.log(result)
                //   // 搜索成功时，result即是对应的匹配数据
                // })
              })
        //   var autoOptions = {
        //         input: "tipinput"
        //     };
        //     var auto = new AMap.Autocomplete(autoOptions);
        //     var  placeSearch = new AMap.PlaceSearch({
        //         map:  mapser
        //     });  //构造地点查询类
        //     function   select(e) {
        //         placeSearch.setCity(e.poi.adcode);
        //         placeSearch.search(e.poi.name);  //关键字查询查询
        //     }
        //     AMap.event.addListener(auto, "select",select);//注册监听，当选中某条记录时会触发
    }
    changePosition(){
        if(this.state.loaction.length==0){
            message.error("请输入正确的地点！")
            return
        }else{
            this.props.select(this.state.loaction)
            this.props.setmapShow(false)
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.createMap()
        },100)
        
    }
    render(){
        return(
            <Modal 
            width={1000}
            visible={this.state.show}
            footer={null}
            onCancel={()=>this.props.setmapShow(false)}
            title="地图搜索"
            destroyOnClose={true}
            >
                <div  style={{backgroundColor:"white",width:200,position:"absolute",zIndex:1,opacity:0.8}}>
                    <div>
                        请输入关键字
                    </div>
                    <Space>
                    <input id="tipinput"></input>
                    <Button type="primary" onClick={this.changePosition}>选择</Button>
                    </Space>
                    
                </div>
                <div id="mapser" style={{width:920,height:500}}></div>
            </Modal>
        )
    }
}