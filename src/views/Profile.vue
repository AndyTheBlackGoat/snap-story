<template lang="pug">
  main.profile
    header.profile-header
      div.cover-photo
        // Imagen de portada (opcional)
      div.avatar-container
        //- img.avatar(src="https://via.placeholder.com/150", alt="Avatar")
        h1 {{ username }}
        p.bio Esta es tu biografía. Cuéntanos algo sobre ti.
    section.profile-stats
      div.stat
        span.count {{ posts.length }}
        span.label Publicaciones
      div.stat
        span.count 345
        span.label Seguidores
      div.stat
        span.count 89
        span.label Siguiendo
    section.profile-posts
      h2 Últimas publicaciones
      div.posts-grid
        div.post(v-for="post in posts" :key="post.post_id")
          img(:src="post.source ? 'http://localhost:4000/' + post.source : 'https://placecats.com/300/300'", alt="Post")
          figcaption
            // Edición del título
            div.title-container
              template(v-if="!post.editingTitle")
                h2 {{ post.title }}
                button.edit-btn(@click="enableEditTitle(post)")
                  i.las.la-edit
              template(v-else)
                input(type="text", v-model="post.newTitle")
                button.save-btn(@click="updateTitle(post)") Guardar
                button.cancel-btn(@click="cancelEditTitle(post)") Cancelar
            // Edición de la descripción
            div.description-container
              template(v-if="!post.editingDescription")
                p {{ post.description }}
                button.edit-desc-btn(@click="enableEditDescription(post)")
                  i.las.la-edit
              template(v-else)
                textarea(v-model="post.newDescription")
                button.save-desc-btn(@click="updateDescription(post)") Guardar
                button.cancel-desc-btn(@click="cancelEditDescription(post)") Cancelar
            p Autor: {{ post.username }}
            button.delete-post(@click="deletePost(post.post_id)") 
              i.las.la-trash-alt
    //- button.logout(@click="logout") Cerrar sesión
</template>




<script>
export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      posts: [] // Aquí se cargarán solo las publicaciones del usuario logueado
    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Invitado';
    this.fetchMyPosts();
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push({ name: 'Login' });
    },
    async fetchMyPosts() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:4000/api/myposts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Agrega propiedades para la edición de título y descripción
          this.posts = data.map(post => ({
            ...post,
            editingTitle: false,
            newTitle: post.title,
            editingDescription: false,
            newDescription: post.description
          }));
        } else {
          console.error('Error al obtener publicaciones:', res.statusText);
        }
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    },
    // Métodos para editar el título
    enableEditTitle(post) {
      post.editingTitle = true;
      post.newTitle = post.title;
    },
    cancelEditTitle(post) {
      post.editingTitle = false;
    },
    async updateTitle(post) {
      if (!post.newTitle) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/api/posts/${post.post_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ title: post.newTitle })
        });
        if (res.ok) {
          post.title = post.newTitle;
          post.editingTitle = false;
          console.log('Título actualizado correctamente');
        } else {
          console.error('Error al actualizar el título:', res.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar el título:', error);
      }
    },
    // Métodos para editar la descripción
    enableEditDescription(post) {
      post.editingDescription = true;
      post.newDescription = post.description;
    },
    cancelEditDescription(post) {
      post.editingDescription = false;
    },
    async updateDescription(post) {
      if (!post.newDescription) return;
      try {
        const token = localStorage.getItem('token');
        // Se asume un endpoint específico para actualizar la descripción, o bien se puede reutilizar el mismo endpoint si aceptas múltiples campos.
        const res = await fetch(`http://localhost:4000/api/posts/${post.post_id}/description`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ description: post.newDescription })
        });
        if (res.ok) {
          post.description = post.newDescription;
          post.editingDescription = false;
          console.log('Descripción actualizada correctamente');
        } else {
          console.error('Error al actualizar la descripción:', res.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar la descripción:', error);
      }
    },
    async deletePost(postId) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          console.log('Post eliminado correctamente');
          this.posts = this.posts.filter(post => post.post_id !== postId);
        } else {
          console.error('Error al eliminar el post:', res.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar el post:', error);
      }
    }
  }
}
</script>





<style scoped>
.profile {
  margin-top: 150px;
  padding: 20px;
}
.profile-header {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}
.cover-photo {
  height: 150px;
  background: #ccc;
}
.avatar-container {
  position: relative;
  margin-top: -75px;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
}
.bio {
  font-style: italic;
  color: #666;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
.stat {
  text-align: center;
}
.stat .count {
  font-size: 1.2em;
  font-weight: bold;
}
.posts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.post {
  width: calc(33.333% - 10px);
  position: relative;
  border: 1px solid #ddd;
  padding: 5px;
  background: #fff;
}
.post img {
  width: 100%;
  display: block;
}
figcaption {
  margin-top: 5px;
}
.title-container, .description-container {
  display: flex;
  align-items: center;
  gap: 5px;
}
.edit-btn, .save-btn, .cancel-btn,
.edit-desc-btn, .save-desc-btn, .cancel-desc-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
  color: #007BFF;
}
.delete-post {
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.2em;
  position: absolute;
  top: 5px;
  right: 5px;
}
.logout {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>





