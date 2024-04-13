<script setup lang="ts">

</script>

<template>
  <div class="one-col-layout container">
    <slot name="toolbar"></slot>
    <div class="one-col-layout__content">
      <slot></slot>
    </div>
  </div>
</template>