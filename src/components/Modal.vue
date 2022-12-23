<script lang="ts" setup>
  const props = defineProps({
    show: Boolean,
    text: String,
    acceptText: String,
    icon: String,
  });
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div class="mt-6 text-2xl font-bold">
                {{ text }}
              </div></slot
            >
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div class="px-5 mt-8 flex gap-5">
                <div
                  class="px-2.5 py-2 w-26 h-9 flex gap-3 items-center bg-gray rounded hover:opacity-95 cursor-pointer"
                  @click="$emit('no')"
                >
                  <span class="flex items-center text-main font-sans">Отмена</span>
                  <vue-feather type="x" size="14" stroke="white" />
                </div>
                <div
                  class="px-2.5 py-2 w-26 h-9 flex gap-3 items-center bg-light-red rounded hover:opacity-95 cursor-pointer"
                  @click="$emit('yes')"
                >
                  <span class="flex items-center text-main font-sans">Да</span>
                  <vue-feather :type="icon" size="14" stroke="white" />
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 586px;
    height: 198px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 25px;
    font-family: 'Playfair Display';
    font-weight: 800;
    font-size: 24px;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
