<script>
  import Card from "./components/Card.svelte";
  import Drawer from "./components/Drawer.svelte";
  import Skeleton from "./components/Skeleton.svelte";
  import Carousel from "./components/Carousel.svelte";
  import OrderTrackingBottomSheet from "./components/OrderTrackingBottomSheet.svelte";
  import NestedCarousel from "./components/NestedCarousel.svelte";
  import "./app.css";
</script>

<main class="relative min-h-screen p-4">
  <Carousel />
  <br />
  <NestedCarousel />
  <Card />
  <Drawer />
  <Skeleton />
  <OrderTrackingBottomSheet />
</main>
