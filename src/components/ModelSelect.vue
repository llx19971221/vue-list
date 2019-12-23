<template>
    <div v-if="useOneOrTwo == true">
        <el-form-item label="按钮链接:" :prop="LinkType" :required="true">
            <el-radio-group v-model="innerForm[LinkType]" size="mini">
                <el-radio-button :label=1 >无</el-radio-button>
                <el-radio-button :label=2 >功能板块</el-radio-button>
                <el-radio-button :label=3 >自定义链接</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="模块选择" v-if="innerForm[LinkType] === 2" :prop="FunctionName" :required="true">
            <el-select @change="selectChange" v-model="innerForm[FunctionName]" placeholder="请选择活链接内容">
                <el-option label="品牌导航" :value=2></el-option>
                <el-option label="活动中心" :value=3></el-option>
                <el-option label="会员中心" :value=4></el-option>
                <el-option label="积分商城" :value=5></el-option>
                <el-option label="我的积分" :value=6></el-option>
                <el-option label="补充有礼" :value=7></el-option>
                <el-option label="我的礼品" :value=8></el-option>
                <el-option label="我的卷包" :value=9></el-option>
                <el-option label="自助积分" :value=10></el-option>
                <el-option label="问卷调查" :value=11></el-option>
                <el-option label="推荐好友注册" :value=12></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="链接地址:" :prop="LinkUrl" v-else-if="innerForm[LinkType] === 3" :required="true">
            <el-input v-model="innerForm[LinkUrl]"></el-input>
        </el-form-item>
    </div>
    <div v-else>
        <el-form-item  label="按钮链接:" :prop="LinkType" :required="true">
            <el-radio-group v-model="innerForm[LinkType]" size="mini">
                <el-radio-button :label=0 >无</el-radio-button>
                <el-radio-button :label=1 >功能板块</el-radio-button>
                <el-radio-button :label=2 >自定义链接</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="模块选择" v-if="innerForm[LinkType] === 1" :prop="FunctionName" :required="true">
            <el-select @change="selectChange" v-model="innerForm[FunctionName]" placeholder="请选择活链接内容">
                <el-option label="品牌导航" :value=2></el-option>
                <el-option label="活动中心" :value=3></el-option>
                <el-option label="会员中心" :value=4></el-option>
                <el-option label="积分商城" :value=5></el-option>
                <el-option label="我的积分" :value=6></el-option>
                <el-option label="补充有礼" :value=7></el-option>
                <el-option label="我的礼品" :value=8></el-option>
                <el-option label="我的卷包" :value=9></el-option>
                <el-option label="自助积分" :value=10></el-option>
                <el-option label="问卷调查" :value=11></el-option>
                <el-option label="推荐好友注册" :value=12></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="链接地址:" :prop="LinkUrl" v-else-if="innerForm[LinkType] === 2" :required="true">
            <el-input v-model="innerForm[LinkUrl]"></el-input>
        </el-form-item>
    </div>
</template>

<script>
import { FormItem, Select, Option, RadioButton, RadioGroup, Input }from "element-ui";
export default {
    name: "modelSelect",
    data(){
        return {
            showFunctionNameObj: {
                2: '品牌导航',
                3: '活动中心',
                4: '会员中心',
                5: '积分商城',
                6: '我的积分',
                7: '补充有礼',
                8: '我的礼品',
                9: '我的卷包',
                10: '自助积分',
                11: '问卷调查',
                12: '推荐好友注册'
            }
        }
    },
    components: {
        [ FormItem.name ]: FormItem,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ RadioButton.name ]: RadioButton,
        [ RadioGroup.name ]: RadioGroup,
        [ Input.name ]: Input
    },
    methods: {
        modelNameFn(num){
            return this.showFunctionNameObj[num];
        },
        selectChange(e){
            this.innerForm[this.ShowFunctionName] = this.modelNameFn(e);
        }
    },
    props: ['innerForm', 'LinkType', 'FunctionName', 'LinkUrl','ShowFunctionName', 'useOneOrTwo']
}
</script>