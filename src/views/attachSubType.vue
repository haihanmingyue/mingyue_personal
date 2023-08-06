<template>
  <div style="width: 100%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-dialog :visible.sync="videoDia"
                   :close-on-click-modal="false"
                   @close="stopOpen"
                   :close-on-press-escape="false"
                   style="width: 100%"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <video id="video01" :src="''" style="width: 100%" controls></video>
            </el-col>
          </el-row>
        </el-dialog>

        <div style="float: left;margin-top: 7%">
          <div style="float: left;font-size: 20px ;cursor: pointer" @click="goBack"> <i class="el-icon-back"></i> </div>
          <div style="float: left;font-size: 20px" > &nbsp;| &nbsp;</div>
          <div style="float: left;font-size: 20px" >{{ name }}</div>
        </div>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="loading">刷新</el-button>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="addFlag = true">增加</el-button>
        <el-card class="box-card" style="position: relative;width: 100%; height: 900px;margin-top: 10%;overflow-y: auto">
          <el-row :gutter="20">


            <el-col :span="6" v-for="(i,index) in list" :key="index" style="margin-bottom: 20px">
              <el-card style="max-height: 400px">

                <div class="block" style="width: 100%;text-align: center;">
                  <span class="demonstration" style="font-size: 20px"><b>{{ i.name }}</b></span>
                  <el-button :circle="true" @click="open(i.uuid)">
                    <i class="el-icon-caret-right"></i>
                  </el-button>
                </div>

              </el-card>

            </el-col>

          </el-row>
        </el-card>

        <el-dialog :title="title" :visible.sync="addFlag"
                   :close-on-click-modal="false"
                   @close="closeDia()"
                   :close-on-press-escape="false"
                   style="width: 900px;margin: 0 auto"
        >
          <el-form :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="文件" v-model="form.pictureUuid">

              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action=""
                  :http-request="handleUpload"
                  :before-upload="before"
                  :on-progress="onProgress"
                  :on-remove="handleRemove"
                  :on-success="success"
                  :file-list="fileList"
                  :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-footer class="dialog-footer" height="40px">
            <div style="float: right">
              <el-button size="small" @click="closeDia">关闭</el-button>
            </div>
          </el-footer>
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import picUpload from "@/utils/upload"
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import views from "@/utils/views";
import { Loading } from 'element-ui'

const {MessageBox} = require("element-ui");
const {getFileList} = require("@/api");
const {saveAttachSubType,attachSubTypeList,upload} = require("@/api");

export default {
  name: "attachSubType",
  mixins: [views],
  component: {
    picUpload,
    video: Video
  },
  data() {
    return {
      count: 0,
      videoDia: false,
      length: 0,
      video: null,
      fileList: [],
      showProcess: false,
      name: '',
      form: {
        name: '',
        pictureUuid: '',
        fatherType: ''
      },
      rules: {},
      type: "mp4",
      list: [
      ],
      addFlag: false,
      title: '新增'
    }
  },
  created() {
  },
  async mounted() {
    console.log(this.$route.query)
    this.name = this.$route.query.name
    await this.loading();
  },
  methods: {
    async handleUpload(arg) {
      const { file, filename } = arg;
      try {
        const res = await upload(file,this.$route.query.uuid, arg);
        if (res.code === 200) {
          await this.loading()
        }
      } catch (e) {
        console.log(e);
      }
    },
    before(){
      // 创建弹出框等待提示
      this.showProcess = true
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
   success(response, file, fileList){
      let flag = true;
      for (let i in fileList) {
        if(fileList[i].status !== 'success') {
          flag = false
          break
        }
      }
      if (flag) {
        this.addFlag = false;
        this.fileList = [];
      }
    },
    onProgress(event, file, fileList) {
    },
    async loading() {
      const res = await getFileList(this.$route.query.uuid);
      this.list = res.data && res.data.rows ? res.data.rows : []
    },
    upload(res) {
      this.form.pictureUuid = res.data
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await saveAttachSubType(this.form);
          if (res.code === 200) {
            await this.loading();
            this.closeDia();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeDia() {
      console.log("close")
      this.addFlag = false;
      this.$refs['form'].resetFields();
    },
    open(uuid) {
      this.videoDia = true;
      this.$nextTick(() => {
        const video = document.getElementById("video01")
        video.src = "/mingyue/attach/open?uuid=" + uuid;
        console.log("src",  video.src)
        video.play();
      })
    },
    stopOpen(){
      this.$nextTick(() => {
        const video = document.getElementById('video01');
        video.pause();
      })
    }
  }
}
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
