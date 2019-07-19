<template>
	<div class="k-color-field-preview">
	    <div class="color-preview" :style="'background-color:'+ value"></div>
	</div>
</template>

<script>
export default {
    props: {
        value: String,
    },
};
</script>

<style>
.k-color-field-preview {
	padding: 0 .75rem;
}
.k-color-field-preview .color-preview {
	width: 24px;
	height: 24px;
}
</style>