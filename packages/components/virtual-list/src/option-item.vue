<script lang="ts" setup>
import { OptionProps } from '../defaults'

defineProps(OptionProps)
</script>

<template>
  <li :style="style">
    <slot :item="item" :index="index" :disabled="disabled">
      <span>{{ item!.label }}</span>
    </slot>
  </li>
</template>
