<template lang="pug">
  main
  section.full.flex
    div.column.image
      img(src="@/assets/img/login-snake.jpeg")
    div.column.flex.text
      div.content
        h1.text-center Crea historias
        Form(@submit.prevent="login")
          div
            label Email
            Field(name="email" type="text" placeholder="Email" v-model="user.email" rules="required|email")
            ErrorMessage(name="email" class="text-red-500")
          div
            label Contraseña
            Field(name="password" type="password" placeholder="Contraseña" v-model="user.password" rules="required")
            ErrorMessage(name="password" class="text-red-500")
          button(type="submit") Iniciar
        p.text-center 
          a(href="#") Crea una cuenta

      ul.social
        li: a(href="#"): i.lab.la-facebook
        li: a(href="#"): i.lab.la-instagram
</template>

<script>
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { email, required } from '@vee-validate/rules';

// Definir reglas de validación
defineRule('required', required);
defineRule('email', email);

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage
  },
  methods: {
    login() {
      if (!this.user.email || !this.user.password) {
        alert('Por favor, complete todos los campos correctamente');
        return;
      }
      alert(`Email: ${this.user.email}\nContraseña: ${this.user.password}`);
    }
  }
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
      a
        color: #ffb6c1
        font-size: 1.5em
        &:hover
          color: #ff69b4
</style>