  var bdInfo = {
  courses: [{id: 1, description: "Gestão ambiental"}],
  origins: [{id: 1, value: 'Escola Particular'},{id: 2, value: 'Escola Pública'}],
  genders: [{id: 1, value: 'Masculino'},{id: 2, value: 'Feminino'}],
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
    {id: 1, description:'Arapiraca', state:'AL'},{id: 1, description:'Maceió', state:'AL'}
  ],
};

export {bdInfo};
