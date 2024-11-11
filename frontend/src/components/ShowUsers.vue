<template>
  <div class="component-container">
    <h2>Todos os Usuários</h2>
    <button @click="getUsers">Mostrar Usuários</button>
    <ul v-if="users.length">
      <li v-for="(user, index) in users" :key="index">{{ user.name }} (Idade: {{ user.age }})</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    },
  },
};
</script>
