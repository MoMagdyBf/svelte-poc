<script>
  import { Button, Modal } from "flowbite-svelte";
  import { fade } from "svelte/transition";

  const customDialogClass =
    "fixed top-0 start-0 end-0 h-[calc(100dvh-1rem)] md:inset-0 md:h-full z-50 w-full p-4 flex items-end justify-center";

  let id;
  let placement;
  let open = false;

  const setPlacement = (ev) => {
    placement = ev.target.textContent; // text in the button
    id = `${placement}-modal`;
    open = !open;
  };
</script>

<div class="text-center m-4">
  <Button on:click={setPlacement}>bottom-center Modal</Button>
</div>
{#if open}
  <div transition:fade={{ duration: 200 }}>
    <Modal
      {id}
      title="Terms of Service"
      bind:open
      {placement}
      autoclose
      backdropClass="hidden"
      dialogClass={customDialogClass}
      defaultClass="shadow-xl"
    >
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer
      </p>
      <svelte:fragment slot="footer">
        <Button>I accept</Button>
        <Button color="alternative">Decline</Button>
      </svelte:fragment>
    </Modal>
  </div>
{/if}
