# vue-frag-plugin <a href="https://npm.im/vue-frag-plugin"><img src="https://badgen.net/npm/v/vue-frag-plugin"></a>

Webpack/Rollup/Vite plugin to use multiple root nodes in Vue 2 [Single-file Components (SFCs)](https://vuejs.org/v2/guide/single-file-components.html). Powered by [`vue-frag`](https://github.com/privatenumber/vue-frag).


```vue
<template>
    <!-- No wrapping fragment! -->
    <span>
        Hello
    </span>
    <span>
        Multiple root nodes
    </span>
</template>
```

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🚀 Install
```sh
npm i -D vue-frag-plugin vue-frag
```

## 🙋‍♂️ Why?
[`vue-frag`](https://github.com/privatenumber/vue-frag) is a directive that lets you use Fragments in Vue.js 2 components, but you have to manually register it and insert it as the root node.

`vue-frag-plugin` is a build-time plugin that automates this process, injecting vue-frag where necessary. You will be able to use multiple root nodes seamlessly in your SFCs, bringing the developer experience much closer to Vue 3.

## 🚦 Quick setup

### Webpack
Add `vue-frag-plugin/loader` before `vue-loader` in `webpack.config.js`.

<details>
  <summary>Example <code>webpack.config.js</code></summary>
  <br>

```diff
   module.exports = {
     ...,

     module: {
       rules: [
         ...,

         // Update the vue-loader rule to insert `vue-frag-plugin/loader` before it
         {
           test: /\.vue$/,
-          loader: 'vue-loader',
+          use: [
+            'vue-loader',
+            'vue-frag-plugin/loader'
+          ]
         }
       ]
     }
   }
```
</details>


### Rollup / Vite
1. Import `vueFrag` from `vue-frag-plugin`
2. Add it to `plugins` before the Vue plugin in `rollup.config.js` or `vite.config.js`

<details>
  <summary>Example <code>rollup.config.js</code></summary>
  <br>

```diff
  import { definePlugin } from 'rollup
  import vue from 'rollup-plugin-vue'
+ import { vueFrag } from 'vue-frag-plugin'

 export default definePlugin({
   ...,

   plugins: [
+    vueFrag(), // Important this goes before `vue()`
     vue()
   ],

   ...
 })
```
</details>

<details>
  <summary>Example <code>vite.config.js</code></summary>
  <br>

```diff
  import { definePlugin } from 'vite'
  import { createVuePlugin } from 'vite-plugin-vue2'
+ import { vueFrag } from 'vue-frag-plugin'

 export default definePlugin({
   ...,

   plugins: [
+    vueFrag(), // Important this goes before `createVuePlugin()`
     createVuePlugin()
   ],

   ...
 })
```
</details>

## 💞 Related
- [unplugin-vue2-script-setup](https://github.com/antfu/unplugin-vue2-script-setup) - Build-time plugin to use `<script setup>` in Vue 2 SFC
