  var bdInfo = {
  courses: [{id: 1, description: "Gestão ambiental"}],
  origins: [{id: 1, value: 'Escola Particular'},{id: 2, value: 'Escola Pública'}],
  genders: [{id: "M", value: 'Masculino'},{id: "F", value: 'Feminino'}],
  estagios: [
    {id: 1, description: 'Estágio'},
    {id: 2, description: 'Aluno Cotista/Aprendiz'},
    {id: 3, description: 'Empresário/Sócio proprietário'},
    {id: 4, description: 'Empregado com carteira assinada'},
    {id: 5, description: 'Empregado sem carteira assinada'},
    {id: 6, description: 'Empregado temporário com carteira assinada'},
    {id: 7, description: 'Empregado temporário sem carteira assinada'},
    {id: 8, description: 'Profissional liberal (dentista, advogado...)'},
    {id: 9, description: 'Autônomo (por conta própria)'},
    {id: 10, description: 'Funcionário público/militar'},
    {id: 11, description: 'Outra situação? Qual?'}
  ],
  ethnicities: [{id:1,value:'Branca'}, {id:2,value:'Preta'}, {id:3,value:'Amarela'}, {id:4,value:'Indígena'},{id:5,value:'Parda'}],
  disabilities: [
    {id:1, value: 'Auditiva'}, {id:2, value: 'Intelectual'}, {id:3, value: 'Física'},{id:4, value: 'Condutas típicas'},
    {id:5, value: 'Visual'}, {id:6, value: 'Múltiplas'},{id:7, value: 'Altas habilidades'}, {id:8, value: 'Outro (s)'}
  ],
  months: [
    {id: 1,valueView:'Janeiro'}, {id: 2,valueView:'Fevereiro'}, {id: 3,valueView:'Março'},
    {id: 4,valueView:'Abril'}, {id: 5,valueView:'Maio'}, {id: 6,valueView:'Junho'},
    {id: 7,valueView:'Julho'}, {id: 8,valueView:'Agosto'}, {id: 9,valueView:'Setembro'},
    {id: 10,valueView:'Outubro'}, {id: 11,valueView:'Novembro'}, {id: 12,valueView:'Dezembro'}
  ],
  years: [2016, 2015, 2014,2013],
  bancos: ['Virá do banco'],
  regionals: [
    {description:'Acre',sigla:'AC'},{description:'Alagoas',sigla:'AL'},{description:'Amapá',sigla:'AP'},{description:'Amazonas',sigla:'AM'},
    {description:'Bahia',sigla:'BA'},{description:'Ceará',sigla:'CE'},{description:'CETIQT',sigla:'CT'},{description:'Distrito Federal',sigla:'DF'},
    {description:'Espírito Santo',sigla:'ES'},{description:'Goiás',sigla:'GO'},{description:'Maranhão',sigla:'MA'},{description:'Mato Grosso',sigla:'MT'},
    {description:'Mato Grosso do Sul',sigla:'MS'},{description:'Minas Gerais',sigla:'MG'},{description:'Pará',sigla:'PA'},{description:'Paraíba',sigla:'PB'},
    {description:'Paraná',sigla:'PR'},{description:'Pernambuco',sigla:'PE'},{description:'Piauí',sigla:'PI'},{description:'Rio de Janeiro',sigla:'RJ'},
    {description:'Rio Grande do Norte',sigla:'RN'},{description:'Rio Grande do Sul',sigla:'RS'},{description:'Rondônia',sigla:'RO'},{description:'Roraima',sigla:'RR'},
    {description:'Santa Catarina',sigla:'SC'},{description:'São Paulo',sigla:'SP'},{description:'Sergipe',sigla:'SE'},{description:'Tocantins', sigla:'TO'}
  ],
  units: [
    {'id':4,description: "UNIDADE MÓVEL ELETROELETRÔNICA"},
  ],
  modalities: [
    {id:2, description: 'QUALIFICAÇÃO PROFISSIONAL'}, {'id':4,description: "APRENDIZAGEM INDUSTRIAL TÉCNICA DE NÍVEL MÉDIO"},
  ],
  areas: [
    {'id':2,description: "ALIMENTOS E BEBIDAS"},
  ],
  occupations: [
    {'id':2,description: "OFICIAL GENERAL DO EXÉRCITO"},
  ],
  pronatec: [
    {'id':2,description: "Teste Pronatec"},
  ],
  cities: [
    {"id":23,"code":2700201,"description":"ANADIA","state":"AL"},{"id":24,"code":2700300,"description":"ARAPIRACA","state":"AL"},{"id":25,"code":2700409,"description":"ATALAIA","state":"AL"},{"id":26,"code":2700508,"description":"BARRA DE SANTO ANT\u00d4NIO","state":"AL"},{"id":27,"code":2700607,"description":"BARRA DE S\u00c3O MIGUEL","state":"AL"},{"id":28,"code":2700706,"description":"BATALHA","state":"AL"},{"id":29,"code":2700904,"description":"BELO MONTE","state":"AL"},{"id":30,"code":2700805,"description":"BEL\u00c9M","state":"AL"},{"id":31,"code":2701001,"description":"BOCA DA MATA","state":"AL"},{"id":32,"code":2701100,"description":"BRANQUINHA","state":"AL"},{"id":33,"code":2701209,"description":"CACIMBINHAS","state":"AL"},{"id":34,"code":2701308,"description":"CAJUEIRO","state":"AL"},{"id":35,"code":2701357,"description":"CAMPESTRE","state":"AL"},{"id":36,"code":2701407,"description":"CAMPO ALEGRE","state":"AL"},{"id":37,"code":2701506,"description":"CAMPO GRANDE","state":"AL"},{"id":38,"code":2701605,"description":"CANAPI","state":"AL"},{"id":39,"code":2701704,"description":"CAPELA","state":"AL"},{"id":40,"code":2701803,"description":"CARNEIROS","state":"AL"},{"id":41,"code":2701902,"description":"CH\u00c3 PRETA","state":"AL"},{"id":42,"code":2702009,"description":"COIT\u00c9 DO N\u00d3IA","state":"AL"},{"id":43,"code":2702108,"description":"COL\u00d4NIA LEOPOLDINA","state":"AL"},{"id":44,"code":2702207,"description":"COQUEIRO SECO","state":"AL"},{"id":45,"code":2702306,"description":"CORURIPE","state":"AL"},{"id":46,"code":2702355,"description":"CRA\u00cdBAS","state":"AL"},{"id":47,"code":2702405,"description":"DELMIRO GOUVEIA","state":"AL"},{"id":48,"code":2702504,"description":"DOIS RIACHOS","state":"AL"},{"id":49,"code":2702553,"description":"ESTRELA DE ALAGOAS","state":"AL"},{"id":50,"code":2702603,"description":"FEIRA GRANDE","state":"AL"},{"id":51,"code":2702702,"description":"FELIZ DESERTO","state":"AL"},{"id":52,"code":2702801,"description":"FLEXEIRAS","state":"AL"},{"id":53,"code":2702900,"description":"GIRAU DO PONCIANO","state":"AL"},{"id":54,"code":2703007,"description":"IBATEGUARA","state":"AL"},{"id":55,"code":2703106,"description":"IGACI","state":"AL"},{"id":56,"code":2703205,"description":"IGREJA NOVA","state":"AL"},{"id":57,"code":2703304,"description":"INHAPI","state":"AL"},{"id":58,"code":2703403,"description":"JACAR\u00c9 DOS HOMENS","state":"AL"},{"id":59,"code":2703502,"description":"JACU\u00cdPE","state":"AL"},{"id":60,"code":2703601,"description":"JAPARATINGA","state":"AL"},{"id":61,"code":2703700,"description":"JARAMATAIA","state":"AL"},{"id":62,"code":2703759,"description":"JEQUI\u00c1 DA PRAIA","state":"AL"},{"id":63,"code":2703809,"description":"JOAQUIM GOMES","state":"AL"},{"id":64,"code":2703908,"description":"JUNDI\u00c1","state":"AL"},{"id":65,"code":2704005,"description":"JUNQUEIRO","state":"AL"},{"id":66,"code":2704104,"description":"LAGOA DA CANOA","state":"AL"},{"id":67,"code":2704203,"description":"LIMOEIRO DE ANADIA","state":"AL"},{"id":68,"code":2704302,"description":"MACEI\u00d3","state":"AL"},{"id":69,"code":2704401,"description":"MAJOR ISIDORO","state":"AL"},{"id":70,"code":2704906,"description":"MAR VERMELHO","state":"AL"},{"id":71,"code":2704500,"description":"MARAGOGI","state":"AL"},{"id":72,"code":2704609,"description":"MARAVILHA","state":"AL"},{"id":73,"code":2704708,"description":"MARECHAL DEODORO","state":"AL"},{"id":74,"code":2704807,"description":"MARIBONDO","state":"AL"},{"id":75,"code":2705002,"description":"MATA GRANDE","state":"AL"},{"id":76,"code":2705101,"description":"MATRIZ DE CAMARAGIBE","state":"AL"},{"id":77,"code":2705200,"description":"MESSIAS","state":"AL"},{"id":78,"code":2705309,"description":"MINADOR DO NEGR\u00c3O","state":"AL"},{"id":79,"code":2705408,"description":"MONTEIR\u00d3POLIS","state":"AL"},{"id":80,"code":2705507,"description":"MURICI","state":"AL"},{"id":81,"code":2705606,"description":"NOVO LINO","state":"AL"},{"id":82,"code":2705903,"description":"OLHO D`\u00c1GUA GRANDE","state":"AL"},{"id":83,"code":2705705,"description":"OLHO D`\u00c1GUA DAS FLORES","state":"AL"},{"id":84,"code":2705804,"description":"OLHO D`\u00c1GUA DO CASADO","state":"AL"},{"id":85,"code":2706000,"description":"OLIVEN\u00c7A","state":"AL"},{"id":86,"code":2706109,"description":"OURO BRANCO","state":"AL"},{"id":87,"code":2706208,"description":"PALESTINA","state":"AL"},{"id":88,"code":2706307,"description":"PALMEIRA DOS \u00cdNDIOS","state":"AL"},{"id":89,"code":2706422,"description":"PARICONHA","state":"AL"},{"id":90,"code":2706448,"description":"PARIPUEIRA","state":"AL"},{"id":91,"code":2706505,"description":"PASSO DE CAMARAGIBE","state":"AL"},{"id":92,"code":2706604,"description":"PAULO JACINTO","state":"AL"},{"id":93,"code":2706703,"description":"PENEDO","state":"AL"},{"id":94,"code":2706802,"description":"PIA\u00c7ABU\u00c7U","state":"AL"},{"id":95,"code":2706901,"description":"PILAR","state":"AL"},{"id":96,"code":2707008,"description":"PINDOBA","state":"AL"},{"id":97,"code":2707107,"description":"PIRANHAS","state":"AL"},{"id":98,"code":2707305,"description":"PORTO CALVO","state":"AL"},{"id":99,"code":2707503,"description":"PORTO REAL DO COL\u00c9GIO","state":"AL"},{"id":100,"code":2707404,"description":"PORTO DE PEDRAS","state":"AL"},{"id":101,"code":2707206,"description":"PO\u00c7O DAS TRINCHEIRAS","state":"AL"},{"id":102,"code":2706406,"description":"P\u00c3O DE A\u00c7\u00daCAR","state":"AL"},{"id":103,"code":2707602,"description":"QUEBRANGULO","state":"AL"},{"id":104,"code":2707701,"description":"RIO LARGO","state":"AL"},{"id":105,"code":2707800,"description":"ROTEIRO","state":"AL"},{"id":106,"code":2707909,"description":"SANTA LUZIA DO NORTE","state":"AL"},{"id":107,"code":2708006,"description":"SANTANA DO IPANEMA","state":"AL"},{"id":108,"code":2708105,"description":"SANTANA DO MUNDA\u00da","state":"AL"},{"id":109,"code":2708907,"description":"SATUBA","state":"AL"},{"id":110,"code":2708956,"description":"SENADOR RUI PALMEIRA","state":"AL"},{"id":111,"code":2708204,"description":"S\u00c3O BR\u00c1S","state":"AL"},{"id":112,"code":2708303,"description":"S\u00c3O JOS\u00c9 DA LAJE","state":"AL"},{"id":113,"code":2708402,"description":"S\u00c3O JOS\u00c9 DA TAPERA","state":"AL"},{"id":114,"code":2708501,"description":"S\u00c3O LU\u00cdS DO QUITUNDE","state":"AL"},{"id":115,"code":2708600,"description":"S\u00c3O MIGUEL DOS CAMPOS","state":"AL"},{"id":116,"code":2708709,"description":"S\u00c3O MIGUEL DOS MILAGRES","state":"AL"},{"id":117,"code":2708808,"description":"S\u00c3O SEBASTI\u00c3O","state":"AL"},{"id":118,"code":2709004,"description":"TANQUE D`ARCA","state":"AL"},{"id":119,"code":2709103,"description":"TAQUARANA","state":"AL"},{"id":120,"code":2709152,"description":"TEOT\u00d4NIO VILELA","state":"AL"},{"id":121,"code":2709202,"description":"TRAIPU","state":"AL"},{"id":122,"code":2709301,"description":"UNI\u00c3O DOS PALMARES","state":"AL"},{"id":123,"code":2709400,"description":"VI\u00c7OSA","state":"AL"},{"id":124,"code":2700102,"description":"\u00c1GUA BRANCA","state":"AL"}
  ],
};

export {bdInfo};
