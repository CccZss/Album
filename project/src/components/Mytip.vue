<template>
  <div class="tip" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper" @input="handleShowPopper" >
    <transition name="fade">
      <div class="content" v-show="tipShow">
        <Icon type="arrow-left-b" color="rgba(255, 255, 255, 0.75)"></Icon><span>{{this.tipInfo}}</span>
      </div>
    </transition>
    <slot >
    </slot>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["content", "info"],

  data() {
    return {
      tipShow: false
    };
  },

  computed: {
    tipInfo() {
      return this.info === "" ? this.content : this.info;
    }
  },

  methods: {
    handleShowPopper() {
      this.tipShow = true;
    },
    handleClosePopper() {
      if (this.info !== "") {
        this.tipShow = true;
      } else {
        this.tipShow = false;
      }
    }
  }
};
</script>

<style scoped>
.tip {
  position: relative;
}
.tip .content {
  text-align: left;
  width: 200px;
  position: absolute;
  right: -205px;
}
.tip span {
  display: inline-block;
  padding: 5px 10px;
  margin: 0;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.75);
}
</style>

