<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte";

  import "./nested-embla.css";

  const myFun = (emblaApi, event) => {
    event.stopPropagation();
    console.log();
    return true;
  };
  let options = { watchDrag: myFun, loop: true };
  let plugins = [];
</script>

<div class="nested-embla">
  <div
    id="parent"
    class="nested-embla__viewport"
    use:emblaCarouselSvelte={{
      options,
      plugins: [],
    }}
  >
    <div class="nested-embla__container">
      <!-- {#each imageLinks as imageLink}
        <div class="nested-embla__slide">
          <div class="nested-embla__scale">
            <img class="nested-embla__slide__img" src={imageLink} alt="Event image" />
          </div>
        </div>
      {/each} -->

      <div class="nested-embla__slide">
        <div class="nested-embla__slide__number">
          <div class="nested-embla__child">
            <div
              id="child"
              class="nested-embla__viewport__child"
              use:emblaCarouselSvelte={{
                options: { ...options, slidesToScroll: "auto" },
                plugins,
              }}
            >
              <div class="nested-embla__container__child">
                <!-- {#each imageLinks as imageLink}
        <div class="nested-embla__slide">
          <div class="nested-embla__scale">
            <img class="nested-embla__slide__img" src={imageLink} alt="Event image" />
          </div>
        </div>
      {/each} -->
                <div class="nested-embla__slide__child">
                  <div class="nested-embla__slide__number__child">A</div>
                </div>
                <div class="nested-embla__slide__child">
                  <div class="nested-embla__slide__number__child">B</div>
                </div>
                <div class="nested-embla__slide__child">
                  <div class="nested-embla__slide__number__child">C</div>
                </div>
                <div class="nested-embla__slide__child">
                  <div class="nested-embla__slide__number__child">D</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nested-embla__slide">
        <div class="nested-embla__slide__number">2</div>
      </div>
      <div class="nested-embla__slide">
        <div class="nested-embla__slide__number">3</div>
      </div>
      <div class="nested-embla__slide">
        <div class="nested-embla__slide__number">4</div>
      </div>
    </div>
  </div>
</div>
