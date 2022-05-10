<template>
  <el-dialog
    title="发布"
    :visible.sync="dialog.show"
    width="1000px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-row :gutter="30">
      <el-col :span="14">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="标题" prop="first">
            <div class="field-wrap">
              <el-input
                v-model="formData.first"
                placeholder="请输入标题"
                maxlength="150"
                class="field"
              />
              <el-color-picker v-model="color1" :predefine="predefineColors">
              </el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="签约项目" prop="keyword1">
            <div class="field-wrap">
              <el-input
                v-model="formData.keyword1"
                placeholder="请输入"
                maxlength="150"
                class="field"
              />
              <el-color-picker v-model="color2" :predefine="predefineColors">
              </el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="签约时间" prop="keyword2">
            <div class="field-wrap">
              <el-input
                v-model="formData.keyword2"
                placeholder="请输入"
                maxlength="150"
                class="field"
              />
              <el-color-picker v-model="color3" :predefine="predefineColors">
              </el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <div class="field-wrap">
              <el-input
                v-model="formData.remark"
                placeholder="请输入备注"
                maxlength="150"
                class="field"
                type="textarea"
                :rows="3"
              />
              <el-color-picker v-model="color4" :predefine="predefineColors">
              </el-color-picker>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <!-- 预览 -->
        <div class="preview">
          <p class="title">模板消息预览</p>
          <div class="content-wrap">
            <div class="template">
              <div class="template-main">
                <p class="template-name">签约项目通知</p>
                <p class="template-tilte" :style="{ color: color1 }">
                  {{ formData.first }}
                </p>
                <p class="template-field">
                  <span class="label">签约项目:</span>
                  <span class="value" :style="{ color: color2 }">{{
                    formData.keyword1
                  }}</span>
                </p>
                <p class="template-field">
                  <span class="label">签约时间:</span>
                  <span class="value" :style="{ color: color3 }">{{
                    formData.keyword2
                  }}</span>
                </p>
                <p class="template-field">
                  <span class="label">备注:</span>
                  <span class="value" :style="{ color: color4 }">{{
                    formData.remark
                  }}</span>
                </p>
              </div>
              <div class="template-footer app-flex-between">
                <span>查看详情</span>
                <span>&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

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
import { sendTemplate } from "@/api/publish";
export default {
  name: "groupForm",
  mixins: [formMixin],
  data() {
    const validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        first: "",
        keyword1: "",
        keyword2: "",
        remark: "",
      },
      color1: "#999999",
      color2: "#FF0000",
      color3: "#0000FF",
      color4: "#999999",
      rules: {
        first: [{ required: true, message: "请输入标题", trigger: "blur" }],
        keyword1: [
          { required: true, message: "请输入签约项目", trigger: "blur" },
        ],
        keyword2: [
          { required: true, message: "请输入签约时间", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      predefineColors: ["#999999", "#FF0000", "#0000FF"],
      id: null,
    };
  },
  methods: {
    open(id) {
      this.dialog.show = true;
      this.dialog.loading = false;
      this.id = id
    },
    saveOrUpdate() {
      const params = {
        id: this.id,
        first_value: this.formData.first,
        first_color: this.color1,
        keyword1_value: this.formData.keyword1,
        keyword1_color: this.color2,
        keyword2_value: this.formData.keyword2,
        keyword2_color: this.color3,
        remark_value: this.formData.remark,
        remark_color: this.color4,
      };
      sendTemplate(params).then(() => {
        this.$message.success("发送成功");
        this.close();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.preview {
  border: 1px solid #eee;
  color: #333;
  .title {
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
  }
  .content-wrap {
    background: #f5f5f5;
    padding: 20px;
  }
  .template {
    background: white;
  }
  .template-main {
    padding: 20px;
    color: #9c9c9c;
  }
  .template-name {
    color: #333;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .template-tilte {
    margin-bottom: 15px;
  }
  .template-field {
    line-height: 30px;
    display: flex;
    .label {
      width: 80px;
    }
  }
  .template-footer {
    border-top: 1px solid #eee;
    padding: 14px 20px;
  }
}

.field-wrap {
  display: flex;
  .field {
    flex: 1;
    margin-right: 5px;
  }
}
</style>
