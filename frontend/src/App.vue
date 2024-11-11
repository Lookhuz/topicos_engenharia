<template>
  <div id="app" class="dark-theme">
    <h1>Aplicação de Recomendações de Filmes</h1>

    <!-- Gráfico de Visualização -->
    <GraphVisualization />

    <!-- Seções de Visualização de Dados -->
    <ShowUsers />
    <ShowMovies />
    <ShowFriendships />

    <!-- Seções de Ações do Usuário -->
    <AddUser />
    <AddMovie />
    <AddFriendship />
    <UserMovieRelation />

    <!-- Seção de Recomendações -->
    <UserRecommendations />

    <!-- Seções de Exclusão -->
    <DeleteUser />
    <DeleteMovie />
  </div>
</template>

<script>
import AddUser from './components/AddUser.vue';
import AddMovie from './components/AddMovie.vue';
import AddFriendship from './components/AddFriendship.vue';
import UserMovieRelation from './components/UserMovieRelation.vue';
import UserRecommendations from './components/UserRecommendations.vue';
import DeleteUser from './components/DeleteUser.vue';
import DeleteMovie from './components/DeleteMovie.vue';
import ShowUsers from './components/ShowUsers.vue';
import ShowMovies from './components/ShowMovies.vue';
import ShowFriendships from './components/ShowFriendships.vue';
import GraphVisualization from './components/GraphVisualization.vue';

export default {
  name: 'App',
  components: {
    AddUser,
    AddMovie,
    AddFriendship,
    UserMovieRelation,
    UserRecommendations,
    DeleteUser,
    DeleteMovie,
    ShowUsers,
    ShowMovies,
    ShowFriendships,
    GraphVisualization,
  },
};
</script>

<style>
/* Tema Escuro */
.dark-theme {
  background-color: #121212;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

/* Estilos Globais */
body {
  margin: 0;
  padding: 0;
  background-color: #121212;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
}

/* Atualize os estilos dos elementos */
input,
select {
  padding: 8px;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #333333;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  margin: 8px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #444444;
}

h1, h2, h3 {
  color: #ffffff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  font-size: 18px;
}

p {
  color: #bbbbbb;
}

/* Organizar melhor os componentes */
.component-container {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
}

/* Adicionar estilos para o gráfico */
#graph {
  width: 100%;
  height: 500px;
  background-color: #1e1e1e;
  border: 1px solid #333333;
}
</style>