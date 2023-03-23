<script setup lang='ts'>
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const options = Array.from({ length: 100 }).map((_, idx) => ({
  label: `${initials[idx % 10]}${idx}`,
}))

const widths = Array.from({ length: 100 }).map(
  () => 25 + Math.floor(Math.random() * 5) + 1,
) // greater than 26 less or equal to 30

const render = (...a) => {
  console.error(a)
}

const scroll = (...a) => {
  console.error(a)
}
</script>

<template>
  <o-virtual-list :data="options" :estimated-option-height="25" :item-size="(idx: number) => widths[idx]" @item-rendered="render" @scroll="scroll">
    <template #default="{ index, style, data }">
      <div :style="style">
        {{ data[index].label }}
      </div>
    </template>
  </o-virtual-list>
</template>
