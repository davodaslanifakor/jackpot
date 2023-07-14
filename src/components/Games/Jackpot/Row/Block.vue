<template>
  <div class="jackpot-block-container">
    <div :class="['jackpot-block-carousel', { spinning: spinning }]">
      <div class="jackpot-block-carousel-item a">
        <ImageLoader
          :src="`/images/games/jackpot/${resultImage.name}.svg`"
          :alt="resultImage.alt"
          width="40"
          height="40"
        />
      </div>
      <div class="jackpot-block-carousel-item b">
        <ImageLoader
          src="/images/games/jackpot/cherries.svg"
          alt="cherries"
          width="40"
          height="40"
        />
      </div>
      <div class="jackpot-block-carousel-item c">
        <ImageLoader
          src="/images/games/jackpot/lemon.svg"
          alt="lemon"
          width="40"
          height="40"
        />
      </div>
      <div class="jackpot-block-carousel-item d">
        <ImageLoader
          src="/images/games/jackpot/orange.svg"
          alt="orange"
          width="40"
          height="40"
        />
      </div>
      <div class="jackpot-block-carousel-item e">
        <ImageLoader
          src="/images/games/jackpot/watermelon.svg"
          alt="watermelon"
          width="40"
          height="40"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ImageLoader from "@/components/Elements/Images/ImageLoader.vue";
import { LIST_RESULT_SYMBOL } from "@/components/Games/Jackpot/constant.js";
export default {
  name: "JackpotBlock",
  components: { ImageLoader },
  props: {
    spinning: {
      type: Boolean,
      required: true,
    },
    result: {
      type: String,
      default: "?",
    },
  },
  computed: {
    /**
     * Computes the image object based on the result symbol.
     * @returns {object} The image object with name and alt properties.
     */
    resultImage() {
      if (LIST_RESULT_SYMBOL[this.result])
        return LIST_RESULT_SYMBOL[this.result];
      return LIST_RESULT_SYMBOL["?"];
    },
  },
};
</script>
<style scoped>
@import "./Block.css";
</style>
