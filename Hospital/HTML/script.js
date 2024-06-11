document.getElementById('listar').addEventListener('click', listar);
document.getElementById('buscar').addEventListener('click', buscarPorId);
document.getElementById('gravar').addEventListener('click', gravar);
document.getElementById('alterar').addEventListener('click', alterar);
document.getElementById('excluir').addEventListener('click', excluir);

async function listar() { // Função para listar todos os médicos
  try {
    const response = await fetch('http://localhost:8080/hospital');
    const dados = await response.json();
    console.log(dados);

    const lista = document.getElementById('lista');
    lista.innerHTML = dados.length === 0
      ? '<p>A lista está vazia. Por favor, adicione um médico.</p>'
      : dados.map(medico => `
          <p>ID: ${medico.id}</p>
          <p>Nome: ${medico.nome}</p>
          <p>CRM: ${medico.crm}</p>
          <br>
        `).join('');
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

async function buscarPorId() { // Função para buscar um médico por ID
  const id = document.getElementById('id').value;

  if (!id) {
    alert('Preencha o ID do Médico');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/hospital/${id}`);
    if (response.status === 404) {
      alert('Médico não encontrado. Verifique o ID e tente novamente.');
      return;
    }
    const dados = await response.json();
    console.log(dados);

    const lista = document.getElementById('lista');
    lista.innerHTML = `
      <p>ID: ${dados.id}</p>
      <p>Nome: ${dados.nome}</p>
      <p>CRM: ${dados.crm}</p>
    `;
  } catch (error) {
    console.error('Erro ao buscar dados por ID:', error);
  }
}

async function gravar() { // Função para gravar um novo médico
  const nome = document.getElementById('nome').value;
  const crm = document.getElementById('crm').value;

  if (!nome || !crm) {
    alert('Preencha todos os campos');
    return;
  }

  const dados = { nome, crm };
  try {
    const response = await fetch('http://localhost:8080/hospital', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    alert('Usuário inserido com sucesso');
    document.getElementById('nome').value = '';
    document.getElementById('crm').value = '';
    const data = await response.json();
    console.log(data);
    listar();
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
}

async function alterar() { // Função para alterar um médico existente
  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;
  const crm = document.getElementById('crm').value;

  if (!id || !nome || !crm) {
    alert('Preencha todos os campos');
    return;
  }

  const dados = { nome, crm };
  try {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (response.status === 404) {
      alert('Usuário não encontrado. Verifique o ID e tente novamente.');
      return;
    }

    const data = await response.json();
    alert(`Usuário alterado com sucesso!\nDados alterados:\nNome: ${data.nome}\nCRM: ${data.crm}`);
    console.log(data);
    listar();
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
  }
}

async function excluir() { // Função para excluir um médico
  const id = document.getElementById('id').value;

  if (!id) {
    alert('Preencha o ID do Médico');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 404) {
      alert('Usuário não encontrado. Verifique o ID e tente novamente.');
      return;
    }

    const data = await response.json();
    alert('Usuário excluído com sucesso');
    console.log(data);
    listar();
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
  }
}