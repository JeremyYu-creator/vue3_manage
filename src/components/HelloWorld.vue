<template>
  <div class="hello">
    <h1 @click="dialogVisible = true">{{ name }}</h1>
    <el-popover
      placement="top-start"
      :width="200"
      trigger="hover"
      :content="content"
    >
      <template #reference>
        <el-button>hover 激活</el-button>
      </template>
    </el-popover>
  </div>
  <el-dialog
    title="提示"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :show-close="showClo"
  >
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const name = ref("点击测试dialog展示");
    const dialogVisible = ref(false);
    const showClo = ref(false);
    const content = ref(
      "这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    );
    const handleClose = function () {
      dialogVisible.value = false;
      ElMessage.error("点击了");
    };
    return {
      name,
      dialogVisible,
      showClo,
      content,
      handleClose,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
