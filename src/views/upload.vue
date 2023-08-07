<template>
  <div style="width: 100%" ref="bodyDiv">
    <el-row :gutter="20">
      <el-col :span="24">
        <div style="float: left;margin-top: 7%">
          <div style="float: left;font-size: 20px ;cursor: pointer" @click="goBack"><i class="el-icon-back"></i></div>
          <div style="float: left;font-size: 20px"> &nbsp;| &nbsp;</div>
          <div style="float: left;font-size: 20px">媒体库</div>
        </div>
        <el-button style="float: right;margin-right: 10px;margin-top: 6%" type="primary" @click="addFlag = true">增加分类
        </el-button>
        <el-card class="box-card"
                 style="position: relative;width: 100%; height: 900px;margin-top: 10%;overflow-y: auto">
          <el-row :gutter="20">


            <el-col :span="span" v-for="(i,index) in list" :key="index" style="margin-bottom: 20px;">
              <div @click="toAttach(i)">
                <el-card ref="cardDiv" style="min-width: 50px" class="block">
                  <div ref="msgDiv" style="width: 100%;text-align: center;">
                    <div class="fontDiv" style="width: 100%;"><span class="demonstration"><b>{{ i.name }}</b></span>
                    </div>
                  </div>

                </el-card>

              </div>

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

const {attachTypeList, saveAttachType} = require("@/api");


export default {
  name: "uploadPage",
  mixins: [views],
  components: {
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
      title: '新增分类',
      span: 12
    }
  },
  created() {
    this.$nextTick(() => {
    })
  },
  activated() {
  },
  async mounted() {
    await this.loading();
    // const cardHeight = this.$refs.cardDiv[0].$el.offsetHeight;
    //
    // for (let i in this.$refs.msgDiv) {
    //   this.$refs.msgDiv[i].style.height = (cardHeight - 20) + 'px';
    // }
    this.handleResize();
    this.$nextTick(() => {
      // this.handleResize();
      window.addEventListener('resize', this.handleResize)
    })
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
      this.goPage({routeName: "uploadPage_attach", params: {...i}})
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
    handleResize() {
      // //检测div盒子长宽
      const width = this.$refs.bodyDiv.offsetWidth;

      if (width < 250) {
        this.span = 24;
      } else if (width > 250 && width < 500) {
        this.span = 12;
      } else {
        this.span = 6;
      }


      //
      // if (obj) {
      //   if (obj.length && obj.length >= 1) {
      //     const width = obj[0].offsetWidth;
      //     if (width >= 100) {
      //       for (let i in obj) {
      //         obj[i].style.fontSize = '1em';
      //       }
      //     }
      //     else {
      //       for (let i in obj) {
      //         obj[i].style.fontSize = '0.5em'
      //       }
      //     }
      //   }
      // }
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
.block:hover{
  transform: translateY(-5px);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
.bg {
  /*图片地址 不重复 水平位置居中 垂直位置居中*/
  height: 100%;
  width: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
