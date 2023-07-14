<template>
  <img :src="src" :alt="alt" />
</template>

<script>
export default {
  name: "ImageLoader",
  props: {
    alt: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
  },
};
</script>
