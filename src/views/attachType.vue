<template>
  <div style="width: 100%" ref="bodyDiv">
    <el-row :gutter="20">
      <el-col :span="24">
        <div style="float: left;margin-top: 7%">
          <div style="float: left;font-size: 20px ;cursor: pointer" @click="goBack"> <i class="el-icon-back"></i> </div>
          <div style="float: left;font-size: 20px" > &nbsp;| &nbsp;</div>
          <div style="float: left;font-size: 20px" >{{ name }}</div>
        </div>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="addFlag = true">增加分类</el-button>
        <el-card class="box-card" style="position: relative;width: 100%; height: 900px;margin-top: 10%;overflow-y: auto">
          <el-row :gutter="20">


            <el-col :span="span" v-for="(i,index) in list" :key="index" style="margin-bottom: 20px">
              <div @click="toAttach(i)" >
                <el-card ref="cardDiv" class="block" style="max-height: 400px;min-height: 150px;min-width: 50px">

                  <div class="block"  ref="msgDiv" style="width: 100%;text-align: center;position: relative">

                    <div ref="fontDiv" class="fontDiv" style="width: 100%;float: left"><span class="demonstration"><b>{{ i.name }}</b></span>
                    </div>

                    <div style="width: 100%;float: left">
                      <el-image style="max-width: 250px;max-height: 300px"
                                :src="'/mingyue/attach/download?uuid=' + i.pictureUuid">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>

                  </div>

                </el-card>
              </div>

            </el-col>

          </el-row>
        </el-card>

        <el-dialog :title="title" :visible.sync="addFlag" :close-on-click-modal="false" @close="closeDia()" :close-on-press-escape="false" style="width: 900px;margin: 0 auto" >
          <el-form :rules="rules" ref="form" :model="form" label-width="80px">
            <el-form-item label="分类名称">
              <el-input v-model="form.name" size="small" ></el-input>
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
import 'video.js/dist/video-js.css'
import views from "@/utils/views";
import {saveAttachSubType,attachSubTypeList } from "@/api";

export default {
  name: "uploadPage_attach",
  mixins: [views],
  components: {
    picUpload
  },
  data() {
    return {
      span: 6,
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
      title: '新增分类'
    }
  },
  created() {
  },
  activated() {
    this.list = []
    this.name = this.$route.query.name
    this.form.fatherType = this.$route.query.uuid;
    this.loading();
    this.handleResize();
    this.$nextTick(async () =>{
      window.addEventListener('resize', this.handleResize)
    })
  },
  methods: {
    toAttach(i) {
      this.goPage({routeName: "uploadPage_attachSubType", params: {...i}})
    },
    async loading() {
      const res = await attachSubTypeList({fatherType: this.form.fatherType});
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
    open(o) {
      const arr = o.split(".");
      console.log("sdc->", this.sdc)
      const video = document.getElementById('vide01');
      video.src = "/mingyue/hello/open?uuid=" + arr[0] + "&type=" + arr[1];
      this.type = arr[1];
      video.play();
    },
    handleResize() {
      const width = this.$refs.bodyDiv.offsetWidth;

      if (width < 250) {
        this.span = 24;
      } else if (width > 250 && width < 500) {
        this.span = 12;
      } else {
        this.span = 6;
      }

    }
  }
}
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
@media (max-width: 730px) {
  .fontDiv {
    font-size: 0.5em;
  }
}
.block:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
