<template>
  <div class="escalante-container">
    <div class="top-header">
      <div class="chill-music">
        <svg xmlns="http://www.w3.org/2000/svg" class="icons">
          <symbol id="play" viewBox="0 0 448 512">
            <path
              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
            />
          </symbol>
          <symbol id="pause" viewBox="0 0 448 512">
            <path
              d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48
                  48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
            />
          </symbol>
        </svg>
        <audio ref="player" loop preload>
          <source src="chill_music.mp3" type="audio/mpeg" />
        </audio>
        <div
          class="chill-button"
          @click="changeStatus"
          v-bind:class="chillClass"
        >
          <svg class="chill-button__icon chill-button__icon--play">
            <use xlink:href="#play"></use>
          </svg>
          <svg class="chill-button__icon chill-button__icon--pause">
            <use xlink:href="#pause"></use>
          </svg>
        </div>
        <av-circle
          :canv-width="57"
          :canv-height="57"
          ref-link="player"
          caps-color="#FFF"
          :bar-color="['#ff18e0', '#0dff15', '#ff18e0']"
          :caps-height="2"
          :audio-controls="false"
        >
        </av-circle>
      </div>
      <div class="top-header__title">El Robot de Juan Carlos Escalante</div>
      <img
        class="super-show-logo"
        src="super_show_logo.png"
        @click="toYoutube"
      />
    </div>
    <div class="escalante-operation">
      <div class="escalante-canvas">
        <Escalante ref="canvasShow" />
      </div>
      <div class="partidos-buttons">
        <div class="partido-button pan-button" @click="clickPan">PAN</div>
        <div class="partido-button pri-button" @click="clickPri">
          <span>P</span><span>R</span><span>I</span>
        </div>
        <div class="partido-button prd-button" @click="clickPrd">PRD</div>
        <div class="partido-button harto-button" @click="clickHarto">
          <div><span>ESTOY HARTO </span><span>DEL </span></div>
          <div>PRI</div>
        </div>
      </div>
    </div>
    <div class="bottom-footer">
      <span class="bottom-footer__text"
        >Desarrollado con máximo respeto por </span
      ><span
        @click="toTwitter"
        class="bottom-footer__text bottom-footer__text--link"
        >@higaguin</span
      >
    </div>
  </div>
</template>

<script>
import Escalante from "./Escalante.vue";

const phrases = Object.freeze({ PAN: 1, PRI: 2, PRD: 3, EstoyHarto: 4 });

export default {
  components: {
    Escalante,
  },
  data() {
    return {
      phrase: null,
      isPlaying: false,
    };
  },
  computed: {
    chillClass: function () {
      return this.isPlaying
        ? "chill-button__icon--onpause"
        : "chill-button__icon--onplay";
    },
  },
  methods: {
    clickPan() {
      this.phrase = phrases.PAN;
      this.$refs.canvasShow.onPlay(this.phrase);
    },
    clickPri() {
      this.phrase = phrases.PRI;
      this.$refs.canvasShow.onPlay(this.phrase);
    },
    clickPrd() {
      this.phrase = phrases.PRD;
      this.$refs.canvasShow.onPlay(this.phrase);
    },
    clickHarto() {
      this.phrase = phrases.EstoyHarto;
      this.$refs.canvasShow.onPlay(this.phrase);
    },
    toYoutube() {
      window.open("https://www.youtube.com/c/FranHevia/videos", "_blank");
    },
    toTwitter() {
      window.open("https://twitter.com/higaguin", "_blank");
    },
    changeStatus() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    },
  },
};
</script>

<style scoped>
.button {
  display: flex;
  background-color: darkgrey;
  padding: 1rem;
  justify-content: center;
  border-radius: 5rem;
  color: white;
  cursor: pointer;
}

.escalante-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.escalante-operation {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.partidos-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.partido-button {
  cursor: pointer;
}

.pan-button {
  font-family: "Oi", cursive;
  text-shadow: 4px 4px white;
  color: #4770c7;
}

.pri-button {
  font-family: "Train One", cursive;
}

.pri-button span:first-child {
  color: #38b46a;
}

.pri-button span:nth-child(2) {
  color: white;
}

.pri-button span:last-child {
  color: #ffa8a3;
}

.prd-button {
  font-family: "Monoton", cursive;
  color: #ffdf64;
}

.harto-button {
  font-family: "Bungee Shade", cursive;
  display: flex;
  color: #4aadbb;
}

.harto-button div:first-child {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 0.5rem;
}

.harto-button div:last-child {
  font-size: 2rem;
}

@media only screen and (max-width: 500px) {
  .partido-button {
    padding: 1rem;
  }

  .pan-button {
    font-size: 2rem;
  }

  .pri-button {
    font-size: 2rem;
  }

  .pan-button {
    font-size: 2rem;
  }

  .prd-button {
    font-size: 2rem;
  }

  .top-header__title {
    display: none;
  }
}

@media only screen and (min-width: 500px) {
  .partido-button {
    padding: 2rem;
  }

  .pan-button {
    font-size: 3rem;
  }

  .pri-button {
    font-size: 3rem;
  }

  .pan-button {
    font-size: 3rem;
  }

  .prd-button {
    font-size: 3rem;
  }

  .top-header__title {
    display: block;
  }
}

.top-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
}

.top-header__title {
  font-family: "Press Start 2P", cursive;
  font-size: 1rem;
  color: #f5f5f5;
}

.super-show-logo {
  height: 4rem;
  cursor: pointer;
  margin-left: 57px;
  margin-right: 1.5rem;
}

.chill-music {
  display: flex;
}

.chill-player {
  height: 3.5rem;
}

.chill-button {
  cursor: pointer;
  padding: 1rem;
  display: flex;
}

.chill-button__icon {
  fill: #0dff15;
  height: 1.4rem;
  vertical-align: middle;
  width: 1.4rem;
  transition: all 100ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chill-button__icon--onplay .chill-button__icon--play {
  transform: translateX(50%);
  opacity: 1;
}

.chill-button__icon--onpause .chill-button__icon--play {
  transform: translateX(-50%);
  opacity: 0;
}

.chill-button__icon--onplay .chill-button__icon--pause {
  transform: translateX(50%);
  opacity: 0;
}

.chill-button__icon--onpause .chill-button__icon--pause {
  transform: translateX(-50%);
  opacity: 1;
}

.icons {
  display: none;
}

.bottom-footer {
  background: black;
  opacity: 0.7;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.bottom-footer__text {
  font-family: "Press Start 2P", cursive;
  font-size: 0.5rem;
  color: #f5f5f5;
}

.bottom-footer__text--link {
  cursor: pointer;
  margin-left: 0.5rem;
  border-bottom: 1px solid #f5f5f5;
}
</style>
