<script lang="ts">
  import EmblaCarousel from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  import { onMount } from "svelte";
  import "./nested-embla.css";

  let parentEmblaApi = null;
  let childEmblaApi = null;
  let autoplayPlugin = null;
  let resumeTimeout: number | null = null;

  // Options for parent and child carousels
  const watchDrag = (_, event) => {
    event.stopPropagation();
    return true;
  };
  let parentOptions = { watchDrag, loop: true };
  let childOptions = { watchDrag, loop: true, slidesToScroll: "auto" as const };
  let parentPlugins = [
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnLastSnap: false,
    }),
  ];

  // Debounce function to prevent excessive event triggers
  const debounce = (func: (source: string) => void, wait: number) => {
    let timeout: number | null = null;
    return (source: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(source), wait);
    };
  };

  // Function to pause parent autoplay and resume after inactivity
  const pauseParentAutoplay = (source: string) => {
    if (autoplayPlugin && typeof autoplayPlugin.stop === "function") {
      autoplayPlugin.stop();
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        if (autoplayPlugin && typeof autoplayPlugin.play === "function") {
          autoplayPlugin.reset(); // Reset plugin state
          autoplayPlugin.play();
        } else {
          console.error(
            "Autoplay plugin not available for resumption",
            autoplayPlugin
          );
        }
      }, 1000);
    } else {
      console.error(
        `Autoplay plugin not available for pausing (from ${source})`,
        autoplayPlugin
      );
    }
  };

  // Debounced version of pauseParentAutoplay
  const debouncedPauseParentAutoplay = debounce(pauseParentAutoplay, 200);

  // Initialize carousels on mount
  onMount(() => {
    // Initialize parent carousel
    const parentNode = document.querySelector("#parent");
    if (parentNode) {
      parentEmblaApi = EmblaCarousel(
        parentNode as HTMLElement,
        parentOptions,
        parentPlugins
      );
      const plugins = parentEmblaApi.plugins();
      autoplayPlugin = plugins?.autoplay;
      if (autoplayPlugin) {
      } else {
        console.error("Autoplay plugin not found, initializing manually");
        autoplayPlugin = Autoplay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnLastSnap: false,
        });
        parentEmblaApi.plugins = () => ({ Autoplay: autoplayPlugin });
      }
      // Parent interaction listeners
      parentEmblaApi.on("pointerDown", () => {
        debouncedPauseParentAutoplay("parent");
      });
      parentEmblaApi.on("scroll", () => {
        debouncedPauseParentAutoplay("parent");
      });
    } else {
      console.error("Parent node not found");
    }

    // Initialize child carousel
    const childNode = document.querySelector("#child");
    if (childNode) {
      childEmblaApi = EmblaCarousel(childNode as HTMLElement, childOptions, []);
      // Child interaction listeners
      childEmblaApi.on("pointerDown", () => {
        debouncedPauseParentAutoplay("child");
      });
      childEmblaApi.on("scroll", () => {
        debouncedPauseParentAutoplay("child");
      });
      childEmblaApi.on("select", () => {
        debouncedPauseParentAutoplay("child");
      });
    } else {
      console.error("Child node not found");
    }

    return () => {
      clearTimeout(resumeTimeout);
      if (parentEmblaApi) parentEmblaApi.destroy();
      if (childEmblaApi) childEmblaApi.destroy();
    };
  });
</script>

<div class="nested-embla" aria-label="Parent carousel">
  <div id="parent" class="nested-embla__viewport">
    <div class="nested-embla__container">
      <div class="nested-embla__slide">
        <div class="nested-embla__slide__number">
          <div class="nested-embla__child">
            <div
              id="child"
              class="nested-embla__viewport__child"
              aria-label="Nested carousel"
            >
              <div class="nested-embla__container__child">
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
