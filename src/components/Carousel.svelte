<script lang="ts">
  import type { EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Autoplay from "embla-carousel-autoplay";

  import { setupTweenScale } from "./EmblaCarouselTweenScale";
  import "./embla.css";

  let options = { loop: true };
  let plugins = [Autoplay({ delay: 4000, stopOnInteraction: false })];

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    let emblaApi = event.detail;

    let removeTweenScale = setupTweenScale(emblaApi);

    emblaApi.on("destroy", removeTweenScale);
  };
</script>

<div class="embla">
  <div
    class="embla__viewport"
    use:emblaCarouselSvelte={{ options, plugins }}
    on:emblaInit={onInit}
  >
    <div class="embla__container">
      <!-- {#each imageLinks as imageLink}
        <div class="embla__slide">
          <div class="embla__scale">
            <img class="embla__slide__img" src={imageLink} alt="Event image" />
          </div>
        </div>
      {/each} -->
      <div class="embla__slide">
        <div class="embla__slide__number">1</div>
      </div>
      <div class="embla__slide">
        <div class="embla__slide__number">2</div>
      </div>
      <div class="embla__slide">
        <div class="embla__slide__number">3</div>
      </div>
      <div class="embla__slide">
        <div class="embla__slide__number">4</div>
      </div>
      <div class="embla__slide">
        <div class="embla__slide__number">5</div>
      </div>
    </div>
  </div>
</div>
