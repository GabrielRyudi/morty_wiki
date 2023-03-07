<template>
  <p
    class="text-green-9 text-body1 text-weight-medium"
    style="margin-bottom: 0"
  >
    {{ label }}
  </p>
  <p class="text-blue-grey-10 text-subtitle1">{{ text }}</p>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  label: String,
  text: String ?? 'Unknow',
});
</script>
