<template>
  <div class="component-container">
    <h2>Adicionar Usuário</h2>
    <input v-model="name" placeholder="Nome do usuário" />
    <input v-model.number="age" placeholder="Idade" type="number" />
    <button @click="addUser">Adicionar Usuário</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      name: '',
      age: null,
      message: '',
    };
  },
  methods: {
    async addUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', {
          name: this.name,
          age: this.age,
        });
        eventBus.emit('update-graph');
        this.message = response.data.message;
        this.name = '';
        this.age = null;
      } catch (error) {
        console.error(error);
        this.message = 'Erro ao adicionar usuário';
      }
    },
  },
};
</script>