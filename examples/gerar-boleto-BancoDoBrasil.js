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
      agencia: '18455',
      agenciaDigito: '4',
      conta: '1277165',
      contaDigito: '1',
      nossoNumero: '00000000061',
      nossoNumeroDigito: '8'
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
    numeroDocumento: '1001',
    especieDocumento: 'DM',
    valor: 110.00,
    datas: {
      vencimento: '02-04-2020',
      processamento: '02-04-2019',
      documentos: '02-04-2019'
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



