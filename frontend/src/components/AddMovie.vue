<template>
    <div>
      <h2>Adicionar Filme</h2>
      <input v-model="title" placeholder="Título do filme" />
      <input v-model.number="year" placeholder="Ano" type="number" />
      <button @click="addMovie">Adicionar Filme</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        year: null,
        message: '',
      };
    },
    methods: {
      async addMovie() {
        try {
          const response = await axios.post('http://localhost:3000/movies', {
            title: this.title,
            year: this.year,
          });
          this.message = response.data.message;
          this.title = '';
          this.year = null;
        } catch (error) {
          console.error(error);
          this.message = 'Erro ao adicionar filme';
        }
      },
    },
  };
  </script>
  