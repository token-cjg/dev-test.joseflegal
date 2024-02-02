<template>
  <div class="file-item">
    <img
      :src="file.src"
      :alt="file.description"
      :title="file.filename"
      class="file-image"
    />
    <p class="file-description">{{ file.description }}</p>
  </div>
</template>

<script>
export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.file-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.file-description {
  margin-top: 10px;
}
</style>
