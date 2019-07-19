<template>
  <k-field 
    v-bind="$props"
    class="color-picker"	
    @blur="onBlur"
  > 
    <div class="color-picker__input">
      <div 
        class="color-picker__input-preview"
        @click="toggle"
      >
        <div 
          class="color-picker__preview-color"
          :style="{backgroundColor: hexColor}"
        ></div>
      </div>
      <k-input 
        v-bind="$props"
        class="color-picker__text-input" 
        v-model="hexColor" 
        name="text" 
        type="text" 
        theme="field" 
        @focus="open"
      />
    </div>
    <div 
      class="color-picker__wrapper"
      v-show="active"
      tabindex="-1" 
      @blur="close"
    >
      <color-picker 
        v-model="color" 
        class="color-picker__picker"
        :class="{'color-picker__picker--no-alpha': !editableAlpha}"
      />
      <div 
        class="color-picker__presets"
        v-if="presets && presets.length > 0"
      >
        <div 
          v-for="(presetColor, index) in presets"
          :key="index"
          class="color-picker__preset"
          :class="{'color-picker__preset--active': (presetColor == hexColor)}"
          @click="selectColor(presetColor)"
          :style="{backgroundColor: presetColor}"
        >
        </div>
      </div>
    </div>
  </k-field >
</template>

<script>
import { Chrome } from "vue-color";
export default {
  components: {
    'color-picker': Chrome
  },
  props: {
    label: String,
    value: String,
    default: String,
    presets: Array,
    editableAlpha: Boolean,
    /* Global props */
    disabled: Boolean,
    help: String,
    required: Boolean,
    name: [String, Number],
    type: String
  },
  created() {
    this.color = this.value || this.default
  },
  data () {
    return {
      color: "",
      active: false
    }
  },
  methods: {
    selectColor(color) {
      this.color = color
    },
    open() {
      this.active = true
    },
    close() {
      this.active = false
    },
    toggle() {
      this.active = !this.active
    },
    onBlur(e) {
      if(e.relatedTarget === null) this.close()
    }
  },
  computed: {
    hexColor: {
      get() {
        if (typeof this.color === "object") {
          if (!this.editableAlpha && this.color.a < 1) {
            this.color.a = 1
          }
          return (this.color.a == 1) ? this.color.hex : this.color.hex8
        } else {
          return this.color
        }
      },
      set(colorValue) {
        this.color = colorValue
      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      if(newVal !== this.color) {
        this.color = this.value
      }
    },
    color(color, oldColor){
      if (oldColor) {
        this.$emit('input', this.hexColor)
      }
    }
  }
}
</script>

<style lang="stylus">
.color-picker
  position relative
  &__input-preview
    width 36px
    height 36px
    transform translate(1px, 1px)
    position absolute 
    cursor pointer
    border-right 1px solid #ccc
    background-image url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4yKSIgZD0iTTAgMGgxMHYxMEgwem0xMCAxMGgxMHYxMEgxMHoiLz48L3BhdHRlcm4+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==")
  &__preview-color
    width 100%
    height 100%
  &__text-input
    padding-left 37px
  & &__picker
    width 300px
    box-shadow none
  &__wrapper
    background-color white
    box-shadow 0 2px 10px rgba(22,23,26,.2)
    display inline-block
    position absolute
    z-index 10
    &:focus
      outline none
      border-color inherit
      box-shadow: none
    // left 38px
  &__presets
    display flex
    padding-left 8px
  &__preset
    width 24px
    height 24px
    margin-bottom 8px
    margin-right 4px
    cursor pointer
    transition transform .1s
    transform scale(1)
    box-shadow inset 0 0 0 1px rgba(0,0,0,.2)
    &--active
      transform scale(.8)
</style>  

<style lang="stylus">
.color-picker__picker
  .vc-chrome-color-wrap
    display none
  .vc-saturation-pointer
    transform translate(-50%, -50%)
  &--no-alpha
    .vc-chrome-alpha-wrap
    .vc-chrome-field:nth-child(3)
      display none
</style>
