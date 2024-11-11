// index.js
const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do driver do Neo4j
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'fernando0100')
);
const session = driver.session();

// Incluir usuário
app.post('/users', async (req, res) => {
  const { name, age } = req.body;

  try {
    await session.run('CREATE (u:User {name: $name, age: $age}) RETURN u', {
      name,
      age: neo4j.int(age),
    });
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário');
  }
});

// Incluir filme
app.post('/movies', async (req, res) => {
  const { title, year } = req.body;

  try {
    await session.run('CREATE (m:Movie {title: $title, year: $year}) RETURN m', {
      title,
      year: neo4j.int(year),
    });
    res.status(201).json({ message: 'Filme criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar filme');
  }
});

// Criar amizade bidirecional entre dois usuários
app.post('/friendships', async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    await session.run(
      `
      MATCH (u1:User {name: $user1}), (u2:User {name: $user2})
      MERGE (u1)-[:FRIENDS_WITH]->(u2)
      MERGE (u2)-[:FRIENDS_WITH]->(u1)
      `,
      { user1, user2 }
    );
    res.status(201).json({ message: 'Amizade criada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar amizade');
  }
});

// Criar relação de "assistido" entre usuário e filme
app.post('/watched', async (req, res) => {
  const { username, movieTitle } = req.body;

  try {
    await session.run(
      `
      MATCH (u:User {name: $username}), (m:Movie {title: $movieTitle})
      CREATE (u)-[:WATCHED]->(m)
      `,
      { username, movieTitle }
    );
    res.status(201).json({ message: 'Filme marcado como assistido' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao marcar filme como assistido');
  }
});

// Criar relação de "curtido" entre usuário e filme
app.post('/liked', async (req, res) => {
  const { username, movieTitle } = req.body;

  try {
    await session.run(
      `
      MATCH (u:User {name: $username}), (m:Movie {title: $movieTitle})
      CREATE (u)-[:LIKED]->(m)
      `,
      { username, movieTitle }
    );
    res.status(201).json({ message: 'Filme marcado como curtido' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao marcar filme como curtido');
  }
});

// Obter recomendações de filmes para um usuário
app.get('/recommendations/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const result = await session.run(
      `
      MATCH (user:User {name: $username})-[:FRIENDS_WITH]->(friend:User)-[:WATCHED]->(movie:Movie)
      WHERE NOT (user)-[:WATCHED]->(movie)
      RETURN movie.title AS title, collect(friend.name) AS recommendedBy
      `,
      { username }
    );

    const recommendations = result.records.map((record) => ({
      title: record.get('title'),
      recommendedBy: record.get('recommendedBy'),
    }));

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar recomendações');
  }
});

// Obter filmes curtidos por um usuário
app.get('/liked/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const result = await session.run(
      `
      MATCH (u:User {name: $username})-[:LIKED]->(m:Movie)
      RETURN m.title AS title, m.year AS year
      `,
      { username }
    );

    const likedMovies = result.records.map((record) => ({
      title: record.get('title'),
      year: record.get('year').low,
    }));

    res.json(likedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter filmes curtidos');
  }
});

// Excluir um usuário e seus relacionamentos
app.delete('/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
    await session.run(
      `
      MATCH (u:User {name: $username})
      DETACH DELETE u
      `,
      { username }
    );

    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir usuário');
  }
});

// Excluir um filme e seus relacionamentos
app.delete('/movies/:title', async (req, res) => {
  const title = req.params.title;

  try {
    await session.run(
      `
      MATCH (m:Movie {title: $title})
      DETACH DELETE m
      `,
      { title }
    );

    res.json({ message: 'Filme excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir filme');
  }
});

// Excluir relação de amizade
app.delete('/friendships', async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    await session.run(
      `
      MATCH (u1:User {name: $user1})-[f:FRIENDS_WITH]->(u2:User {name: $user2})
      DELETE f
      `,
      { user1, user2 }
    );

    res.json({ message: 'Amizade excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir amizade');
  }
});

// Excluir relação de filme assistido
app.delete('/watched', async (req, res) => {
  const { username, movieTitle } = req.body;

  try {
    await session.run(
      `
      MATCH (u:User {name: $username})-[w:WATCHED]->(m:Movie {title: $movieTitle})
      DELETE w
      `,
      { username, movieTitle }
    );

    res.json({ message: 'Relação de filme assistido removida' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao remover relação de filme assistido');
  }
});

// Excluir relação de filme curtido
app.delete('/liked', async (req, res) => {
  const { username, movieTitle } = req.body;

  try {
    await session.run(
      `
      MATCH (u:User {name: $username})-[l:LIKED]->(m:Movie {title: $movieTitle})
      DELETE l
      `,
      { username, movieTitle }
    );

    res.json({ message: 'Relação de filme curtido removida' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao remover relação de filme curtido');
  }
});

// Marcar relação entre usuário e filme (Assistido, Curtido ou Ambos)
app.post('/user-movie-relation', async (req, res) => {
  const { username, movieTitle, relationType } = req.body;

  try {
    const queries = {
      WATCHED: `MATCH (u:User {name: $username}), (m:Movie {title: $movieTitle}) 
                MERGE (u)-[:WATCHED]->(m)`,
      LIKED: `MATCH (u:User {name: $username}), (m:Movie {title: $movieTitle}) 
              MERGE (u)-[:LIKED]->(m)`,
      BOTH: `MATCH (u:User {name: $username}), (m:Movie {title: $movieTitle}) 
             MERGE (u)-[:WATCHED]->(m)
             MERGE (u)-[:LIKED]->(m)`,
    };

    await session.run(queries[relationType], { username, movieTitle });
    res.status(201).json({ message: `Relação ${relationType} criada com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar relação entre usuário e filme');
  }
});

// Obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const result = await session.run(`MATCH (u:User) RETURN u.name AS name, u.age AS age`);
    const users = result.records.map((record) => ({
      name: record.get('name'),
      age: record.get('age').low,
    }));

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter usuários');
  }
});

// Obter todos os filmes
app.get('/movies', async (req, res) => {
  try {
    const result = await session.run(`MATCH (m:Movie) RETURN m.title AS title, m.year AS year`);
    const movies = result.records.map((record) => ({
      title: record.get('title'),
      year: record.get('year').low,
    }));

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter filmes');
  }
});

// Obter todas as amizades
app.get('/friendships', async (req, res) => {
  try {
    const result = await session.run(`
      MATCH (u1:User)-[:FRIENDS_WITH]->(u2:User)
      RETURN u1.name AS user1, u2.name AS user2
    `);

    const friendships = result.records.map((record) => ({
      user1: record.get('user1'),
      user2: record.get('user2'),
    }));

    res.json(friendships);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter amizades');
  }
});

// Endpoint para obter dados do grafo
app.get('/graph-data', async (req, res) => {
  try {
    const result = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[r]->(m)
      RETURN n, r, m
    `);

    const nodesSet = new Set();
    const edgesSet = new Set();

    result.records.forEach((record) => {
      // Processar o nó n
      const node1 = record.get('n');
      nodesSet.add(JSON.stringify({
        id: node1.identity.low,
        label: node1.properties.name || node1.properties.title,
        group: node1.labels[0],
      }));

      // Se existir relacionamento, processar r e m
      const relationship = record.get('r');
      if (relationship) {
        const node2 = record.get('m');
        nodesSet.add(JSON.stringify({
          id: node2.identity.low,
          label: node2.properties.name || node2.properties.title,
          group: node2.labels[0],
        }));

        edgesSet.add(JSON.stringify({
          from: node1.identity.low,
          to: node2.identity.low,
          label: relationship.type,
        }));
      }
    });

    // Converter sets para arrays
    const nodes = Array.from(nodesSet).map((node) => JSON.parse(node));
    const edges = Array.from(edgesSet).map((edge) => JSON.parse(edge));

    res.json({ nodes, edges });
  } catch (error) {
    console.error('Erro ao obter dados do grafo:', error);
    res.status(500).send('Erro ao obter dados do grafo');
  }
});


// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
