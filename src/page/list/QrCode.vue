<template>
    <el-drawer
        title="二维码"
        :visible="openQrDrawer"
        size="300px"
        direction="ttb"
        @opened="drawerOpend"
        :before-close="handleClose"
        :destroy-on-close="true">
        <div id="qrcode"></div>
    </el-drawer>
</template>
<script>
import QRCode from 'qrcodejs2'
import { Drawer } from "element-ui";
export default {
    name: "qrCode", 
    components: {
        [ Drawer.name ]: Drawer
    },
    methods:{
        qrcode() {
            document.getElementById("qrcode").innerHTML = "";
            let qrcode = new QRCode("qrcode",{
                width: 150,
                height: 150, 
                text: window.location.origin+'/phoneData?id='+this.id
            });
        },
        handleClose(){
            this.$emit("changeQrCodeDrawer")
        },
        drawerOpend(){
            this.qrcode();
        }
    },
    props: [ 'id', "openQrDrawer" ]
}
</script>
<style lang="scss">
    #qrcode{
        width: 150px;
        height: 150px;
        margin: 0 auto;
    }
</style>