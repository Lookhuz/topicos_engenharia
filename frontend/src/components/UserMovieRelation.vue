<template>
    <div>
      <h2>Relacionar Usuário e Filme</h2>
      <input v-model="username" placeholder="Nome do usuário" />
      <input v-model="movieTitle" placeholder="Título do filme" />
      <select v-model="relationType">
        <option value="WATCHED">Assistido</option>
        <option value="LIKED">Curtido</option>
      </select>
      <button @click="addRelation">Adicionar Relação</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        movieTitle: '',
        relationType: 'WATCHED',
        message: '',
      };
    },
    methods: {
      async addRelation() {
        try {
          const endpoint =
            this.relationType === 'WATCHED' ? 'watched' : 'liked';
          const response = await axios.post(
            `http://localhost:3000/${endpoint}`,
            {
              username: this.username,
              movieTitle: this.movieTitle,
            }
          );
          this.message = response.data.message;
          this.username = '';
          this.movieTitle = '';
        } catch (error) {
          console.error(error);
          this.message = 'Erro ao adicionar relação';
        }
      },
    },
  };
  </script>
  