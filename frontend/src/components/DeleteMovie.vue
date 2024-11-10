<template>
    <div>
      <h2>Excluir Filme</h2>
      <input v-model="title" placeholder="Título do filme" />
      <button @click="deleteMovie">Excluir Filme</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        message: '',
      };
    },
    methods: {
      async deleteMovie() {
        try {
          const response = await axios.delete(
            `http://localhost:3000/movies/${this.title}`
          );
          this.message = response.data.message;
          this.title = '';
        } catch (error) {
          console.error(error);
          this.message = 'Erro ao excluir filme';
        }
      },
    },
  };
  </script>
  