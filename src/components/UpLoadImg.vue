<template>
     <el-form-item :label="label?label:'上传图片'" :prop="myProp" :required="true">
        <el-upload 
            class="avatar-uploader"
            action="/list/MallHomePageConfig/DownLoadBase64Image"
            :show-file-list="false"
            :on-success="upLoadSuccess"
            :before-upload="beforeUpload"
            :auto-upload="true"
            name="base64str">
            <!-- <img v-if="showImgUrl" :src="showImgUrl" class="avatar"> -->
            <img v-if="innerForm[myProp]" :src="'/list'+innerForm[myProp]" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div  slot="tip" class="el-upload__tip">只能上传JPG,PNG,JPEG,GIF,大小小于1MB,最好{{bestSize}}</div>
        </el-upload>
    </el-form-item>
</template>
<script>
import { Upload, FormItem, Icon} from "element-ui";
export default {
    name: "upLoadImg",
    components: {
        [ Upload.name ]: Upload,
        [ FormItem.name ]: FormItem
    },
    props: ['innerForm','bestSize','myProp', 'label'],
    methods: {
        upLoadSuccess(res,file){//上传成功
            this.innerForm[this.myProp] = res.HttpPath;
        },
        beforeUpload(file){//上传之前
            const isJPG = file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png'||file.type === 'image/gif';
            const isLt1M = file.size / 1024 / 1024 <= 1;
            console.log(file);
            if (!isJPG) {
                MessageBox.alert('上传头像图片只能是 JPG,PNG,JPEG,GIF 格式!');
            }
            if (!isLt1M) {
                MessageBox.alert('上传头像图片大小不能超过 1MB!');
            }
            return isJPG && isLt1M;
        },
    }
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>