<template>
  <button :class="['element-button', mode]" role="button">
    <slot></slot>
  </button>
</template>

<script>
import { BUTTONMODS } from "@/components/Elements/Button/constant.js";

export default {
  name: "ElementButton",
  props: {
    mode: {
      type: String,
      default: "primary",
      validator: (value) => {
        return BUTTONMODS.includes(value);
      },
    },
  },
};
</script>

<style scoped>
@import "Button.css";
</style>
