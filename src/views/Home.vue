<template lang="pug">
  div
    h1 Home
    p Token: {{ token }}
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'Home',
  setup() {
    const token = ref('');
    onMounted(() => {
      token.value = localStorage.getItem("token") || "No hay token almacenado";
    });
    return { token };
  },
};
</script>

<style scoped>
/* Estilos para Home */
</style>
