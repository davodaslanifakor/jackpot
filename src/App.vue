<template>
  <JackpotGame />
</template>
<script>
import { JackpotGame } from "@/components/Games/index.js";

export default {
  name: "App",
  components: { JackpotGame },
};
</script>
<style>
body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>
