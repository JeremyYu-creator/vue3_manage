<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-office-building"></i> 国内新闻</span>
      </template>
      <ChinaNews></ChinaNews>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-toilet-paper"></i> 娱乐新闻</span>
      </template>
      <EntNews></EntNews>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-basketball"></i> 体育新闻</span>
      </template>
      <SportNews></SportNews
    ></el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span><i class="el-icon-mobile-phone"></i> 科技新闻</span>
      </template>
      <TechonologyNews></TechonologyNews>></el-tab-pane
    >
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChinaNews from "@/views/secondDirec/newsView/chinaNews.vue";
import EntNews from "@/views/secondDirec/newsView/entNews.vue";
import SportNews from "@/views/secondDirec/newsView/sportNews.vue";
import TechonologyNews from "@/views/secondDirec/newsView/technologyNews.vue";
export default defineComponent({
  name: "news",
  components: {
    ChinaNews,
    EntNews,
    SportNews,
    TechonologyNews,
  },
});
</script>

<style lang="stylus" scoped>
.main
  margin 30px auto
  .select-row
    // width 100%
    height 100px
    background-color #ffffff
    border-shadow  0px 2px 20px 0px rgba(0, 0, 0, 0.08);
    border 1px solid rgba(0, 0, 0, 0.08)
    .select-block
      display flex
      align-items center
      margin 0 20px
      padding-top 20px
      .select-item
        display flex
        align-items center
        .select-name
          margin-right 10px
  .table-style
    .urlAddress
      cursor pointer
  .footer
    display flex
    justify-content flex-end
    margin 10px 0
</style>
