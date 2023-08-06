<template>
  <el-upload
      class="avatar-uploader"
      action="#"
      :http-request="handleUpload"
      :on-remove="handleRemove"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { upload } from "@/api"
export default {
  name: "picUpload",
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    handleRemove(file) {

    },
    async handleUpload(arg) {
      const { file, filename } = arg;
      try {
        const res = await upload(file);
        this.$emit("update:upload", res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = "/mingyue/attach/download?uuid=" + res.data
      console.log("url->",this.imageUrl)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
      // return isJPG;
      return true;
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
