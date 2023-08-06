<template>
  <div style="width: 100%">
    <el-row :gutter="20">
      <el-col :span="24">
        <div style="float: left;margin-top: 7%">
          <div style="float: left;font-size: 20px ;cursor: pointer" @click="goBack"> <i class="el-icon-back"></i> </div>
          <div style="float: left;font-size: 20px" > &nbsp;| &nbsp;</div>
          <div style="float: left;font-size: 20px" >媒体库</div>
        </div>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="addFlag = true">增加分类
        </el-button>
        <el-card class="box-card"
                 style="position: relative;width: 100%; height: 900px;margin-top: 10%;overflow-y: auto">
          <el-row :gutter="20">


              <el-col :span="6" v-for="(i,index) in list" :key="index" style="margin-bottom: 20px">
                <el-card style="max-height: 400px">

                  <div class="block" style="width: 100%;text-align: center;">
                    <span class="demonstration" style="font-size: 20px"><b>{{ i.name }}</b></span>
                    <el-image style="width: 250px;height: 300px" :src="'mingyue/attach/download?uuid=' + i.pictureUuid">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <el-button :circle="true" @click="toAttach(i)">
                      <i class="el-icon-caret-right"></i>
                    </el-button>
                  </div>

                </el-card>

              </el-col>

          </el-row>
        </el-card>

        <el-dialog :title="title" :visible.sync="addFlag" :close-on-click-modal="false" @close="closeDia()"
                   :close-on-press-escape="false" style="width: 900px;margin: 0 auto">
          <el-form :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="分类图片" v-model="form.pictureUuid">

              <picUpload @update:upload="upload"></picUpload>

            </el-form-item>
          </el-form>
          <el-footer class="dialog-footer" height="40px">
            <div style="float: right">
              <el-button size="small" @click="closeDia">关闭</el-button>
              <el-button size="small" type="primary" @click="submit('form')">提交</el-button>
            </div>
          </el-footer>
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import picUpload from "@/utils/upload"
import views from "@/utils/views";
import 'video.js/dist/video-js.css'

const {attachTypeList, saveAttachType} = require("@/api");


export default {
  name: "upload",
  mixins: [views],
  component: {
    picUpload
  },
  data() {
    return {
      form: {
        name: '',
        pictureUuid: ''
      },
      rules: {},
      type: "mp4",
      list: [],
      addFlag: false,
      title: '新增分类'
    }
  },
  mounted() {

    this.loading();

  },
  methods: {
    async loading() {
      const res = await attachTypeList();
      if (res) {
        this.list = res.data && res.data.rows ? res.data.rows : [];
      } else {
        this.list = [];
      }
    },
    toAttach(i) {
      this.goPage({routeName: "attach", params: {...i}})
    },
    upload(res) {
      this.form.pictureUuid = res.data
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await saveAttachType(this.form);
          if (res && res.code && res.code === 200) {
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
    open(o) {
      const arr = o.split(".");
      console.log("sdc->", this.sdc)
      const video = document.getElementById('vide01');
      video.src = "/mingyue/hello/open?uuid=" + arr[0] + "&type=" + arr[1];
      this.type = arr[1];
      video.play();
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
