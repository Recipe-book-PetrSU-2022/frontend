<template>
  <div id="object_tree">
    <div id="object_tree__search_block">
      <input id="object_tree__search" v-model="search" placeholder="поиск..." />
      <button id="object_tree__search_button"></button>
    </div>

    <div id="object_tree__list_block">
      <objects-tree-list ref="list" v-if="component_interface.mode === 'tree'" />
      <objects-search-list
        ref="search"
        v-if="component_interface.mode === 'search'"
        :search="search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // import objectsTreeList from './objectsTreeList.vue';
  // import objectsSearchList from './objectsSearchList.vue';

  // const axios = require('axios');

  // export default {
  //   name: 'ObjectsTree',

  //   components: {
  //     'objects-tree-list': objectsTreeList,
  //     'objects-search-list': objectsSearchList,
  //   },

  //   data: () => ({
  //     search: '', // текст строки поиска объектов мониторинга
  //     component_interface: {
  //       showLoader: false, // флаг, отображающий или скрывающий индикатор загрузки в дереве объектов
  //       mode: 'tree', // режим отображения списка объектов: tree - общее дерево объектов; search - список объектов по результату поиска
  //     },
  //   }),

  //   watch: {
  //     // следим за вводом в поле поиска, и если ввели хоть один символ - отображаем вместо дерева объектов компонент с результатом поиска
  //     search(value) {
  //       if (value.length) {
  //         this.component_interface.mode = 'search';
  //       } else {
  //         this.component_interface.mode = 'tree';
  //       }
  //     },
  //   },

  //   methods: {
  //     getObjectsTree() {
  //       this.component_interface.showLoader = true; // отображаем индикатор загрузки в дереве ОМ
  //       axios.get('/api/v1/object/x_i_object_group_tree').then((response) => {
  //         const source_list = response.data.result.data;

  //         source_list.sort((a, b) => {
  //           if (a.name > b.name) return 1;
  //           if (a.name < b.name) return -1;
  //           return 0;
  //         });

  //         // this.setObjectsList(source_list);
  //       });
  //     },
  //   },
  // };
</script>

<style lang="scss">
  #object_tree {
    width: 300px;
    height: calc(100% - 50px);
    background: #d1d1d1;
    color: #fff;
    float: left;
    position: relative;

    &__search_block {
      position: relative;

      input#object_tree__search {
        height: 32px;
        border: 0px;
        padding: 0px 30px 0px 12px;
        opacity: 0.8;
        margin: 10px;
        width: 237px;
      }

      input#object_tree__search:focus {
        opacity: 1;
      }

      button#object_tree__search_button {
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background: url('../../src/assets/images/interface_icons/search.svg');
        padding: 0px;
        position: absolute;
        right: 16px;
        top: 16px;
        opacity: 0.6;
      }

      button#object_tree__search_button:hover {
        opacity: 0.8;
      }

      button#object_tree__search_button:active {
        opacity: 1;
      }
    }

    &__create_buttons_block {
      width: calc(100% - 20px);
      height: 56px;
      background: #a4a4a4;
      padding: 10px;
      border-bottom: 1px solid #888;

      > p {
        margin: 0px 0px 10px;
        font-family: Roboto-Light;
        color: #eee;
        height: 14px;
        line-height: 14px;
        font-size: 10px;

        > span {
          display: block;
          float: left;
          background: #fff;
          color: #888;
          font-size: 11px;
          width: 14px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          margin-right: 6px;
          border-radius: 14px;
        }
      }

      > a {
        display: block;
        float: left;
        height: 30px;
        background: #bbb;
        padding: 0px 24px;
        line-height: 30px;
        font-family: Roboto-Light;
        text-decoration: none;
        font-size: 12px;
        color: #fff;
        text-transform: uppercase;
        transition: 0.2s;
        border: 1px solid #bbb;
      }

      > a:last-child {
        float: right;
      }

      > a:hover {
        background: #c3c3c3;
        border: 1px solid #c3c3c3;
      }

      > a:active {
        background: #ccc;
        border: 1px solid #ccc;
      }

      > a.router-link-active {
        background: #56a13b;
        border: 1px solid #a1cc91;
      }
    }

    &__list_block {
      width: 100%;
      height: calc(100% - 130px);
      overflow-y: auto;
      border-top: 1px solid #ddd;
      background: #afafaf;
    }
  }
</style>
