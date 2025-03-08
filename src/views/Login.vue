<template lang="pug">
  main
    section.full.flex
      div.column.image
        img(src="@/assets/img/login-snake.jpeg")
      div.column.flex.text
        div.content
          h1.text-center Crea historias
          // Usamos submitLogin directamente en el evento submit
          Form(@submit="submitLogin")
            div
              label(for="email") Email
              Field(name="email" id="email" v-model="email" type="text" placeholder="Email" rules="required|email")
              ErrorMessage(name="email" class="text-red-500")
            div
              label(for="password") Contraseña
              Field(name="password" id="password" v-model="password" type="password" placeholder="Contraseña" rules="required")
              ErrorMessage(name="password" class="text-red-500")
            button(type="submit") Iniciar
          p.text-center
            a(href="#") Crea una cuenta
          div(v-if="message" :class="{'text-green-500': success, 'text-red-500': !success}")
            p {{ message }}
          div(v-if="serverResponse")
            p.text-blue-500 {{ serverResponse }}
        ul.social
          li: a(href="#"): i.lab.la-facebook
          li: a(href="#"): i.lab.la-instagram
</template>

<script>
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { ref } from 'vue';
import api from '@/api.js';

// Definir reglas de validación
defineRule('required', required);
defineRule('email', email);

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const message = ref('');
    const success = ref(false);
    const serverResponse = ref('');

    // Función de login (lógica de autenticación)
    const login = async () => {
      console.log("🛠 Evento de login ejecutado!");
      message.value = "";
      serverResponse.value = "";

      if (!email.value || !password.value) {
        console.log("⚠️ Campos vacíos detectados");
        message.value = "⚠️ Por favor, complete todos los campos.";
        success.value = false;
        return;
      }

      console.log("📨 Enviando solicitud a la API con:", { email: email.value, password: password.value });

      try {
        // Usamos 'login' sin el prefijo '/api', ya que el baseURL de Axios es 'http://localhost:4000/api'
        const response = await api.post('login', { email: email.value, password: password.value });
        console.log("✅ Respuesta del servidor recibida:", response.data);

        if (response.data.message === "ok") {
          message.value = `✔️ Bienvenido, ${response.data.user.full_name}`;
          success.value = true;
        } else {
          message.value = "❌ Usuario o contraseña incorrectos.";
          success.value = false;
        }
        serverResponse.value = response.data.message;
      } catch (error) {
        console.error("❌ Error en la solicitud:", error);
        message.value = "❌ Error al conectar con el servidor.";
        success.value = false;
        serverResponse.value = error.response?.data?.message || "Error desconocido.";
      }
    };

    // Función que se llama al enviar el formulario
    const submitLogin = async (values, { resetForm }) => {
      await login(); // Ejecuta la función de login
      resetForm();   // Resetea el formulario después de enviar
    };

    return {
      email,
      password,
      message,
      success,
      serverResponse,
      submitLogin,
    };
  },
};
</script>

<style lang="stylus" scoped>
.image
  width 60%
  img
    width 100%
    display block
    height 100%
    object-fit cover

div.text
  align-self: center
  flex-basis: 40%
  align-items: center
  justify-content: center
  div.content
    width: 320px

ul.social
  position: absolute
  bottom: 20px
  margin: 0
  padding: 0
  li
    display: inline-block
    margin: 0 10px
    i
      font-size: 2em
      color: #ffb6c1
      &:hover
        color: #ff69b4
</style>
