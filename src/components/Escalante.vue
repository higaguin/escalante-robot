<template>
  <div>
    <audio id="myAudio" preload>
      <source src="pan.mp3" type="audio/mpeg" />
      <source src="prd.mp3" type="audio/mpeg" />
      <source src="pri.mp3" type="audio/mpeg" />
      <source src="harto.mp3" type="audio/mpeg" />
    </audio>
    <div id="canvasContainer">
      <canvas id="riveCanvas2" class="escalante-canvas"></canvas>
    </div>
  </div>
</template>

<script>
const phrases = Object.freeze({
  NONE: 0,
  PAN: 1,
  PRI: 2,
  PRD: 3,
  EstoyHarto: 4,
  LEFT: 5,
  RIGHT: 6,
});

const accesiblePhrases = [phrases.LEFT, phrases.RIGHT];

export default {
  data() {
    return {
      canvas: null,
      artboard: null,
      phrase: phrases.NONE,
      panAnimInstance: null,
      priAnimInstance: null,
    };
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  mounted() {
    const r = Rive({
      locateFile: (file) => "https://unpkg.com/rive-canvas@0.7.1/" + file,
    }).then((rive) => {
      const req = new Request("/rive/supershow.riv");
      fetch(req)
        .then((res) => {
          return res.arrayBuffer();
        })
        .then((buf) => {
          const file = rive.load(new Uint8Array(buf));
          this.artboard = file.defaultArtboard();
          let that = this;
          const panAnim = that.artboard.animationByName("PAN");
          const priAnim = that.artboard.animationByName("PRI");
          const prdAnim = that.artboard.animationByName("PRD");
          const hartoAnim = that.artboard.animationByName("EstoyHarto");
          const left = that.artboard.animationByName("LEFT");
          const right = that.artboard.animationByName("RIGHT");
          const blink = that.artboard.animationByName("BLINK");
          this.panAnimInstance = new rive.LinearAnimationInstance(panAnim);
          this.priAnimInstance = new rive.LinearAnimationInstance(priAnim);
          this.prdAnimInstance = new rive.LinearAnimationInstance(prdAnim);
          this.hartoAnimInstance = new rive.LinearAnimationInstance(hartoAnim);
          this.leftAnimInstance = new rive.LinearAnimationInstance(left);
          this.rightAnimInstance = new rive.LinearAnimationInstance(right);
          this.blinkAnimInstance = new rive.LinearAnimationInstance(blink);

          this.canvas = document.getElementById("riveCanvas2");
          const ctx = this.canvas.getContext("2d");
          const renderer = new rive.CanvasRenderer(ctx);

          const canvasContainer = document.getElementById("canvasContainer");
          const canvasRect = canvasContainer.getBoundingClientRect();

          this.canvas.width = canvasRect.width;
          this.canvas.height = 500;

          that.artboard.advance(0);

          ctx.save();
          renderer.align(
            rive.Fit.contain,
            rive.Alignment.center,
            {
              minX: 0,
              minY: 0,
              maxX: this.canvas.width,
              maxY: this.canvas.height,
            },
            that.artboard.bounds
          );

          that.artboard.draw(renderer);
          ctx.restore();

          let lastTime = 0;
          let canvas = this.canvas;

          function draw(time) {
            if (!lastTime) {
              lastTime = time;
            }
            const elapsedTime = (time - lastTime) / 1000;
            lastTime = time;

            that.blinkAnimInstance.advance(elapsedTime);
            that.blinkAnimInstance.apply(that.artboard, 1.0);

            if (that.phrase == phrases.PAN) {
              if (that.panAnimInstance.time < 0.83) {
                that.panAnimInstance.advance(elapsedTime);
                that.panAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            } else if (that.phrase == phrases.PRI) {
              if (that.priAnimInstance.time < 0.38) {
                that.priAnimInstance.advance(elapsedTime);
                that.priAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            } else if (that.phrase == phrases.PRD) {
              if (that.prdAnimInstance.time < 1.25) {
                that.prdAnimInstance.advance(elapsedTime);
                that.prdAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            } else if (that.phrase == phrases.EstoyHarto) {
              if (that.hartoAnimInstance.time < 1.38) {
                that.hartoAnimInstance.advance(elapsedTime);
                that.hartoAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            } else if (that.phrase == phrases.LEFT) {
              if (that.leftAnimInstance.time < 3) {
                that.leftAnimInstance.advance(elapsedTime);
                that.leftAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            } else if (that.phrase == phrases.RIGHT) {
              if (that.rightAnimInstance.time < 3) {
                that.rightAnimInstance.advance(elapsedTime);
                that.rightAnimInstance.apply(that.artboard, 1.0);
              } else {
                that.phrase = phrases.NONE;
                that.intervalAnimation();
              }
            }

            that.artboard.advance(elapsedTime);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            renderer.align(
              rive.Fit.contain,
              rive.Alignment.center,
              {
                minX: 0,
                minY: 0,
                maxX: canvas.width,
                maxY: canvas.height,
              },
              that.artboard.bounds
            );
            that.artboard.draw(renderer);
            ctx.restore();

            requestAnimationFrame(draw);
          }

          requestAnimationFrame(draw);
        });
    });
    this.intervalAnimation();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onPlay(phrase) {
      this.cleanAnimations();
      this.phrase = phrase;
      let audio;

      switch (phrase) {
        case phrases.PAN:
          audio = new Audio("pan.mp3");
          audio.play();
          break;
        case phrases.PRI:
          audio = new Audio("pri.mp3");
          audio.play();
          break;
        case phrases.PRD:
          audio = new Audio("prd.mp3");
          audio.play();
          break;
        case phrases.EstoyHarto:
          audio = new Audio("harto.mp3");
          audio.play();
          break;
        default:
          break;
      }
    },
    intervalAnimation() {
      const minimum = 4000;
      const maximum = 8000;
      const randomNumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

      setTimeout(() => {
        if (this.phrase == phrases.NONE) {
          this.cleanAnimations();

          this.phrase =
            accesiblePhrases[
              Math.floor(Math.random() * accesiblePhrases.length)
            ];
        }
      }, randomNumber);
    },
    onResize() {
      const canvasContainer = document.getElementById("canvasContainer");
      const canvasRect = canvasContainer.getBoundingClientRect();

      this.canvas.width = canvasRect.width;
      this.canvas.height = canvasRect.height;
    },
    cleanAnimations() {
      if (this.panAnimInstance != null) this.panAnimInstance.time = 0;
      if (this.priAnimInstance != null) this.priAnimInstance.time = 0;
      if (this.prdAnimInstance != null) this.prdAnimInstance.time = 0;
      if (this.hartoAnimInstance != null) this.hartoAnimInstance.time = 0;
      if (this.leftAnimInstance != null) this.leftAnimInstance.time = 0;
      if (this.rightAnimInstance != null) this.rightAnimInstance.time = 0;
    },
  },
};
</script>

<style>
@media only screen and (max-width: 500px) {
  .escalante-canvas {
    height: 300px;
  }
}

@media only screen and (min-width: 500px) {
  .escalante-canvas {
    height: 500px;
  }
}
</style>