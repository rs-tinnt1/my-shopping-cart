import { Layout } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./presentation/routes";
import "./style.css";

const app = createApp(App);
app.use(Layout);
app.use(router);
app.mount("#app");
