<template>
  <div id="app">
    <h1>Aplicação de Recomendações de Filmes</h1>

    <AddUser />
    <AddMovie />
    <AddFriendship />
    <UserMovieRelation />
    <UserRecommendations />
    <DeleteUser />
    <DeleteMovie />
    <ShowUsers />
    <ShowMovies />
    <ShowFriendships />
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

input, select {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  margin: 8px;
}

h2 {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  font-size: 18px;
}
</style>
