<script>
  import { Card, Progressbar, Button, Modal } from "flowbite-svelte";
  import { AngleUpOutline, AngleDownOutline } from "flowbite-svelte-icons";
  import { fade } from "svelte/transition";
  import { tick } from "svelte";
  import Animation from "./Animation.svelte";

  // State for visibility and progress
  let progress = 0;
  let isVisible = true;
  let isModalOpen = false;

  // Animation for progress bar
  async function animateProgress() {
    progress = 0; // Reset to 0
    while (true) {
      if (progress >= 75) {
        progress = 0; // Loop back to 0
        await tick(); // Ensure DOM updates
      }
      progress += 1; // Increment progress
      await new Promise((resolve) => setTimeout(resolve, 50)); // Control speed (50ms per step)
    }
  }

  // Start animation when card is visible
  $: if (isVisible) {
    animateProgress();
  }

  // Reactively show card when modal closes
  $: if (!isModalOpen && !isVisible) {
    isVisible = true;
  }

  // Handle card click
  function handleCardClick() {
    isVisible = false; // Trigger card fade-out
    isModalOpen = true; // Show modal immediately
  }

  // Handle modal close
  function handleModalClose() {
    isModalOpen = false; // Close modal, triggers reactive isVisible update
  }

  function handleBackdropClick(event) {
    // Only close if clicking the backdrop, not the modal content
    if (event.target.classList.contains("backdrop")) {
      handleModalClose();
    }
  }
</script>

{#if isVisible}
  <div transition:fade={{ duration: 80 }}>
    <Card
      class="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md shadow-lg flex flex-col p-4 rounded-t-[1rem] rounded-b-none bg-white dark:bg-gray-800"
      onclick={handleCardClick}
    >
      <!-- Top Section: Icon, Text, and Close Button -->
      <div class="flex items-center justify-between">
        <!-- Left Section: Icon and Text -->
        <div class="flex items-center gap-3">
          <!-- Scooter Icon -->
          <Animation />

          <!-- Text Section -->
          <div class="text-left">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Order is on the way
            </h3>
            <span>
              Arrive by
              <span
                class="text-sm bg-green-100 text-lime-700 w-fit p-1 mx-auto rounded font-semibold
              "
              >
                12:00 PM
              </span>
            </span>
          </div>
        </div>

        <!-- Right Section: Close Button -->
        <AngleUpOutline class="w-6 h-6 text-black" />
      </div>

      <div class="w-full flex items-center justify-between my-4">
        <!-- Progress Bar -->
        <Progressbar progress="100" color="green" class="w-28" size="h-1.5" />
        <Progressbar progress="100" color="green" class="w-28" size="h-1.5" />
        <Progressbar
          {progress}
          color="green"
          class="w-28 transition-all duration-200"
          size="h-1.5"
        />
      </div>
    </Card>
  </div>
{/if}

<!-- Popup Modal with Fade-In -->
{#if isModalOpen}
  <div
    class="backdrop fixed inset-0 z-40 bg-black/70"
    onclick={handleBackdropClick}
    onkeydown={(event) => event.key === "Enter" && handleBackdropClick(event)}
    transition:fade={{ duration: 80 }}
    role="button"
    tabindex="0"
  >
    <Modal
      bind:open={isModalOpen}
      autoclose
      classHeader="hidden"
      outsideclose
      class="rounded-t-[1rem] bg-white dark:bg-gray-800"
      dialogClass="fixed left-0 right-0 w-full p-4 focus:outline-none order-update-modal"
      backdropClass="hidden"
      onclose={handleModalClose}
    >
      <div class="p-4 relative">
        <div class="absolute right-0 top-0">
          <button
            onclick={handleModalClose}
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <AngleDownOutline class="w-6 h-6 text-black" />
          </button>
        </div>
        <div class="grid text-center gap-3">
          <!-- Left Section: Icon and Text -->
          <!-- Scooter Icon -->
          <div class="mx-auto">
            <Animation />
          </div>

          <!-- Text Section -->
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            Order is on the way
          </h2>
          <span>
            Arrive by
            <span
              class="text-sm bg-green-100 text-lime-700 w-fit p-1 mx-auto rounded font-semibold
            "
            >
              12:00 PM
            </span>
          </span>

          <div class="w-full flex items-center justify-between my-4">
            <!-- Progress Bar -->
            <Progressbar
              progress="100"
              color="green"
              class="w-22"
              size="h-1.5"
            />
            <Progressbar
              progress="100"
              color="green"
              class="w-22"
              size="h-1.5"
            />
            <Progressbar
              {progress}
              color="green"
              class="w-22 transition-all duration-200"
              size="h-1.5"
            />
          </div>
          <button
            class="text-sm text-red-600 font-semibold bg-transparent border-none cursor-pointer"
            onclick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              console.log("Redirect to order details");
            }}
          >
            View order details
          </button>
        </div>
      </div></Modal
    >
  </div>
{/if}

<style>
  /* Ensure progress bar animates smoothly */
  :global(.progress) {
    transition: width 0.2s ease-in-out;
  }

  /* Target only this modal's dialog container */
  :global(.order-update-modal) {
    bottom: 83px !important;
    height: auto !important;
    max-height: 80vh !important;
    display: flex !important;
    align-items: flex-end !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
  }

  /* Remove focus outline for this modal */
  :global(.order-update-modal:focus) {
    outline: none !important;
    box-shadow: none !important;
  }
  /* Hide Flowbite's default close button for this modal */
  :global([aria-label*="close" i]),
  :global([aria-label*="Close" i]) {
    display: none;
  }
</style>
