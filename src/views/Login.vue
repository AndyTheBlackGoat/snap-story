<template lang="pug">
  main
  section.full.flex
    div.column.image
      img(src="@/assets/img/login-snake.jpeg")
    div.column.flex.text
      div.content
        h1.text-center Crea historias
        //- form(@submit.prevent="login")
        form
          ValidationProvider(v-slot="v")
            
            input(type="text" placeholder="Email" v-model="email")
          ValidationProvider(v-slot="v")
            input(type="password" placeholder="Contraseña" v-model="Contraseña")
          button(type="submit") Iniciar
        p.text-center 
          a(href="#") Crea una cuenta

      ul.social
        li: a(href="#"): i.lab.la-facebook
        li: a(href="#"): i.lab.la-instagram

</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    ValidationProvider
  },
  methods: {
    login() {
      alert(this.email)
    }
  }

}
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