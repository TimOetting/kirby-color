import ColorPicker from "./components/ColorPicker.vue";

panel.plugin("demo/color", {
  fields: {
    color: ColorPicker,
    textext: {
      props: {
        label: String,
        value: Object,
        required: Boolean,
      },
      data: function () {
        return {
          fields: {
            street: {
              label: "Street",
              type: "text",
              default: "Default normal text",
              value: ""
            },
            zip: {
              label: "Zip",
              type: "textarea",
              width: "1/4",
              default: "Default textarea",
              value: ""
            },
            location: {
              label: "City",
              type: "text",
              width: "3/4"
            }
          }
        }
      },
      methods: {
        input: function (data) {
          this.$emit("input", data);
        }
      },
      template: `
        <k-fieldset :fields="fields" v-model="value" @input="input" />
      `
    }
  }
});
