<template>
  <div class="container">
    <h1>Vue.js layout</h1>
    <div v-for="file in filteredFiles" :key="file.id">
      <FileItem :file="file">
        <!-- You can use slots here if needed -->
      </FileItem>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

pre,
code {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: pre-wrap;
  line-break: anywhere;
}
</style>
<script>
// @ is an alias to /src
import api from "@/api";
import FileItem from "@/components/FileItem.vue";

export default {
  name: "Layout",
  components: {
    FileItem,
  },
  data() {
    return {
      files: [],
    };
  },
  created() {
    api.files.get().then((res) => {
      this.files = res;
    });
  },
  computed: {
    filteredFiles() {
      return this.files
        .filter((file) => file.tags.includes("kitten"))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
};
</script>
