const fs = require('fs');
const Boleto = require('../utils/functions/boletoUtils');
const BoletoStringify = require('../stringify/boletoStringify');

module.exports = class Boletos {
  constructor({ banco, pagador, boleto, beneficiario, instrucoes, mensagens }) {
    this.banco = banco;
    this.pagador = pagador;
    this.boleto = boleto;
    this.beneficiario = beneficiario;
    this.instrucoes = instrucoes;
    this.mensagens = mensagens;
    this.boletoInfo;
  }

  gerarBoleto() {
    const dataInstance = Boleto.Datas;
    const { datas, valor, deducoes, especieDocumento, numeroDocumento, aceite } = this.boleto;

    this.boletoInfo = Boleto.Boleto.novoBoleto()
      .comDatas(dataInstance.novasDatas()
        .comVencimento(datas.vencimento)
        .comProcessamento(datas.processamento)
        .comDocumento(datas.documentos))
      .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario))
      .comPagador(BoletoStringify.createPagador(this.pagador))
      .comBanco(this.banco)
      .comValorBoleto(parseFloat(valor).toFixed(2))
      .comValorDeducoes(parseFloat(deducoes).toFixed(2))
      .comNumeroDoDocumento(numeroDocumento)
      .comEspecieDocumento(especieDocumento)
      .comAceite(aceite)
      .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes))
      .comMensagens(BoletoStringify.createMensagens(this.mensagens));
  }

  pdfFile(dir = './tmp/boletos', filename='boleto') {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const stream = fs.createWriteStream(`${dir}/${filename}.pdf`);

    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }

  pdfStream(stream) {
    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }
};
