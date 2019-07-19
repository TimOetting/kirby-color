import ColorPicker from "./components/ColorPicker.vue";
import ColorPreview from "./components/ColorPreview.vue";

panel.plugin("demo/color", {
  fields: {
    color: ColorPicker
  },
  components: {
    "k-color-field-preview": ColorPreview
  }
});
