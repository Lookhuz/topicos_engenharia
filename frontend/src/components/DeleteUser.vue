<template>
  <div class="component-container">
    <h2>Excluir Usuário</h2>
    <input v-model="username" placeholder="Nome do usuário" />
    <button @click="deleteUser">Excluir Usuário</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      message: '',
    };
  },
  methods: {
    async deleteUser() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/users/${this.username}`
        );
        this.message = response.data.message;
        this.username = '';
      } catch (error) {
        console.error(error);
        this.message = 'Erro ao excluir usuário';
      }
    },
  },
};
</script>