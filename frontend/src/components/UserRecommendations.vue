<template>
    <div>
      <h2>Obter Recomendações e Filmes Curtidos</h2>
      <input v-model="username" placeholder="Nome do usuário" />
      <button @click="getRecommendations">Obter Recomendações</button>
      <button @click="getLikedMovies">Obter Filmes Curtidos</button>
  
      <div v-if="recommendations.length">
        <h3>Recomendações para {{ username }}:</h3>
        <ul>
          <li v-for="(rec, index) in recommendations" :key="index">
            <strong>{{ rec.title }}</strong> (Recomendado por: {{ rec.recommendedBy.join(', ') }})
          </li>
        </ul>
      </div>
  
      <div v-if="likedMovies.length">
        <h3>Filmes Curtidos por {{ username }}:</h3>
        <ul>
          <li v-for="(movie, index) in likedMovies" :key="index">
            <strong>{{ movie.title }}</strong> ({{ movie.year }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        recommendations: [],
        likedMovies: [],
      };
    },
    methods: {
      async getRecommendations() {
        try {
          const response = await axios.get(
            `http://localhost:3000/recommendations/${this.username}`
          );
          this.recommendations = response.data;
          this.likedMovies = [];
        } catch (error) {
          console.error('Erro ao obter recomendações:', error);
        }
      },
      async getLikedMovies() {
        try {
          const response = await axios.get(
            `http://localhost:3000/liked/${this.username}`
          );
          this.likedMovies = response.data;
          this.recommendations = [];
        } catch (error) {
          console.error('Erro ao obter filmes curtidos:', error);
        }
      },
    },
  };
  </script>
  