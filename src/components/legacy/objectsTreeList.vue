<script setup lang="jsx">
  /**
   * Метод вызывается методом render() и принимает в качестве параметра все дерево объектом мониторинга (в первый раз), или отдельную группу дерева
   * с вложенными в неё элементами. Если переданный элемент - группа, то метод возвращает раскрывающийся элемент списка в рендер и рекурсивно вызывает
   * сам себя, передавая в качестве параметра элемент-группу с её потомками. Если элемент - объект, метод возвращает рендеру конечный элемент списка - объект.
   * @param {Array} list хранит элемент (группу объектов или объект) и его потомков в nodes, если это группа объектов
   */
  function generateObjectsList(list) {
    const template = list.map((item) => {
      // если данный элемент дерева - это группа элементов у неё есть дочерние потомки
      if (
        (item.edt_class_name === 'object.i_object_group_set' ||
          item.edt_class_name === 'object.i_object_group') &&
        item.nodes &&
        item.nodes.length
      ) {
        return (
          <li>
            <span onClick={this.switchShowingObjectGroup}>
              <div class="folder_icon"></div>
              {item.name_cbx}
            </span>
            <ul class={`objectsList__level_${item.level} hide`}>
              {this.generateObjectsList(item.nodes)}
            </ul>
          </li>
        );
      }
      if (item.edt_class_name === 'object.i_object') {
        // если данный элемент дерева - объект мониторинга
        return (
          <li>
            <span
              id={`objects_tree__item_${item.ref_record_id}`}
              class="objectsList__object_item"
              title={`${item.name}::${item.company_cbx}`}
              onClick={this.showPromptWindow}
            >
              {item.name_cbx}
            </span>
          </li>
        );
      }
    });

    return template;
  }

  /**
   * Метод открывает и закрывает группы объектов в дереве объектов, меняя окрас иконки (папка)
   * @param {Object} event хранит данные события (клик) и элемента, вызвавшего его
   */
  function switchShowingObjectGroup(event) {
    let list;
    if (event.target.parentElement.tagName === 'LI')
      list = event.target.parentElement.querySelector('ul');
    else list = event.target.parentElement.parentElement.querySelector('ul');

    // управляем отображением и скрытием вложенного в li списка через добавление и удаление класса hide
    list.classList.contains('hide') ? list.classList.remove('hide') : list.classList.add('hide');

    const folder_icon = list.parentNode.querySelector('.folder_icon'); // получаем элемент иконки (папка)
    // управляем стилем иконки: при открытии списка она становится закрашенной, а при закрытии остаётся только её контур
    folder_icon.classList.contains('open')
      ? folder_icon.classList.remove('open')
      : folder_icon.classList.add('open');
  }

  /**
   * Метод вызывается либо методом showPromptWindow(), если в предыдущем объекте не было изменений, либо из promptWindow
   * при нажатии кнопки "продолжить" и выбирает кликнутый объект мониторинга в дереве
   * @param {Object} event хранит данные о событии (клик) и элементе, которые его вызвал
   */
  function selectItem(event) {
    const object_items = this.$el.querySelectorAll('.objectsList__object_item'); // выбираем все элементы объектов в списке

    object_items.forEach((object_item) => {
      // удаляем у всех элементов дерева типа "объект" класс selected
      object_item.classList.remove('selected');
    });

    event.target.classList.add('selected'); // добавляем класс selected к выбранному элементу для его подсветки в дереве объектов

    const params = event.target.title.split('::'); // получаем массив с элементами названия объекта и названия его компании

    this.selectObject(event.target.id.slice(19, event.target.id.length)); // сохраняем в хранилище id выбранного объекта в дереве
    this.setSelectedObjectName(params[0]); // сохраняем в хранилище имя выбранного объекта мониторинга
    this.setSelectedObjectCompany(params[1]); // сохраняем в хранилище имя компании выбранного объекта мониторинга
  }

  /**
   * Метод рендерит дерево объектов мониторинга вызывая рекурсивный метод generateObjectsList и передавая на старте ему все многоуровневое
   * дерево объектов, полученно от API
   */
  function render() {
    return <ul class="objectsList__level_0">{this.generateObjectsList(this.objects.list)}</ul>;
  }
</script>

<style lang="scss" scoped>
  ul {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: block;
    overflow: hidden;

    li span {
      display: block;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      transition: 0.2s;
      padding: 0px 10px;
      overflow: hidden;

      div.folder_icon {
        width: 20px;
        height: 14px;
        background: url('../../src/assets/images/interface_icons/folder_stroke.svg');
        float: left;
        margin-right: 10px;
        cursor: pointer;
        margin-top: 8px;
      }

      div.folder_icon.open {
        background: url('../../src/assets/images/interface_icons/folder_fill.svg');
      }
    }

    li span:hover {
      background: #bbbbbb;
    }

    li span:hover div.folder_icon {
      background: url('../../src/assets/images/interface_icons/folder_fill.svg');
    }

    li span.selected {
      background: #bfbfbf;
    }
  }

  ul.hide {
    display: none;
  }

  ul.objectsList__level_0 {
    padding: 0px 0px 0px 10px;
  }

  ul.objectsList__level_1,
  ul.objectsList__level_2,
  ul.objectsList__level_3,
  ul.objectsList__level_4,
  ul.objectsList__level_5 {
    padding: 0px 0px 0px 30px;
  }
</style>
