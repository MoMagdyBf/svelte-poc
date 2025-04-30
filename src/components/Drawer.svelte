<script>
  import { Drawer, Button, CloseButton, A } from "flowbite-svelte";
  import { InfoCircleSolid, ArrowRightOutline } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";

  let hidden8 = true;
  let transitionParamsBottom = {
    y: 320,
    duration: 200,
    easing: sineIn,
  };
</script>

<div class="text-center">
  <Button on:click={() => (hidden8 = false)}>Show drawer</Button>
</div>

<Drawer
  placement="bottom"
  width="w-full"
  transitionType="fly"
  transitionParams={transitionParamsBottom}
  bind:hidden={hidden8}
  id="sidebar8"
>
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      <InfoCircleSolid class="w-5 h-5 me-2.5" />Info
    </h5>
    <CloseButton
      on:click={() => (hidden8 = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <p class="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">
    Supercharge your hiring by taking advantage of our <a
      href="/"
      class="text-primary-600 underline dark:text-primary-500 hover:no-underline"
    >
      limited-time sale
    </a>
    for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates
    and the #1 design job board.
  </p>
  <Button color="primary" href="/">Learn more</Button>
  <Button href="/" class="px-4"
    >Get access <ArrowRightOutline class="w-5 h-5 ms-2" /></Button
  >
</Drawer>
