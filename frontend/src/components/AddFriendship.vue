<template>
  <div class="component-container">
    <h2>Criar Amizade</h2>
    <input v-model="user1" placeholder="Nome do usuário 1" />
    <input v-model="user2" placeholder="Nome do usuário 2" />
    <button @click="addFriendship">Criar Amizade</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      user1: '',
      user2: '',
      message: '',
    };
  },
  methods: {
    async addFriendship() {
      try {
        const response = await axios.post('http://localhost:3000/friendships', {
          user1: this.user1,
          user2: this.user2,
        });
        eventBus.emit('update-graph');
        this.message = response.data.message;
        this.user1 = '';
        this.user2 = '';
      } catch (error) {
        console.error(error);
        this.message = 'Erro ao criar amizade';
      }
    },
  },
};
</script>