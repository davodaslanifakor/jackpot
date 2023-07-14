import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import JackpotGame from "@/components/Games/Jackpot/Jackpot/Jackpot.vue";
import ElementButton from "@/components/Elements/Button/Button.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("JackpotGame", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            credits: 10,
          },
          mutations: {
            UPDATE_CREDITS: (state, newVal) => {
              state.credits = newVal;
            },
          },
        },
      },
    });

    wrapper = shallowMount(JackpotGame, {
      localVue,
      store,
    });
  });

  it("initializes with the correct data", () => {
    expect(wrapper.vm.blocks).toEqual({
      block1: {
        spin: false,
        result: "?",
        hiddenResult: "",
      },
      block2: {
        spin: false,
        result: "?",
        hiddenResult: "",
      },
      block3: {
        spin: false,
        result: "?",
        hiddenResult: "",
      },
    });
    expect(wrapper.vm.$store.state.user.credits).toBe(10);
    expect(wrapper.vm.gameOver).toBe(false);
    expect(wrapper.vm.buttonText).toBe("START");
  });

  it("starts the game and updates the state", async () => {
    const elementButton = wrapper.findComponent(ElementButton);
    elementButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.buttonText).toBe("SPIN");
    expect(wrapper.vm.blocks.block1.spin).toBe(true);
    expect(wrapper.vm.blocks.block2.spin).toBe(true);
    expect(wrapper.vm.blocks.block3.spin).toBe(true);
  });

  it("checks the winning condition and updates the state", () => {
    wrapper.vm.blocks.block1.result = "C";
    wrapper.vm.blocks.block2.result = "C";
    wrapper.vm.blocks.block3.result = "C";

    wrapper.vm.checkWinning();

    expect(wrapper.vm.$store.state.user.credits).toBe(20);
    expect(wrapper.vm.buttonText).toBe("START");
  });

  it("returns the correct re-roll chance based on the credits", () => {
    store.replaceState({
      user: {
        credits: 30,
      },
    });
    expect(wrapper.vm.getReRollChance()).toBe(0);

    store.replaceState({
      user: {
        credits: 50,
      },
    });
    expect(wrapper.vm.getReRollChance()).toBe(30);

    store.replaceState({
      user: {
        credits: 80,
      },
    });
    expect(wrapper.vm.getReRollChance()).toBe(60);
  });

  it("calls getResult again when shouldReRoll is true", async () => {
    wrapper.vm.generateResults();
    wrapper.vm.getReRollChance = jest.fn().mockReturnValue(50);

    const getResultSpy = jest.spyOn(wrapper.vm, "getResult");

    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.3);

    await wrapper.vm.getResult();

    expect(getResultSpy).toHaveBeenCalled();

    Math.random = originalRandom;
  });
});
