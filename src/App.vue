<template>
  <div id="page_container">
    <!-- шапка интерфейса -->
    <header-component v-if="auth.isUserAuthorized()" />

    <!-- <object-tree ref="objectTree" /> -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';

  import headerComponent from './components/legacy/header.vue';
  import objectTree from './components/legacy/objectsTree.vue';

  const auth = useAuthStore();
</script>

<style lang="scss">
  @import '../src/sass/fonts';

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #444444;

    #page_container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #dddddd;

      #page_content {
        position: relative;
        float: right;
        width: calc(100% - 310px);
        height: calc(100% - 60px);

        &__object_name {
          font-family: Roboto-Medium;
          margin-bottom: 0px;
          font-weight: normal;
          height: 40px;
          line-height: 40px;
        }

        &__object_company {
          margin-top: 0px;
          font-family: Roboto-Light;
          color: #999;
          margin-bottom: 20px;
          height: 20px;
          line-height: 20px;
        }
      }

      #selectObjectpageMessage {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #999;
        font-size: 14px;
        font-family: Roboto-Light;
        margin-left: -150px;
        margin-top: -20px;
        margin-bottom: 0px;
        width: 600px;
        height: 40px;
        text-align: center;
      }
    }
  }

  /*стандартные кнопки*/
  button {
    background: #56a13b;
    transition: 0.2s;
    height: 32px;
    line-height: 32px;
    color: #fff;
    padding: 0px 20px;
    border: 0px;
    border-radius: 2px;
    float: right;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
  }

  button:hover {
    background: #60b341;
  }

  button:active {
    background: #69c548;
  }

  /*стандартные текстовые поля*/
  input {
    height: 30px;
    border-radius: 2px;
    border: 1px solid #ddd;
    transition: 0.2s;
    outline: none;
    font-size: 16px;
    padding: 0px 8px;
    width: calc(100% - 18px);
    color: #888;
  }

  input:focus {
    border-color: #56a13b;
    color: #444;
  }

  input.is_empty {
    border-color: rgb(247, 151, 151);
  }

  label {
    display: block;
    font-size: 14px;
    padding-bottom: 4px;
    color: #888;
    width: 250px;
    font-family: Roboto-Light;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #aaa;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }
</style>
