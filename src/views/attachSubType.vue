<template>
  <div style="width: 100%;" ref="bgdiv">

    <!--    <el-dialog :visible.sync="videoDia"-->
    <!--               ref="videoDia"-->
    <!--               :close-on-click-modal="false"-->
    <!--               @close="stopOpen"-->
    <!--               :width="videoDiaWidth"-->
    <!--               :close-on-press-escape="false"-->
    <!--    >-->
    <!--      <el-row :gutter="20">-->
    <!--        <el-col :span="24">-->
    <!--          <video id="video01" :src="''" style="width: 100%" controls></video>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-dialog>-->


    <el-row :gutter="20">
      <el-col :span="24">

        <div style="float: left;margin-top: 7%">
          <div style="float: left;font-size: 20px ;cursor: pointer" @click="goBack"><i class="el-icon-back"></i></div>
          <div style="float: left;font-size: 20px"> &nbsp;| &nbsp;</div>
          <div style="float: left;font-size: 20px">{{ name }}</div>
        </div>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="loading">刷新</el-button>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="addFlag = true">增加
        </el-button>
<!--        <el-card class="box-card"-->
<!--                 style="position: relative;width: 100%; height: 900px;margin-top: 10%;overflow-y: auto">-->
        <div style="position: relative;width: 100%;margin-top: 10%;">

          <el-row :gutter="0">

            <div
                ref="toSmall"
                v-show="show"
                style="position: absolute;
                z-index: 96;
                    right: 0;
                    height: 30px;width: 60px;
                    opacity: 0.2;
                    background-color: black;
                    line-height:30px;  ">
            </div>
            <div
                ref="toSmall"
                v-show="show"
                style="position: absolute;
                z-index: 97;
                right: 0;
                cursor: pointer;
                height: 30px;width: 60px;
                color: #f9fafc;text-align:center;
                line-height:30px;  "
               >
              缩小
            </div>
            <div
                ref="toSmall"
                @click="toSmall"
                v-if="!changeFlag"
                v-on:mouseover="showTosmall"
                v-on:mouseleave="notShowSmall"
                style="position: absolute;
                z-index: 98;
                right: 0;
                height: 30px;width: 60px;
                opacity: 0;
                background-color: black;
                line-height:30px;  ">
            </div>

            <el-col :span="videoSpan">
              <div style="width: 100%">
                <video id="video01" ref="video01" :src="''" style="width: 100%; " controls></video>
              </div>
            </el-col>

            <el-col :span="listSpan">
              <div :style="{width: '100%','background-color': '#525252',height: height + 'px', maxHeight: listSpan === 4 ? '1024px' : '200px'}">

                          <el-row :gutter="5">


                            <el-col class="block" :span="listSpan === 24 ? 2 : 12" v-for="(i,index) in list" :key="index"
                            :style="{width: listSpan === 24 ? '100px' : '50%', float: 'left',marginTop: '5px'}"
                            >
                              <div :title="i.name" @click="open(i.uuid)"
                                   style="width: 100%;background-color: #ffffff;
                                   border: #f9fafc;
                                   border-radius: 5px;
                                   cursor: pointer;
                                   height: 30px;text-align: center;line-height: 30px;color: #000000"
                              >

                                 <span style="">{{ i.name.toString().substring(0,5) }}</span>

                              </div>

                            </el-col>

                          </el-row>

              </div>
              <div id="toRight" @click="toRight" v-if="listSpan === 4"
                   :style="{ width: '20px',top: 0,'background-color': '#409EFF',height: height + 'px','position': 'absolute',cursor: 'pointer'}">
                <div class="toRightButton" :style="{ height: (height / 3) + 'px', position: 'absolute', top:'33%'}">
                  <i class="el-icon-arrow-right" style="position: absolute;bottom: 50%;color: #ffffff"></i>
                </div>
              </div>
            </el-col>

          </el-row>


          <!--          <el-row :gutter="20">-->


          <!--            <el-col :span="span" v-for="(i,index) in list" :key="index" style="margin-bottom: 20px">-->
          <!--              <div @click="open(i.uuid)">-->
          <!--                <el-card ref="cardDiv"  class="block">-->

          <!--                  <div ref="msgDiv" style=";position: relative">-->

          <!--                    <div ref="fontDiv" class="fontDiv" style="width: 100%;">-->
          <!--                      <span class="demonstration"><b>{{ i.name }}</b></span>-->
          <!--                    </div>-->

          <!--                  </div>-->

          <!--                </el-card>-->
          <!--              </div>-->

          <!--            </el-col>-->

          <!--          </el-row>-->
        </div>
<!--        </el-card>-->

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
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
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
import {Loading} from 'element-ui'

import {MessageBox} from "element-ui";
import {getFileList} from "@/api";
import {saveAttachSubType, upload} from "@/api";

export default {
  name: "uploadPage_attachSubType",
  mixins: [views],
  component: {
    picUpload,
    video: Video
  },
  data() {
    return {
      show: false,
      videoSpan: 20,
      listSpan: 4,
      drawer: true,
      span: 12,
      count: 0,
      height: '50px',
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
      videoDiaWidth: '',
      rules: {},
      type: "mp4",
      list: [],
      addFlag: false,
      title: '新增',
      changeFlag: true
    }
  },
  created() {
  },
  activated() {
    this.list = []
    this.name = this.$route.query.name
    this.loading();

    this.handleResize();
    this.$nextTick(async () => {

      window.addEventListener('resize', this.handleResize)
    })
  },
  methods: {
    async toSmall() {
      this.changeFlag = true;
      await this.handleResize();
      this.show = false
      if (this.listSpan === 4) {
        const video01 = this.$refs.video01;
        this.height = video01.offsetHeight;

      }
    },
    toRight() {
      this.changeFlag = false;
      this.listSpan = 24;
      this.videoSpan = 24;
    },
    async handleUpload(arg) {
      const {file, filename} = arg;
      try {
        const res = await upload(file, this.$route.query.uuid, arg);
        if (res.code === 200) {
          await this.loading()
        }
      } catch (e) {
        console.log(e);
      }
    },
    before() {
      // 创建弹出框等待提示
      this.showProcess = true
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    success(response, file, fileList) {
      let flag = true;
      for (let i in fileList) {
        if (fileList[i].status !== 'success') {
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
      // console.log("close")
      this.addFlag = false;
      this.$refs['form'].resetFields();
    },
    open(uuid) {
      this.handleResize();
      this.videoDia = true;
      this.$nextTick(() => {
        const video = document.getElementById("video01")
        video.src = "/mingyue/attach/open?uuid=" + uuid;
        // console.log("src", video.src)
        video.play();
      })
    },
    stopOpen() {
      this.$nextTick(() => {
        const video = document.getElementById('video01');
        video.pause();
      })
    },
    notShowSmall() {
      if (this.show) {
        this.show = false
      }
    },
    showTosmall() {
      if (!this.show) {
        this.show = true
      }
    },
    async handleResize() {
      //检测div盒子长宽
      const obj = this.$refs.bgdiv;


      if (obj.offsetWidth <= 900) {
        this.videoDiaWidth = '100%'
        if (this.changeFlag) {
          this.listSpan = 24;
          this.videoSpan = 24;
        }
      }
      if (obj.offsetWidth > 1024) {
        this.videoDiaWidth = '60%'
        if (this.changeFlag) {
          this.listSpan = 4;
          this.videoSpan = 20;
        }
      }

      if (obj.offsetWidth < 250) {
        this.span = 24;
      } else if (obj.offsetWidth > 250 && obj.offsetWidth < 500) {
        this.span = 12;
      } else {
        this.span = 6;
      }

      const video01 = this.$refs.video01;
      this.height = video01.offsetHeight;
      return true

    }
  }
}
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.block {
  text-align: center;
}

@media (max-width: 730px) {
  .fontDiv {
    font-size: 0.5em;
  }
}

#toRight {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0
}

#toRight:hover {
  opacity: 0.7;
}

.toRightButton {
  background-color: #409EFF;
  width: 100%;
}
.block:hover {
  color: #409EFF;
  transform: translateY(-5px);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
