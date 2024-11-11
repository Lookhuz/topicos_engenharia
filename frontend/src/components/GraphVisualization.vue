<template> 
  <div class="component-container">
    <h2>Visualização de Grafo</h2>
    <div id="graph"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import 'vis-network/styles/vis-network.css';
import eventBus from '@/eventBus';

export default {
  name: 'GraphVisualization',
  data() {
    return {
      network: null,
      nodes: new DataSet([]),
      edges: new DataSet([]),
    };
  },
  methods: {
    async fetchGraphData() {
      try {
        const response = await axios.get('http://localhost:3000/graph-data');
        const data = response.data;
        
        // Atualizar os nodes e edges existentes
        this.nodes.clear();
        this.nodes.add(data.nodes);
        
        this.edges.clear();
        this.edges.add(data.edges);
        
      } catch (error) {
        console.error('Erro ao obter dados do grafo:', error);
      }
    },
    drawGraph() {
      const container = this.$el.querySelector('#graph');
      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
          font: {
            size: 14,
            color: '#ffffff',
          },
        },
        edges: {
          color: '#aaaaaa',
          font: {
            color: '#ffffff',
            align: 'middle',
          },
          arrows: {
            to: { enabled: true, scaleFactor: 0.5 },
          },
        },
        physics: {
          stabilization: false,
        },
        interaction: {
          hover: true,
        },
        layout: {
          improvedLayout: true,
        },
      };
      
      this.network = new Network(container, { nodes: this.nodes, edges: this.edges }, options);
    },
  },
  mounted() {
    this.drawGraph();
    this.fetchGraphData();

    // Ouve o evento de atualização e chama fetchGraphData quando ele ocorre
    eventBus.on('update-graph', this.fetchGraphData);
  },
  beforeUnmount() {
    // Remove o listener ao desmontar o componente
    eventBus.off('update-graph', this.fetchGraphData);
  },
};
</script>

<style scoped>
#graph {
  width: 100%;
  height: 500px;
}
</style>
