// pages/details/details.js
import { $wuxForm } from '../../dist/index'
const db=wx.cloud.database()

Page({

    data: {
        info:'',
        orders:[],
        show:{},
        totakeflag:1
    },
    onSubmit() {
        const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
        const value = getFieldsValue()
        db.collection("missions").doc(this.data.info).update({
            data:{
                subname:value.applyname,
                Tel:value.tel,
                status:"待处理项目"
            }
        }).then(res=>{
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000//持续的时间
            })
        })
        //console.log('Wux Form Submit \n', value)
    },
    onLoad(options) {
        this.setData({
            info: options.info
          })
          //这个时候就拿到传过来的name了
          //获取数据
          db.collection("missions").doc(this.data.info).get().then(res=>{
            this.setData({
                show: res.data
            })  
            if(this.data.show.status=="待接单项目"){
                this.setData({
                    totakeflag: 0
                })
            }
          })
    },

})