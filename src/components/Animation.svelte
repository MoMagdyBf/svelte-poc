<script>
  import { onMount } from "svelte";
  import lottie from "lottie-web";
  let container;

  onMount(async () => {
    const response = await fetch("/lottie/Delivery_24.json");
    const animationData = await response.json();

    lottie.loadAnimation({
      container,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      animationData, // Use preloaded data instead of path
    });

    return () => lottie.destroy();
  });
</script>

<div bind:this={container} style="width: 50px; height: 50px;"></div>
