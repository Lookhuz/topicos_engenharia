<template>
  <div>
    <h2>Todos os Filmes</h2>
    <button @click="getMovies">Mostrar Filmes</button>
    <ul v-if="movies.length">
      <li v-for="(movie, index) in movies" :key="index">{{ movie.title }} (Ano: {{ movie.year }})</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async getMovies() {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        this.movies = response.data;
      } catch (error) {
        console.error('Erro ao obter filmes:', error);
      }
    },
  },
};
</script>
