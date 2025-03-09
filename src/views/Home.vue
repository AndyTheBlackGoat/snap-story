<template lang="pug">
  main
    div.container
      article
        h1 Lo más reciente en SnapStory
      div.grid
        figure(v-for="post in posts" :key="post.post_id")
          img(:src="post.source ? 'http://localhost:4000/' + post.source : 'https://placecats.com/300/300'")
          figcaption
            //- i.las.la-heart
            //- span 10
            //- i.las.la-comments
            //- span 5
            h2 {{ post.title }}
            p {{ post.description }}
            p Autor: {{ post.username }}
</template>


<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Home',
  setup() {
    const token = ref('');
    const busqueda = ref('');
    const posts = ref([]);

    const buscar = () => {
      console.log('Buscando:', busqueda.value);
    };

    token.value = localStorage.getItem('token') || 'No hay token almacenado';

    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:4000/api/posts');
        const data = await res.json();
        posts.value = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    });

    return { token, busqueda, buscar, posts };
  },
};
</script>

<style lang="stylus" scoped>
  main
    background: #f9f9f9
    padding-top: 100px
    min-height: 100vh
    h1
      margin: 0

    div.container
      margin 0 auto
      padding 20px
    
    article
      margin-top: 30px

  div.grid
    display: flex
    margin: 20px 0
    flex-wrap wrap
    figure
      margin: 10px
      width calc(33.3333% - 20px)
      img
        display: block
        width: 100%
    
   // Agrega separación entre los iconos
  //  figcaption i.las
  //   margin-right 5px

   figcaption span
    margin-right 5px
  
</style>