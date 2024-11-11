<template>
  <div class="component-container">
    <h2>Todas as Amizades</h2>
    <button @click="getFriendships">Mostrar Amizades</button>
    <ul v-if="friendships.length">
      <li v-for="(friendship, index) in friendships" :key="index">
        {{ friendship.user1 }} é amigo de {{ friendship.user2 }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      friendships: [],
    };
  },
  methods: {
    async getFriendships() {
      try {
        const response = await axios.get('http://localhost:3000/friendships');
        this.friendships = response.data;
      } catch (error) {
        console.error('Erro ao obter amizades:', error);
      }
    },
  },
};
</script>
