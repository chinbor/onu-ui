<script setup lang='ts'>
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>

<template>
  <o-virtual-list :data="options">
    <template #default="{ index, style }">
      <div :style="style">
        {{ index }}
      </div>
    </template>
  </o-virtual-list>
</template>
