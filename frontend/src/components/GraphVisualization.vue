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

export default {
  name: 'GraphVisualization',
  data() {
    return {
      network: null,
      nodes: [],
      edges: [],
    };
  },
  methods: {
    async fetchGraphData() {
      try {
        const response = await axios.get('http://localhost:3000/graph-data');
        const data = response.data;
        this.nodes = data.nodes;
        this.edges = data.edges;
        this.drawGraph();
      } catch (error) {
        console.error('Erro ao obter dados do grafo:', error);
      }
    },
    drawGraph() {
      const container = this.$el.querySelector('#graph');
      const data = {
        nodes: new DataSet(this.nodes),
        edges: new DataSet(this.edges),
      };
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
      if (this.network) {
        this.network.setData(data);
      } else {
        this.network = new Network(container, data, options);
      }
    },
    startAutoRefresh() {
      this.fetchGraphData();
      this.refreshInterval = setInterval(this.fetchGraphData, 1000);
    },
    stopAutoRefresh() {
      clearInterval(this.refreshInterval);
    },
  },
  mounted() {
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
};
</script>

<style scoped>
#graph {
  width: 100%;
  height: 500px;
}
</style>
