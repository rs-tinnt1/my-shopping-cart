<template>
  <a-layout class="layout-default">
    <base-header />
    <a-layout-content style="padding: 0 50px">
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          minHeight: '280px',
        }"
      >
        <router-view> </router-view>
      </div>
    </a-layout-content>
    <base-footer />
  </a-layout>
</template>

<script setup lang="ts">
import BaseFooter from "../organisms/BaseFooter.vue";
import BaseHeader from "../organisms/BaseHeader.vue";
</script>

<style>
.ant-layout-content {
  min-height: calc(100vh - 134px);
}
.router-link-exact-active {
  color: #12b488;
}
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
  background: #141414;
}
</style>
