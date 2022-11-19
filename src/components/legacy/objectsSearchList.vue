<template>
  <div
    v-for="item in filtredList"
    :key="item.i_object_id"
    class="search_list__item"
    @click="showPromptWindow($event, item)"
  >
    <div class="search_list__item__object_name">{{ item.name }}</div>
    <div class="search_list__item__company_name">{{ item.company_cbx }}</div>
  </div>
</template>

<script>
  export default {
    name: 'ObjectsSearchList',

    props: [
      'search', // строка поиска
    ],

    data: () => ({
      filtredList: [], // массив объектов, удовлетворяющих поисковому запросу
    }),

    watch: {
      // следим за именениями поисковой строки: очищаем массив найденных ранее элементов и запускаем поиск по списку заново
      search() {
        this.filtredList = []; // очищаем массив прошлого поиска
        this.findFiltredList(this.objects.list); // запускаем поиск заново
      },
    },

    methods: {
      /**
       * Метод производит поиск по всему списку групп и объектов по заданному поисковому запросу и помещает найденное в массив filtredList
       * @param {Array} list - содержит многоурвневый массив групп объектов и самих объектов мониторинга
       */
      findFiltredList(list) {
        list.forEach((item) => {
          // если это объект (не группа объектов) и в названии этого объекта содержится искомая строка
          if (item.edt_class_name === 'object.i_object' && item.name.indexOf(this.search) !== -1) {
            // ищем среди уже найденных объектов совпадение по названию и названию компании
            const item_already_exists = this.filtredList.find(
              (f_item) => f_item.name === item.name && f_item.company_cbx === item.company_cbx,
            );

            // если такого объекта в массиве найденных ещё нет - добавляем его
            !item_already_exists ? this.filtredList.push(item) : false;
          }
          // если же это группа объектов и у неё есть элементы, производим поиск в ней
          else if (item.nodes && item.nodes.length) this.findFiltredList(item.nodes);
        });
      },

      /**
       * Метод вызывается либо методом showPromptWindow(), если в предыдущем объекте не было изменений, либо из promptWindow
       * при нажатии кнопки "продолжить" и выбирает кликнутый объект мониторинга в списке результата поиска
       * @param {Object} event хранит данные о событии (клик) и элементе, которые его вызвал
       * @param {Object} object хранит данные выбранного объекта мониторинга (id, название, наименование компании)
       */
      selectItem(event, object) {
        let search_list_items;

        // удаляем у всех элементов в списке результатов поиска класс selected
        if (event.target.parentElement.id === 'object_tree__list_block')
          search_list_items = event.target.parentElement.querySelectorAll('.search_list__item');
        else
          search_list_items =
            event.target.parentElement.parentElement.querySelectorAll('.search_list__item');

        search_list_items.forEach((item) => item.classList.remove('selected'));

        // добавляем класс selected выбранному элементу в списке результатов поиска
        if (event.target.className === 'search_list__item') event.target.classList.add('selected');
        else if (event.target.parentElement.className === 'search_list__item')
          event.target.parentElement.classList.add('selected');

        this.selectObject(object.i_object_id); // передаём id выбранного объекта мониторинга в хранилище
        this.setSelectedObjectCompany(object.company_cbx); // передаём название компании выбранного объекта в хранилище
        this.setSelectedObjectName(object.name); // передаём название выбранного объекта в хранилище
      },
    },

    mounted() {
      this.findFiltredList(this.objects.list); // запускаем поиск при включении компоненты поиска
    },
  };
</script>

<style lang="scss">
  .search_list__item {
    height: 60px;
    cursor: pointer;
    transition: 0.1s;

    .search_list__item__object_name {
      padding: 10px 12px 6px;
      font-family: Roboto-Regular;
      font-size: 16px;
      color: #eee;
    }

    .search_list__item__company_name {
      font-size: 12px;
      font-family: Roboto-Light;
      padding: 0px 12px;
      color: #ddd;
    }
  }

  .search_list__item:hover {
    background: #bbb;
    color: #fff;
  }

  .search_list__item.selected {
    background: #bfbfbf;
    color: #fff;
  }
</style>
