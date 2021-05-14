<template>
    <transition name="modal" appear>
        <div class="modal-mask" @click.self="$emit('close')">
        <div class="modal-wrapper">
        <div class="modal-container">
            <div class="header">
                <!-- slot 태그를 통해 하위컴포넌트(모달)에서는 틀만 정의하고
                상위 컴포넌트(mypage)에서 화면에 보여질 데이터 정의 -->
                <slot name="header"> (모달 이름) </slot>
            </div>

            <div class="modal-body">
                <slot name="body"> (내용) </slot>
            </div>

            <footer class="footer">
                <slot name="footer">
                <button class="modal-button" @click="$emit('close')">
                    (닫기)
                </button>
                </slot>
            </footer>
        </div>
        </div>
        </div>
    </transition>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>