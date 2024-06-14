import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "post/PostsList" },
    { path: "/posts/:postId", component: "post/SinglePostPage"}
  ],
  npmClient: 'pnpm',
});
