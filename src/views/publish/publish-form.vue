<template>
  <el-dialog title="发布" :visible.sync="dialog.show" width="1000px">
    <el-row :gutter="30">
      <el-col :span="14">
        <el-form
          ref="groupform"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="标题" prop="field1" class="is-required">
            <el-input
              v-model="formData.data.first.value"
              placeholder="请输入标题"
              maxlength="150"
            />
          </el-form-item>
          <el-form-item label="服务管家" prop="field2" class="is-required">
            <el-input
              v-model="formData.data.keyword1.value"
              placeholder="请输入"
              maxlength="150"
            />
          </el-form-item>
          <el-form-item label="服务项目" prop="field3" class="is-required">
            <el-input
              v-model="formData.data.keyword2.value"
              placeholder="请输入"
              maxlength="150"
            />
          </el-form-item>
          <el-form-item label="备注" prop="field4" class="is-required">
            <el-input
              v-model="formData.data.remark.value"
              placeholder="请输入备注"
              maxlength="150"
            />
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
                <p class="template-name">服务接单提醒</p>
                <p
                  class="template-tilte"
                  :style="{ color: formData.data.first.color }"
                >
                  {{ formData.data.first.value }}
                </p>
                <p class="template-field">
                  <span class="label">服务管家:</span>
                  <span
                    class="value"
                    :style="{ color: formData.data.keyword1.color }"
                    >{{ formData.data.keyword1.value }}</span
                  >
                </p>
                <p class="template-field">
                  <span class="label">服务项目:</span>
                  <span
                    class="value"
                    :style="{ color: formData.data.keyword2.color }"
                    >{{ formData.data.keyword2.value }}</span
                  >
                </p>
                <p class="template-field">
                  <span
                    class="value"
                    :style="{ color: formData.data.remark.color }"
                    >{{ formData.data.remark.value }}</span
                  >
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
      <el-button type="default" @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
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
        touser: "",
        template_id: "TTZYzEur28kgGJsYJznx7neFyFk7UL2Z6wSgRpCDY2Q",
        url: "",
        topcolor: "#FF0000",
        data: {
          first: {
            value: "",
            color: "#173177",
          },
          keyword1: {
            value: "",
            color: "#173177",
          },
          keyword2: {
            value: "",
            color: "#173177",
          },
          remark: {
            value: "",
            color: "#173177",
          },
        },
      },
      rules: {
        field1: [{ validator, trigger: "blur" }],
        field2: [{ validator, trigger: "blur" }],
        field3: [{ validator, trigger: "blur" }],
        field4: [{ validator, trigger: "blur" }],
      },
    };
  },
  methods: {
    open() {
      this.dialog.show = true;
      this.dialog.title = "新建分组";
    },
    submit() {},
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
  }
  .template-footer {
    border-top: 1px solid #eee;
    padding: 14px 20px;
  }
}
</style>
