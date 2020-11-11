import pathToRegexp from 'path-to-regexp';
import moment from 'moment';
import {queryOrgList,
       querystation,
       AddDepartment,
       getarea,saveOrg,
       deleteOrg,
       querynewOrg,
       savestations,
       AddStation,
       deletestation,
       SaveUser,
       AddUserToStation,
       RemoveUserFromStation,
       GetAllFreeUsers,
       GetOrganizationItem,
       GetStation,
       GetUser,
       SaveUserr} from "@/services/org"
import {message} from "antd"
export default {
    namespace:'orgManage',
    state:{
        parent:[],
        modals:{
            neworgshow:false,
            newuser:false,
            listuser:false,
            eidtlist:false
        },
        neworg:{},
        eidtorg:{},
        listorg:{},
        newuserorg:{}
    },
    reducers:{
        changeparent(state, { payload }){
               state.parent = payload
                return{
                    ...state
                }
        },
        changechild(state, { payload }){
          state.parent.parent.map((item,index)=>{
                if(item.id==payload.parentid){
                 return  item.children = payload.parent
                }
                return item
            })
            return {
                ...state
            }
        },
        changpostion(state, { payload }){
            state.parent.parent.map((item,index)=>{
                item.children.map((items,indexs)=>{
                if(items.id==payload.parentid){
                   items.children = payload.parent
                }
                })
            })
            return {
                ...state
            }
        },
        changestation(state, { payload }){
            state.parent.parent.map((item,index)=>{
                item.children.map((item1,index1)=>{
                    item1.children.map((item2,index2)=>{
                        if(item2.id == payload.parentid){
                            item2.children = payload.parent
                        }
                    })
                })
            })
            return {
                ...state
            }
        },
        changenmewlist(state, { payload }){
            state.neworg = payload

            return {
                ...state
            }
        },
        changearea2(state, { payload }){
            state.neworg.areas_L2 = payload
            return{
                ...state
            }
        },
        changearea3(state, { payload }){
            state.neworg.areas_L3 = payload
            return{
                ...state
            }
        },
        changearea4(state, { payload }){
            state.neworg.areas_L4 = payload
            return{
                ...state
            }
        },
        changearea5(state, { payload }){
            state.neworg.areas_L5 = payload
            return{
                ...state
            }
        },
        changearea6(state, { payload }){
            state.neworg.areas_L6 = payload
            return{
                ...state
            }
        },
        changearea2_1(state, { payload }){//改变编辑中的区域选项
            state.eidtorg.areas_L2 = payload
            return{
                ...state
            }
        },
        changearea3_1(state, { payload }){
            state.eidtorg.areas_L3 = payload
            return{
                ...state
            }
        },
        changearea4_1(state, { payload }){
            state.eidtorg.areas_L4 = payload
            return{
                ...state
            }
        },
        changearea5_1(state, { payload }){
            state.eidtorg.areas_L5 = payload
            return{
                ...state
            }
        },
        changearea6_1(state, { payload }){
            state.eidtorg.areas_L6 = payload
            return{
                ...state
            }
        },
        addorg(state,{payload}){
            state.parent = payload
            state.neworg = {}
            state.modals.neworgshow = false
            return{
                ...state
            }
        },
        adduser(state,{payload}){
            state.parent = payload
            state.newuserorg = {}
            state.modals.newuser = false
            return{
                ...state
            }
        },
        addfreeuser(state,{payload}){
            state.parent = payload
            state.neworg = {}
            state.modals.listuser = false
            return{
                ...state
            }
        },
        delestorg(state,{payload}){
            state.parent = payload
            return{
                ...state
            }
        },
        changemodalstate(state,{payload}){
            state.modals.neworgshow = payload
            return{
                ...state
            }
        },
        changemodaluserstate(state,{payload}){
            state.modals.newuser = payload
            return{
                ...state
            }
        },
        changemodallsituser(state,{payload}){
            state.modals.listuser = payload
            return{
                ...state
            }
        },
        resetlsit(state,{payload}){
            state.neworg = {}
            state.eidtorg={}
            state.listorg={}
            state.newuserorg={}
            return {
                ...state
            }
        },
        setmodeledit(state,{payload}){
            state.modals.eidtlist = payload
            return {
                ...state
            }
        },
        setedits(state,{payload}){
            state.eidtorg = payload
            return {
                ...state
            }
        },
        setstationss(state,{payload}){
            state.neworg = payload
            return {
                ...state
            }
        },
        setploplestate(state,{payload}){
            state.newuserorg = payload
            return {
                ...state
            }
        },
        setlistorgtate(state,{payload}){
            state.listorg = payload
            return {
                ...state
            }
        },

    },
    effects:{
        *queryALL({ payload = {} }, { call, put }){//机构
            const response = yield call(queryOrgList, payload)
            if(response.result){
                let  list = {}
                let parent = []
                response.result.organs.map((item,index)=>{
                    list.id = item.id + "a"
                    list.name = item.name
                    if(item.isOrg){
                        list.org = "机构"
                    }else{
                        list.org = "部门"
                    }
                    if(item.hasSubItem){
                        list.children = []
                    }
                    list.level = item.level
                    return    parent.push(list) && (list = {})
                })
               yield put ({
                type:"changeparent",
                payload:{
                    parent
                }
              })
            }
            // queryOrgList().then(res=>{
            //     if(res.successed == true){
            //         put({
            //             type:"changeparent",
            //             payload: {
            //                 parent:res.result
            //             }
            //         })
            //     }
            // })

        },
        *getalstList({ payload = {} }, { call, put }){//部门
            payload = payload.substring(0,payload.indexOf("a"))
            console.log(payload,223);
            const response = yield call(queryOrgList, payload)
            if(response.result){
                let  list = {}
                let parent = []
                console.log(response);
                response.result.organs.map((item,index)=>{

                    list.id = item.id + "b"
                    list.parentid = payload
                    list.name = item.name
                    if(item.isOrg){
                        list.org = "机构"
                    }else{
                        list.org = "部门"
                    }
                    if(item.hasSubItem){
                        list.children = []
                    }
                    list.level = item.level
                  return  parent.push(list ) && (list = {})
                })
                yield put({
                    type:"changechild",
                    payload:{
                        parentid:payload + "a",
                        parent
                    }
                })
            }
        },
        *getpostion({ payload = {} }, { call, put }){//职位
            if(payload.search("c") == -1 ){
                console.log(payload,22);
                payload = payload.substring(0,payload.indexOf("b"))
                const response = yield call(queryOrgList, payload)
                if(response.result){
                    let  list = {}
                    let parent = []
                    response.result.stations.map((item,index)=>{
                        list.id = item.id + "c"
                        list.parentid = payload
                        list.name = item.name
                        list.org = "职位"
                        if(item.hasUser){
                            list.children = []
                        }
                        list.level = 3
                      return  parent.push(list) && (list = {})
                    })
                    yield put({
                        type:"changpostion",
                        payload:{
                            parentid:payload +"b",
                            parent
                        }
                    })
                }
            }else{
                payload = payload.substring(0,payload.indexOf("c"))//员工
                const response = yield call(querystation, payload)
                if(response.result){
                    let  list = {}
                    let parent = []
                    console.log(response.result);
                    response.result.map((item,index)=>{
                        list.id = item.id + "d"
                        list.parentid = payload
                        list.name = item.name
                        list.org = "员工"
                        list.level = 4
                        return  parent.push(list) && (list = {})
                    })
                    yield put({
                        type:"changestation",
                        payload:{
                            parentid:payload +"c",
                            parent
                        }
                    })
                }
            }


        },
        *getorgnewlist({ payload = {} }, { call, put }){//初始化新增
            let response = yield call(querynewOrg, payload)
            if(response.successed == true){
                let list = response.result
                let newlist = {}
                newlist.id = list.organization.id
                newlist.areaId = list.organization.areaId
                newlist.isOrg = list.organization.isOrg
                newlist.parentId =list.organization.parentId
                newlist.longitude = list.organization.longitude
                newlist.latitude = list.organization.latitude
                newlist.place = list.organization.place
                newlist.name = list.organization.name
                newlist.description =  list.organization.description
                newlist.fullName = list.organization.fullName
                newlist.code= list.organization.code
                newlist.b = String(list.organization.orgType)
                newlist.level = list.organization.level
                newlist.index= list.organization.index
                newlist.internal = list.organization.internal
                newlist.valid = list.organization.valid
                newlist.organTypes = list.organTypes
                newlist.maxIndex = list.maxIndex
                newlist.areas_L1 = list.areas_L1
                newlist.areas_L2 = list.areas_L2
                newlist.areas_L3 = list.areas_L3
                newlist.areas_L4 = list.areas_L4
                newlist.areas_L5 = list.areas_L5
                newlist.areas_L6 = list.areas_L6
                newlist.areas1  = list.areas_L1[0].id
                newlist.station =true
                yield put({
                    type:"changenmewlist",
                    payload:newlist
                })
            }
            // {
            //     "id": "string",
            //     "areaId": "string",
            //     "isOrg": true,
            //     "orgId": "string",
            //     "parentId": "string",
            //     "name": "string",
            //     "description": "string",
            //     "fullName": "string",
            //     "code": "string",
            //     "orgType": 0,
            //     "level": 0,
            //     "internal": true,
            //     "index": 0,
            //     "valid": true
            //   }

        },
        *addDepartment({ payload = {} }, { call, put }){//初始化新增
            let response = yield call(AddDepartment, payload)
            if(response.successed == true){
                let list = response.result
                let newlist = {}
                newlist.id = list.organization.id
                newlist.areaId = list.organization.areaId
                newlist.isOrg = list.organization.isOrg
                newlist.parentId =list.organization.parentId
                newlist.name = list.organization.name
                newlist.description =  list.organization.description
                newlist.fullName = list.organization.fullName
                newlist.code= list.organization.code
                newlist.b = String(list.organization.orgType)
                newlist.level = list.organization.level
                newlist.index= list.organization.index
                newlist.internal = list.organization.internal
                newlist.valid = list.organization.valid
                newlist.organTypes = list.organTypes
                newlist.maxIndex = list.maxIndex
                newlist.areas_L1 = list.areas_L1
                newlist.areas_L2 = list.areas_L2
                newlist.areas_L3 = list.areas_L3
                newlist.areas_L4 = list.areas_L4
                newlist.areas_L5 = list.areas_L5
                newlist.areas_L6 = list.areas_L6
                newlist.areas1  = ""
                newlist.station = false
                yield put({
                    type:"changenmewlist",
                    payload:newlist
                })
            }
            // {
            //     "id": "string",
            //     "areaId": "string",
            //     "isOrg": true,
            //     "orgId": "string",
            //     "parentId": "string",
            //     "name": "string",
            //     "description": "string",
            //     "fullName": "string",
            //     "code": "string",
            //     "orgType": 0,
            //     "level": 0,
            //     "internal": true,
            //     "index": 0,
            //     "valid": true
            //   }

        },
        *getnextarea2({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea2",
                    payload:response.result
                })
            }
        },
        *getnextarea3({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea3",
                    payload:response.result
                })
            }
        },
        *getnextarea4({ payload = {} }, { call, put }){
            console.log(payload)
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea4",
                    payload:response.result
                })
            }
        },
        *getnextarea5({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea5",
                    payload:response.result
                })
            }
        },
        *getnextarea6({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea6",
                    payload:response.result
                })
            }
        },
        //编辑中的区域选项
        *getnextarea2_1({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea2_1",
                    payload:response.result
                })
            }
        },
        *getnextarea3_1({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea3_1",
                    payload:response.result
                })
            }
        },
        *getnextarea4_1({ payload = {} }, { call, put }){
            console.log(payload)
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea4_1",
                    payload:response.result
                })
            }
        },
        *getnextarea5_1({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea5_1",
                    payload:response.result
                })
            }
        },
        *getnextarea6_1({ payload = {} }, { call, put }){
            let response = yield call(getarea, payload)
            if(response.successed==true){
                yield put({
                    type:"changearea6_1",
                    payload:response.result
                })
            }
        },
        *setstation({ payload = {} }, {select,call, put }){
            const reponse = yield call(AddStation,payload)
            if(reponse.successed==true){
                let list ={}
                list.id = reponse.result.station.id
                list.station = false
                list.stations = true
                list.parentId= payload +"b"
                list.orgId =reponse.result.station.deptId
                list.name= reponse.result.station.name
                list.parentorgid=reponse.result.station.orgId
                list.fullName =""
                list.level = 3
                list.code=""
                list.description=""
                list.index = reponse.result.station.index
                list.maxIndex = reponse.result.maxIndex
                 yield put({
                     type:"setstationss",
                     payload:list
                 })
            }
        },
        *savestation({ payload = {} }, {select,call, put }){
            let neworg = yield select(state => state.orgManage.neworg)
            let parent = yield select(state => state.orgManage.parent)
            let list = {}
            list.id = neworg.id
            list.isOrg = neworg.isOrg
            list.deptId=neworg.orgId
            list.name = payload.name
            list.fullName=payload.fullName
            list.code = payload.code
            list.description=payload.description
            list.index=payload.index
            const reponse = yield call(savestations,list)
            if(reponse.successed==true){
                message.success("添加职位成功")
                var newlist = {}
                newlist.id = reponse.result + "c"
                newlist.level = neworg.level
                newlist.name = payload.name
                newlist.org = "职位"
                newlist.orgId = list.parentorgid
                newlist.parentid = neworg.parentId
                for(var i =0;i<parent.parent.length;i++){
                    if(parent.parent[i].children&& parent.parent[i].children.length >0){
                        for(var k =0;k < parent.parent[i].children.length;k++){
                            console.log(parent.parent[i].children[k])
                            if(parent.parent[i].children[k].id == neworg.parentId){
                                if(parent.parent[i].children[k].children){
                                    parent.parent[i].children[k].children.splice(neworg.index-1,0,newlist)
                                }else{
                                    parent.parent[i].children[k].children=[]
                                }

                            }
                                // for(var j =0;j<=parent.parent[i].children[k].children.length;j++){
                                //     console.log(parent.parent[i].children[k]);
                                //     if(parent.parent[i].children[k].children[j].id==neworg.parentId){

                                //         parent.parent[i].children[k].children.splice(neworg.index-1,0,newlist)
                                //     }
                                //     // if( parent.parent[i].children[k].children[j].id)
                                //     // parent.parent[i].children[k].children.splice(neworg.index-1,0,newlist)
                                // }
                      }
                    }
                    yield put({
                        type:"addorg",
                        payload:parent
                    })
                }
            }else{
                message.error("添加失败"+reponse.errMessage)
            }
        },
        *saveorg({ payload = {} }, {select,call, put }){
             let neworg = yield select(state => state.orgManage.neworg)
             let parent = yield select(state => state.orgManage.parent)
                let list = {}
                list.id = payload.id
                list.isOrg = neworg.isOrg
                if(payload.areas6){
                    list.areaId= payload.areas6
                }else if(payload.areas5){
                    list.areaId= payload.areas5
                }else if(payload.areas4){
                    list.areaId= payload.areas4
                }else if(payload.areas3){
                    list.areaId= payload.areas3
                }else if(payload.areas2){
                    list.areaId= payload.areas2
                }else if(payload.areas1){
                    list.areaId= payload.areas1
                }else{
                    list.areaId = neworg.areaId || ""
                }
                list.orgId = ""
                list.name = payload.name
                list.parentId = neworg.parentId
                list.description = payload.description
                list.longitude =Number(payload.longitude)
                list.latitude =Number( payload.latitude)
                list.place = payload.place
                list.fullName = payload.fullname
                list.code = neworg.code || ""
                list.orgType = Number(payload.b) || 0
                list.level = Number(payload.level)
                list.internal = neworg.internal
                list.index =  Number(payload.index)
                list.valid = neworg.valid
                let response = yield call(saveOrg, list)
                if(response.successed == true){
                    message.success("添加成功")
                    // yield put({type: 'queryALL',payload: {}});
                        if(neworg.parentId == ""){//新增机构刷新页面
                            var  lists = {}
                            lists.id = response.result + "a"
                            lists.level = payload.level
                            lists.name = payload.name
                            lists.org = "机构"
                            parent.parent.splice(list.index - 1,0,lists)
                            yield put({
                                type:"addorg",
                                payload:parent
                            })
                        }else if(neworg.level==2){
                            var  lists = {}
                            lists.id = response.result + "b"
                            lists.level = payload.level
                            lists.name = payload.name
                            lists.parentid = neworg.parentId
                            lists.org = "部门"
                            parent.parent =  parent.parent.map((item1,index)=>{
                                    if(item1.id == neworg.parentId +"a"){
                                        if(item1.children){
                                                if(item1.children.length > 0){
                                                    item1.children.splice(list.index-1,0,lists)
                                                    return   item1
                                                }else {
                                                    return item1
                                                }
                                        }else {
                                            item1.children = []
                                        }
                                 }
                                  return item1
                            })

                            yield put({
                                type:"addorg",
                                payload:parent
                            })
                        }
                        // else if(neworg.parentId.indexOf("b") !==-1){
                        //     var  lists = {}
                        //     lists.id = response.result + "b"
                        //     lists.level = payload.level
                        //     lists.name = payload.name
                        //     lists.parentId = neworg.parentId
                        //     lists.org = "部门"
                        //     parent =  parent.parent.map((item,index)=>{
                        //            item.children &&  item.children.map((item1)=>{
                        //             if(item1.id == neworg.parentId ){
                        //                 return  item1.children[list.index-1] = lists
                        //                 }
                        //                 return item1
                        //             })
                        //     })

                        //     yield put({
                        //         type:"addorg",
                        //         payload:parent
                        //     })
                        // }

                }else {
                    message.error("添加失败,"+response.errMessage)
                }
        },
        *deletorg({ payloads = {} }, {select,call, put }){
            let expand = payloads.expand
            const methond = payloads.methond
            let payload = payloads.check
            let parent = yield select(state => state.orgManage.parent)
            if(payload.indexOf("a")!==-1){
                var check = payload.substring(0,payload.indexOf("a"))
                var reponse = yield call(deleteOrg,check)
            }else if(payload.indexOf("b")!==-1){
                var check = payload.substring(0,payload.indexOf("b"))
                var reponse = yield call(deleteOrg,check)
            }
            else if(payload.indexOf("c")!==-1){
                var check = payload.substring(0,payload.indexOf("c"))
                var reponse = yield call(deletestation,check)
            }
            else if(payload.indexOf("d")!==-1){
                for(var i = 0;i<parent.parent.length;i++){
                    if(parent.parent[i].children && parent.parent[i].children.length>0){
                        for(var k =0;k<parent.parent[i].children.length;k++){
                            if(parent.parent[i].children[k].children &&parent.parent[i].children[k].children.length>0){
                                for(var j = 0 ;j <parent.parent[i].children[k].children.length;j++){
                                    if(parent.parent[i].children[k].children[j].children&&parent.parent[i].children[k].children[j].children.length>0){
                                        for(var h = 0 ;h <parent.parent[i].children[k].children[j].children.length;h++){
                                            if(parent.parent[i].children[k].children[j].children[h].id==payload){
                                                var partemnt = parent.parent[i].children[k].children[j].id
                                                break
                                            }
                                    }
                                    }
                                }
                            }
                        }
                    }
                }
                var check = payload.substring(0,payload.indexOf("d"))
                partemnt = partemnt.substring(0,partemnt.indexOf("c"))
                var reponse = yield call(RemoveUserFromStation,{stationId:partemnt,userId:check})
            }

            if(reponse.successed == true){
                message.success("删除成功")


                if(payload.indexOf("a")!==-1){
                //     parent.parent.filter((item,index)=>{
                //        if(item.id == payload){
                //         return false
                //        }else{
                //            return true
                //        }
                //    })

                        for(var i = 0;i <= parent.parent.length;i++){
                            if(parent.parent[i].id==payload){
                                 parent.parent.splice(i,1)
                                 return
                            }
                        }
                }else if(payload.indexOf("b")!==-1){
                    // parent = parent.parent.map((item,index)=>{
                    //     if(item.children){
                    //         let newitem = []
                    //         newitem =   item.children.filter((item1,index)=>{
                    //              console.log(item1.id == payload);
                    //             if(item1.id == payload){
                    //                 return false
                    //                }else{
                    //                    return true
                    //                }
                    //         })
                    //         console.log(newitem);
                    //         return newitem
                    //     }
                    //     return item
                    // })
                    for(var i = 0;i<=parent.parent.length;i++){
                        if(parent.parent[i].children && parent.parent[i].children.length>0){
                            if(parent.parent[i].children.length==1){
                                delete parent.parent[i].children
                                for(var y =0;y<=expand.length;y++){//解决没有chilren展开没有收缩
                                    if(expand[y]==parent.parent[i].id){
                                        expand.splice(y,1)
                                    }
                                }
                                 methond(expand)
                                 return
                            }else{
                                for(var j = 0 ;j < parent.parent[i].children.length;j++){
                                    if(parent.parent[i].children[j].id == payload){
                                       parent.parent[i].children.splice(j,1)
                                       return
                                    }
                                }
                            }
                        }
                    }
                }else if(payload.indexOf("c")!==-1){
                    for(var i = 0;i<=parent.parent.length;i++){
                        if(parent.parent[i].children && parent.parent[i].children.length>0){
                            for(var k =0;k<=parent.parent[i].children.length;k++){
                                    if(parent.parent[i].children[k].children.length ==1){
                                        for(var j = 0 ;j < parent.parent[i].children[k].children.length;j++){
                                            if( parent.parent[i].children[k].children[j].id == payload){
                                                delete parent.parent[i].children[k].children
                                               return
                                            }
                                        }
                                        // for(var y =0;y<=expand.length;y++){//解决没有chilren展开没有收缩
                                        //     if(expand[y]==parent.parent[i].id){
                                        //         expand.splice(y,1)
                                        //     }
                                        // }
                                        //  methond(expand)
                                    }else{
                                        for(var j = 0 ;j < parent.parent[i].children[k].children.length;j++){
                                            if( parent.parent[i].children[k].children[j].id == payload){
                                                parent.parent[i].children[k].children.splice(j,1)
                                               return
                                            }
                                        }
                                    }
                            }
                        }
                    }
                    // parent = parent.parent.filter((item,index)=>{
                    //     if(item.id == payload){
                    //      return false
                    //     }else{
                    //         return true
                    //     }
                    // })
                }else if(payload.indexOf("d")!==-1){
                    for(var i = 0;i<parent.parent.length;i++){
                        if(parent.parent[i].children && parent.parent[i].children.length>0){
                            for(var k =0;k<parent.parent[i].children.length;k++){
                                for(var j = 0 ;j <parent.parent[i].children[k].children.length;j++){
                                    if(parent.parent[i].children[k].children[j].children.length==1){
                                        for(var h =0;h<parent.parent[i].children[k].children[j].children.length;h++){
                                            if(parent.parent[i].children[k].children[j].children[h].id==check+"d"){
                                                delete parent.parent[i].children[k].children[j].children

                                            }
                                        }
                                    }else{
                                        for(var h =0;h<parent.parent[i].children[k].children[j].children.length;h++){
                                            if(parent.parent[i].children[k].children[j].children[h].id==check+"d"){
                                                parent.parent[i].children[k].children[j].children.splice(h,1)

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                yield put({
                    type:"delestorg",
                    payload:parent
                })
            }
        },
        *setplepoe({ payload = {} }, {select,call, put }){
            let parent = yield select(state => state.orgManage.parent)

            // {
            //     "id": "string",
            //     "orgId": "string",
            //     "userId": "string",
            //     "name": "string",
            //     "number": "string",
            //     "birthDay": "2020-07-19T08:27:09.689Z",
            //     "gender": "string",
            //     "photo": "string",
            //     "address": "string",
            //     "email": "string",
            //     "officeTel": "string",
            //     "mobile": "string",
            //     "homeTel": "string",
            //     "homeAddress": "string",
            //     "idCardNo": "string",
            //     "mark": "string",
            //     "userType": "string",
            //     "userTypeValue": 0
            //   }
            let list = {}
            list.id=""
            for(var i = 0;i<parent.parent.length;i++){
                if(parent.parent[i].children && parent.parent[i].children.length>0){
                    for(var k =0;k<parent.parent[i].children.length;k++){
                        if(parent.parent[i].children[k].children){
                            for(var j =0;j<parent.parent[i].children[k].children.length;j++){
                                if(parent.parent[i].children[k].children[j].id==payload+"c"){
                                         let orgid =  parent.parent[i].id
                                          orgid = orgid.substring(0,orgid.indexOf("a"))
                                          list.orgId = orgid
                                }
                            }
                        }
                        // if(parent.parent[i].children[k].children){
                        //     for(var j =0;j<=parent.parent[i].children[k].children.length;j++){
                        //         // console.log(parent.parent[i].children[k].children[j]);
                        //     }
                        // }

                                //     if(parent.parent[i].children[k].children[j].id&&parent.parent[i].children[k].children[j].id==payload+"c" ){
                                //         let orgid =  parent.parent[i].id
                                //           orgid = orgid.substring(0,orgid.indexOf("a"))
                                //           list.orgId = orgid
                                //   }
                    }
                }
            }
            list.parentid = payload+"c"
            list.userId=""
            list.name=""
            list.number=""
            list.birthDay=""
            list.gender=""
            list.photo=""
            list.address=""
            list.email=""
            list.mobile=""
            list.homeTel=""
            list.homeAddress=""
            list.idCardNo=""
            list.mark=""
            list.userType=""
            list.userTypeValue=""
            yield put({
                type:"setploplestate",
                payload:list
            })
        },
        *addtoStaion({ payload = {} }, {select,call, put }){
            let parent = yield select(state => state.orgManage.parent)
              const stationId = payload[0].orgId.substring(0,payload[0].orgId.indexOf("a"))
               const parentid = payload[0].parentid.substring(0,payload[0].parentid.indexOf("c"))
               let users = payload.reduce((prev, current, currentIndex, arr)=>{
                        let pp = {}
                        pp.org='员工'
                        pp.id = current.id + "d"
                        pp.name = current.name
                        pp.parentid=parentid+"c"
                        pp.level = 4
                         prev.push(pp)
                         return prev
               },[])
               let userIds =   payload.reduce((prev, current, currentIndex, arr)=>{
                 prev.push(current.id)
                 return prev
               },[])
            // console.log(users,12);
            const reponse1 = yield call(AddUserToStation,{stationId:parentid,userIds})
            if(reponse1.successed==true){
                for(var i = 0;i<parent.parent.length;i++){
                    if(parent.parent[i].children && parent.parent[i].children.length>0){
                        for(var k =0;k<parent.parent[i].children.length;k++){
                            for(var j = 0 ;j <parent.parent[i].children[k].children.length;j++){
                                if(parent.parent[i].children[k].children[j].id==parentid+"c"){
                                    if(parent.parent[i].children[k].children[j].children &&parent.parent[i].children[k].children[j].children.length>1){
                                       const a =   parent.parent[i].children[k].children[j].children.concat(users)
                                       parent.parent[i].children[k].children[j].children = a
                                    }else{
                                        parent.parent[i].children[k].children[j].children=[]
                                    }

                                }
                            }
                        }
                    }
                }
                message.success("用户已添加到职位")
                yield put({
                    type:"addfreeuser",
                    payload:parent
                })
            }else{
                message.error("保存失败"+reponse1.errMessage)
            }
        },
        *savesuser({ payload = {} }, {select,call, put }){
            let neworg = yield select(state => state.orgManage.newuserorg)
			let parent = yield select(state => state.orgManage.parent)
			payload.birthDay = payload.birthDay || null
            payload.id = neworg.id
            payload.orgId = neworg.orgId
            payload.number = neworg.number
            payload.photo =""
            payload.userType= neworg.userType
            console.log(payload);
            const reponse = yield call(SaveUser,payload)

            if(reponse.successed==true){
                message.success("保存用户成功")
                let user = {}
                user.id =  reponse.result + "d"
                user.parentid = neworg.parentid
                user.name = payload.name
                user.level = 4
                user.org =  "员工"
                let  a = user.parentid.substring(0,user.parentid.indexOf("c"))
                let b = String(reponse.result)
                const reponse1 = yield call(AddUserToStation,{stationId:a,userIds:[b]})
                if(reponse1.successed==true){
                    for(var i = 0;i<parent.parent.length;i++){
                        if(parent.parent[i].children && parent.parent[i].children.length>0){
                            for(var k =0;k<parent.parent[i].children.length;k++){
                                if(parent.parent[i].children[k].children.length>0){
                                    for(var j = 0 ;j <parent.parent[i].children[k].children.length;j++){
                                        if(parent.parent[i].children[k].children[j].id==user.parentid ){
                                            if(parent.parent[i].children[k].children[j].children){
                                                parent.parent[i].children[k].children[j].children.push(user)
                                            }else{
                                                parent.parent[i].children[k].children[j].children=[]
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log(parent.parent);
                    message.success("用户已添加到职位")
                    yield put({
                        type:"resetlsit",
                    })
                }else{
                    message.error("保存失败"+reponse1.errMessage)
                }
            }else{
                message.error("保存失败"+reponse.errMessage)
            }
        },
        *changemodal({ payload = {} }, {call, put }){
            yield put({
                type:"changemodalstate",
                payload:payload
            })
        },
        *changemodaluser({ payload = {} }, {call, put }){
            yield put({
                type:"changemodaluserstate",
                payload:payload
            })
        },
        *changemodalist({ payload = {} }, {call, put }){
            yield put({
                type:"changemodallsituser",
                payload:payload
            })
        },
        *resetorg({ payload = {} }, {call, put }){
            yield put({
                type:"resetlsit",
            })
        },
        *setedit({ payload = {} }, {call, put }){
            yield put({
                type:"setmodeledit",
                payload:payload
            })
        },
        *getedit({ payload = {} }, {select,call, put }){

            if(payload.indexOf("a")!==-1){
                payload = payload.substring(0,payload.indexOf("a"))
                const reponse = yield call(GetOrganizationItem,payload)
                if(reponse.successed ==true){
                    let list = reponse.result
                    let newlist = {}
                    newlist.id = list.organization.id +"a"
                    newlist.areaId = list.organization.areaId
                    newlist.isOrg = list.organization.isOrg
                    newlist.parentId =list.organization.parentId
                    newlist.name = list.organization.name
                    newlist.description =  list.organization.description
                    newlist.longitude =  list.organization.longitude
                    newlist.latitude =  list.organization.latitude
                    newlist.place =  list.organization.place
                    newlist.fullName = list.organization.fullName
                    newlist.code= list.organization.code
                    newlist.b = list.organization.orgType
                    newlist.level = list.organization.level
                    newlist.index= list.organization.index
                    newlist.internal = list.organization.internal
                    newlist.valid = list.organization.valid
                    newlist.orgId= list.organization.orgId
                    newlist.organTypes = list.organTypes
                    newlist.maxIndex = list.maxIndex
                    newlist.areas_L1 = list.areas_L1
                    newlist.areas_L2 = list.areas_L2
                    newlist.areas_L3 = list.areas_L3
                    newlist.areas_L4 = list.areas_L4
                    newlist.areas_L5 = list.areas_L5
                    newlist.areas_L6 = list.areas_L6
                    list.areas_L1.length>0 && (newlist.areas1  = list.areas_L1[0].id)
                    list.areas_L2.length>0 && (newlist.areas2  = list.areas_L2[0].id)
                    list.areas_L3.length>0 && (newlist.areas3  = list.areas_L3[0].id)
                    list.areas_L4.length>0 && (newlist.areas4  = list.areas_L4[0].id)
                    list.areas_L5.length>0 && (newlist.areas5  = list.areas_L5[0].id)
                    list.areas_L6.length>0 && (newlist.areas6  = list.areas_L6[0].id)
                    yield put({
                        type:'setedits',
                        payload:newlist
                    })
                }
            }else if(payload.indexOf("b")!==-1){
                payload = payload.substring(0,payload.indexOf("b"))
                const reponse = yield call(GetOrganizationItem,payload)
                if(reponse.successed==true){
                    let list = reponse.result
                    let newlist = {}
                    newlist.id = list.organization.id +"b"
                    newlist.areaId = list.organization.areaId
                    newlist.isOrg = list.organization.isOrg
                    newlist.parentId =list.organization.parentId
                    newlist.name = list.organization.name
                    newlist.description =  list.organization.description
                    newlist.fullName = list.organization.fullName
                    newlist.code= list.organization.code
                    newlist.level = list.organization.level
                    newlist.index= list.organization.index
                    newlist.orgId= list.organization.orgId
                    newlist.orgType = list.organization.orgType
                    newlist.maxIndex = list.maxIndex
                    newlist.internal = list.organization.internal
                    yield put({
                        type:'setedits',
                        payload:newlist
                    })
                }
            }else if(payload.indexOf("c")!==-1){
                payload = payload.substring(0,payload.indexOf("c"))
                const reponse = yield call(GetStation,payload)
                if(reponse.successed==true){
                    let list =  reponse.result.station
                    let newlsit  ={}
                    newlsit.id = list.id+"c"
                    newlsit.orgId = list.orgId
                    newlsit.parentId =list.deptId
                    newlsit.name= list.name
                    newlsit.fullName =list.fullName
                    newlsit.code= list.code
                    newlsit.index= list.index
                    newlsit.level="3"
                    newlsit.description = list.description
                    newlsit.maxIndex = reponse.result.maxIndex
                    yield put({
                        type:'setedits',
                        payload:newlsit
                    })
                }
            }else if(payload.indexOf("d")!==-1){
                payload = payload.substring(0,payload.indexOf("d"))
                const reponse = yield call(GetUser,payload)
                if(reponse.successed==true){
                    let list =  reponse.result
                    let newlsit  ={}
                    newlsit.id = list.id+"d"
                    newlsit.orgId = list.orgId
                    newlsit.userId= list.userId
                    newlsit.name= list.name
                    newlsit.number=list.number
                    newlsit.fullName =list.fullName
                    newlsit.code= list.code
                    // newlsit.description = list.description
                    newlsit.birthDay = moment(list.birthDay, 'yyyy-mm-dd')
                    newlsit.gender= list.gender
                    newlsit.photo=list.photo
                    newlsit.address=list.address
                    newlsit.email=list.email
                    newlsit.officeTel=list.officeTel
                    newlsit.mobile=list.mobile
                    newlsit.homeTel=list.homeTel
                    newlsit.homeAddress=list.homeAddress
                    newlsit.idCardNo=list.idCardNo
                    newlsit.mark=list.mark
                    newlsit.userType=list.userType
                    newlsit.userTypeValue=list.userTypeValue
                    console.log(newlsit);
                    yield put({
                        type:'setploplestate',
                        payload:newlsit
                    })
                }
            }


        },
        *saveorgeidt({ payload = {} }, {select,call, put }){
            let neworg = yield select(state => state.orgManage.eidtorg)
            let newuserorg = yield select(state => state.orgManage.newuserorg)
            console.log(newuserorg,12);
            let parent = yield select(state => state.orgManage.parent)
            if( neworg.id&&neworg.id.indexOf("a")!==-1){
                let list ={}
                // "id": "string",
                // "areaId": "string",
                // "isOrg": true,
                // "orgId": "string",
                // "parentId": "string",
                // "name": "string",
                // "description": "string",
                // "fullName": "string",
                // "code": "string",
                // "orgType": 0,
                // "level": 0,
                // "internal": true,
                // "index": 0,
                // "valid": true
                list.id=neworg.id.substring(0,neworg.id.indexOf("a"))
                list.orgType=neworg.b
                list.code= neworg.code
                list.orgId= neworg.orgId
                list.name=payload.name
                list.description= payload.description
                list.longitude=Number(payload.longitude)
                list.latitude= Number(payload.latitude)
                list.place= payload.place
                list.fullName = payload.fullName
                list.isOrg=true
                if(payload.areas6){
                    list.areaId= payload.areas6
                }else if(payload.areas5){
                    list.areaId= payload.areas5
                }else if(payload.areas4){
                    list.areaId= payload.areas4
                }else if(payload.areas3){
                    list.areaId= payload.areas3
                }else if(payload.areas2){
                    list.areaId= payload.areas2
                }else if(payload.areas1){
                    list.areaId= payload.areas1
                }else{
                    list.areaId = neworg.areaId || ""
                }
                list.index=payload.index
                list.parentId=""
                list.valid=true
                list.internal=true
                list.level=0
                var reponse = yield call(saveOrg,list)
                if(reponse.successed==true){
                    message.success("保存成功")
                    for(var i=0;i<parent.parent.length;i++){
                        if(parent.parent[i].id==neworg.id){
                            parent.parent[i].name=payload.name
                        }
                    }
                    yield  put({
                        type:'resetlsit'
                    })
                    yield put({
                        type:'setmodeledit',
                        payload:false
                    })
                }else{
                    message.error("保存失败"+reponse.errMessage)
                }

            }else if(neworg.id&& neworg.id.indexOf("b")!==-1){
                let list= {}
                list.id=neworg.id.substring(0,neworg.id.indexOf("b"))
                list.orgType=neworg.orgType
                list.code= neworg.code
                list.orgId= neworg.orgId
                list.name=payload.name
                list.description= payload.description
                list.fullName = payload.fullName
                list.isOrg=neworg.isOrg
                list.areaId =neworg.areaId
                list.index=payload.index
                list.parentId=neworg.parentId
                list.valid=neworg.valid
                list.internal=neworg.internal
                list.level=neworg.level
                var reponse = yield call(saveOrg,list)
                if(reponse.successed==true){
                    message.success("保存成功")
                    for(var i=0;i<parent.parent.length;i++){
                        if(parent.parent[i].children){
                            for(var j=0;j<parent.parent[i].children.length;j++){
                                if(parent.parent[i].children[j].id==list.id+"b"){
                                    parent.parent[i].children[j].name=list.name
                                }
                            }
                        }
                    }
                    yield  put({
                        type:'resetlsit'
                    })
                    yield put({
                        type:'setmodeledit',
                        payload:false
                    })
                }else{
                    message.error("保存失败"+reponse.errMessage)
                }
            }else if(neworg.id&& neworg.id.indexOf("c")!==-1){
                let list= {}
                list.id=neworg.id.substring(0,neworg.id.indexOf("c"))
                list.name = payload.name
                list.fullName=payload.fullName
                list.description=payload.description
                list.code=neworg.code
                list.deptId=neworg.parentId
                list.orgId=neworg.orgId
                list.index = payload.index
                var reponse = yield call(savestations,list)
                if(reponse.successed==true){
                    message.success("保存成功")
                    for(var i=0;i<parent.parent.length;i++){
                        if(parent.parent[i].children){
                            for(var j=0;j<parent.parent[i].children.length;j++){
                                if(parent.parent[i].children[j].children){
                                    for(var h=0;h<parent.parent[i].children[j].children.length;h++){
                                           if(parent.parent[i].children[j].children[h].id=list.id+"c"){
                                            parent.parent[i].children[j].children[h].name = list.name
                                           }
                                    }
                                }
                            }
                        }
                    }
                    yield  put({
                        type:'resetlsit'
                    })
                    yield put({
                        type:'setmodeledit',
                        payload:false
                    })
                }else{
                    message.error("保存失败"+reponse.errMessage)
                }
            }else if(newuserorg.id&&newuserorg.id.indexOf("d"!==-1)){
                let list= {}
                list.id=newuserorg.id.substring(0,newuserorg.id.indexOf("d"))
                list.name = payload.name
                list.fullName=payload.fullName
                list.number=newuserorg.number
                list.orgId=newuserorg.orgId
                list.birthDay = payload.birthDay
                list.mark=payload.mark
                list.gender=payload.gender
                list.photo=payload.photo
                list.address=payload.address
                list.email=payload.email
                list.officeTel=payload.officeTel
                list.mobile=payload.mobile
                list.homeTel=payload.homeTel
                list.homeAddress=payload.homeAddress
                list.idCardNo=payload.idCardNo
                list.userType=newuserorg.userType
                list.userTypeValue=newuserorg.userTypeValue
                var reponse = yield call(SaveUserr,list)
                console.log(reponse);
                if(reponse.successed==true){
                    message.success("保存成功")
                    for(var i=0;i<parent.parent.length;i++){
                        if(parent.parent[i].children){
                            for(var j=0;j<parent.parent[i].children.length;j++){
                                if(parent.parent[i].children[j].children){
                                    for(var h=0;h<parent.parent[i].children[j].children.length;h++){
                                        if(parent.parent[i].children[j].children[h].children){
                                            for(var x=0;x<parent.parent[i].children[j].children[h].children.length;x++){
                                                if(parent.parent[i].children[j].children[h].children[x].id==list.id+"d"){
                                                    parent.parent[i].children[j].children[h].children[x].name=list.name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    yield  put({
                        type:'resetlsit'
                    })
                    yield put({
                        type:'changemodaluserstate',
                        payload:false
                    })
                }else{
                    message.error("保存失败"+reponse.errMessage)
                }

            }


        },
        *GetAllFreeUser({ payload = {} }, {select,call, put }){
            let parent = yield select(state => state.orgManage.parent)
            let orgid = ""
            for(var i = 0;i<parent.parent.length;i++){
                if(parent.parent[i].children && parent.parent[i].children.length>0){
                    for(var k =0;k<parent.parent[i].children.length;k++){
                        if(parent.parent[i].children[k].children){
                            for(var j =0;j<parent.parent[i].children[k].children.length;j++){
                                console.log(parent.parent[i].children[k].children[j].id);
                                if(parent.parent[i].children[k].children[j].id==payload+"c"){
                                          orgid =  parent.parent[i].id
                                          orgid = orgid.substring(0,orgid.indexOf("a"))
                                }
                            }
                        }
                    }
                }
            }
            const reponse  = yield call(GetAllFreeUsers,orgid)
            reponse.result.map((item,index)=>{
                 item.checked = false
                 item.parentid = payload+"c"
                 item.orgId = orgid + "a"
                 return item
            })
            if(reponse.successed==true){
                yield put({
                    type:'setlistorgtate',
                    payload:reponse.result
                })
            }
        }
    },
    subscriptions:{
        start({dispatch,history}){
                return history.listen(({url,query})=>{
                    if(pathToRegexp("/org").exec(url)){
                        dispatch({type:"queryALL"})

                    }
                })
        }
    }
}
