<template>
    <label class="custom-toggle">
        <input type="checkbox"
               v-model="model"
               @change="$emit('input', model)">
        <span class="custom-toggle-slider rounded-circle"></span>
    </label>
</template>
<script>
export default {
  name: "base-switch",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: "Switch value"
    }
  },
  data () {
    return {
      model: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (isChecked) {
        this.model = isChecked
      }
    }
  }
};
</script>
<style>
</style>
