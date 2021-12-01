const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
  banco: new Bancos.BancoBrasil(),
  pagador: {
    nome: 'José Bonifácio de Andrada',
    registroNacional: '123.456.789-09', //Deve ser texto. Com ou sem pontuações. CPF inválido não aparece no boleto, validar antes
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
  mensagens: ['Mensalidade 01/2021', 'Linha digitável', 'Próxima linha digitada de mensagem', 'Texto muito longo para não caber em uma única linha e testar se a função irá realizar a quebra da maneira correta sem interferir no layout do boleto. Mas ainda precisamos de mais texto.'],
  beneficiario: {
    nome: 'TESTE',
    cnpj:'43576788000191',
    dadosBancarios: {
      carteira: '09',
      agencia: '1855',
      agenciaDigito: '4',
      conta: '1277165',
      contaDigito: '1',
      nossoNumero: '31200070002025001',
      nossoNumeroDigito: ''
    },
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  boleto: {
    aceite: true,
    numeroDocumento: '2025001',
    especieDocumento: 'DS',
    valor: 29,
    deducoes: 12.02,
    datas: {
      vencimento: '2021-12-03',
      processamento: '2021-11-30',
      documentos: '2021-11-30'
    }
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {
  // ctx.res.set('Content-type', 'application/pdf');	
  await streamToPromise(stream);
}).catch((error) => {
  return error;
});



