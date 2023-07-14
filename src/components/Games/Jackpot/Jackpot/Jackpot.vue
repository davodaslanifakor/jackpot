<template>
  <div class="jackpot-wrapper">
    <h2 v-if="!gameOver" class="jackpot-credit">your credits: {{ credits }}</h2>
    <h3 v-if="gameOver" class="jackpot-fail">Game Over!</h3>
    <JackpotRow>
      <JackpotBlock
        :spinning="blocks.block1.spin"
        :result="blocks.block1.result"
      />
      <JackpotBlock
        :spinning="blocks.block2.spin"
        :result="blocks.block2.result"
      />
      <JackpotBlock
        :spinning="blocks.block3.spin"
        :result="blocks.block3.result"
      />
    </JackpotRow>
    <div class="jackpot-actions">
      <ElementButton
        @click.native="startGame"
        mode="success"
        :disabled="gameOver || loadingSpin"
      >
        {{ buttonText }}
      </ElementButton>
      <ElementButton
        mode="warning"
        @mouseover.native.once="cashOutHover"
        @click.native="cashOut"
        ref="cashOut"
        class="cash-out"
      >
        CASH OUT
      </ElementButton>
    </div>
    <!-- Rest of the code -->
  </div>
</template>

<script>
import ElementButton from "@/components/Elements/Button/Button.vue";
import JackpotRow from "@/components/Games/Jackpot/Block/Row.vue";
import {
  DEFAULT_SYMBOL,
  SPIN_TEXT,
  START_TEXT,
  SYMBOLS,
} from "@/components/Games/Jackpot/constant.js";
import JackpotBlock from "@/components/Games/Jackpot/Row/Block.vue";
import { delay } from "@/utils/commonUtils.js";

export default {
  name: "JackpotGame",
  components: {
    ElementButton,
    JackpotRow,
    JackpotBlock,
  },
  data() {
    return {
      blocks: {
        block1: {
          spin: false,
          result: DEFAULT_SYMBOL,
          hiddenResult: "",
        },
        block2: {
          spin: false,
          result: DEFAULT_SYMBOL,
          hiddenResult: "",
        },
        block3: {
          spin: false,
          result: DEFAULT_SYMBOL,
          hiddenResult: "",
        },
      },
      gameOver: false,
      buttonText: START_TEXT,
    };
  },
  computed: {
    loadingSpin() {
      return this.buttonText === SPIN_TEXT;
    },
    credits: {
      /**
       * Getter for accessing the user's credits from the store.
       * @returns {number} The user's credits.
       */
      get() {
        return this.$store.state.user.credits;
      },
      /**
       * Setter for updating the user's credits in the store.
       * @param {number} newVal - The new value for the credits.
       */
      set(newVal) {
        this.$store.commit("user/UPDATE_CREDITS", newVal);
      },
    },
  },
  methods: {
    /**
     * Starts the game by spinning the blocks and retrieving results.
     */
    async startGame() {
      if (this.credits <= 0) {
        this.gameOver = true;
        return;
      }

      this.buttonText = SPIN_TEXT;
      this.setSpinState(true);
      this.setResults(DEFAULT_SYMBOL);
      this.getResult();
    },
    /**
     * Retrieves the game result by generating random results for the blocks.
     */
    getResult() {
      const maxReRollAttempts = 1;
      let reRollAttempts = 0;

      const recursiveGetResult = async () => {
        this.generateResults();
        const shouldReRoll = this.getReRollChance() / 100;
        if (
          this.checkIsWin() &&
          shouldReRoll &&
          reRollAttempts < maxReRollAttempts
        ) {
          reRollAttempts++;
          await Promise.resolve();
          recursiveGetResult();
        } else {
          await Promise.resolve();
          this.showResultAfterDelay();
        }
      };

      recursiveGetResult();
    },
    /**
     * Determines the re-roll chance based on the user's credits.
     * @returns {number} The re-roll chance in percentage.
     */
    getReRollChance() {
      if (this.credits < 40) {
        return 0;
      } else if (this.credits >= 40 && this.credits <= 60) {
        return 30;
      } else {
        return 60;
      }
    },
    /**
     * Shows the result of the game after a delay and checks for winning condition.
     */
    async showResultAfterDelay() {
      await Promise.all([
        this.stopSpin(1000, this.blocks.block1.hiddenResult, "block1"),
        this.stopSpin(2000, this.blocks.block2.hiddenResult, "block2"),
        this.stopSpin(3000, this.blocks.block3.hiddenResult, "block3"),
      ]);

      this.checkWinning();
    },
    /**
     * Stops the spin animation of a block after a specified delay.
     * @param {number} delayMs - The delay in milliseconds before stopping the spin.
     * @param {string} result - The final result for the block.
     * @param {string} blockKey - The key of the block to update.
     * @returns {Promise<void>} A promise that resolves after stopping the spin.
     */
    async stopSpin(delayMs, result, blockKey) {
      await delay(delayMs);
      this.blocks[blockKey].spin = false;
      this.blocks[blockKey].result = result;
      return Promise.resolve();
    },
    /**
     * Generates random results for all blocks.
     */
    generateResults() {
      for (let block in this.blocks) {
        this.blocks[block].hiddenResult = this.getRandomSign();
      }
    },
    /**
     * Retrieves a random sign from the available symbols.
     * @returns {string} A random sign.
     */
    getRandomSign() {
      const signs = Object.keys(SYMBOLS);
      const randomIndex = Math.floor(Math.random() * signs.length);
      return signs[randomIndex];
    },
    /**
     * Sets the spin state of all blocks.
     * @param {boolean} spin - The spin state to set.
     */
    setSpinState(spin) {
      for (let block in this.blocks) {
        this.blocks[block].spin = spin;
      }
    },
    /**
     * Sets the result for all blocks.
     * @param {string} result - The result to set.
     */
    setResults(result) {
      for (let block in this.blocks) {
        this.blocks[block].result = result;
      }
    },
    /**
     * Checks if the current results indicate a win.
     * @returns {boolean} True if it's a win, false otherwise.
     */
    checkIsWin() {
      const results = Object.values(this.blocks).map(
        (block) => block.hiddenResult
      );
      return results[0] === results[1] && results[1] === results[2];
    },
    /**
     * Checks the winning condition and updates the game state.
     */
    checkWinning() {
      const results = Object.values(this.blocks).map((block) => block.result);
      if (results[0] === results[1] && results[1] === results[2]) {
        const reward = this.getReward(results[0]);
        this.credits += reward;
      } else {
        this.credits--;
      }

      if (this.credits <= 0) {
        this.gameOver = true;
      }

      this.buttonText = START_TEXT;
    },
    /**
     * Gets the reward points for a specific sign.
     * @param {string} sign - The sign to get the reward for.
     * @returns {number} The reward points.
     */
    getReward(sign) {
      if (SYMBOLS[sign]) return SYMBOLS[sign].point;
      return 0;
    },
    /**
     * Handles the hover event on the cash-out button.
     */
    cashOutHover() {
      const cashOutButton = this.$refs.cashOut;
      const cashOutUnclickable = Math.random() < 0.4;
      if (!cashOutUnclickable) {
        const randomDirection = Math.random() < 0.5 ? -300 : 300;
        cashOutButton.$el.style.transform = `translateX(${randomDirection}px)`;
      } else {
        cashOutButton.$el.setAttribute("disabled", "true");
      }
    },
    /**
     * Handles the cash-out event.
     */
    cashOut() {
      console.log("CALL API IF NEED OR REDUCE CREDITS");
    },
  },
};
</script>

<style scoped>
@import "./Jackpot.css";
</style>
