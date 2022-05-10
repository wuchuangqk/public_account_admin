<template>
  <el-dialog
    title="添加内容"
    :visible.sync="dialog.show"
    width="800px"
    :close-on-click-modal="false"
    :before-close="close"
    id="content-form"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="用户识别码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入用户识别码"
          maxlength="150"
        />
      </el-form-item>
      <el-form-item label="结算周期" prop="settcycle_id">
        <el-input
          v-model="formData.settcycle_id"
          placeholder="请输入结算周期"
          maxlength="150"
        />
      </el-form-item>
      <el-form-item label="内容" prop="info">
        <el-input
          v-model="formData.info"
          placeholder="请输入内容"
          maxlength="150"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
      <el-form-item label="二维码" prop="pic">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.pic" :src="formData.pic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取 消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { savePublish } from "@/api/publish";
export default {
  name: "groupForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        code: "", // 用户识别码
        settcycle_id: "", // 结算周期
        info: "", // 内容
        pic: "", // 二维码地址
      },
      rules: {
        code: [
          { required: true, message: "请输入用户识别码", trigger: "blur" },
        ],
        settcycle_id: [
          { required: true, message: "请输入用户识别码", trigger: "blur" },
        ],
        info: [
          { required: true, message: "请输入用户识别码", trigger: "blur" },
        ],
        pic: [{ required: true, message: "请上传二维码", trigger: "change" }],
      },
      baseUrl: "https://appv41.bdhuoke.com/api/v41/gzh/uploadfile",
    };
  },
  methods: {
    open() {
      this.dialog.show = true;
      this.dialog.loading = false;
    },
    saveOrUpdate() {
      savePublish(this.formData).then(() => {
        this.$message.success("添加成功");
        this.$emit("update-data");
        this.close();
      });
    },
    handleAvatarSuccess(res) {
      this.formData.pic = "https://appv41.bdhuoke.com" + res.data;
    },
    beforeAvatarUpload(file) {
      const isJPGOrPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPGOrPNG) {
        this.$message.info("上传图片只能是 JPG 或 PNG 格式!");
      }
      return isJPGOrPNG;
    },
  },
};
</script>

<style lang="scss">
#content-form {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
}
</style>
