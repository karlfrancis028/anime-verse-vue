<script setup lang="ts">
</script>

<template>
  <one-col-layout class="error">
    <div class="error__content">
      <img src="@/assets/error-img.png" />
      <h1>This page isn't available</h1>
      <p>The link you followed may be broken, or the page may have been removed.</p>
    </div>
  </one-col-layout>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .error {
    &__content {
      @extend %flex-col--center-xy;
      gap: space(xs);
      margin: auto 0;
      text-align: center;

      img {
        width: 200px;
      }

      h1 {
        color: var(--title-color);

        @media only screen and (max-width: 400px) {
          font-size: font(h3-font-size);
        }
      }
       
      p {
        color: var(--title-color);

        @media only screen and (max-width: 400px) {
          font-size: font(small-font-size);
        }
      }
    }
  }
</style>