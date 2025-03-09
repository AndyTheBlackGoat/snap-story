<template lang="pug">
  main
    h1 Perfil
    p ¡Hola, {{ username }}!
    button(@click="logout") Cerrar sesión
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Invitado';
  },
  methods: {
    logout() {
      // Elimina el token y el username del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // Redirige al login
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style scoped>
</style>
