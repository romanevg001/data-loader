const faker = require("faker");
const axios = require ("axios");
const regionsJSON = require ("./regions.json");

const IDEA_GENERATOR  = 'https://appideagenerator.com/call.php';
const IDEA_API  = 'http://localhost:4000';

const randomInt = () => Math.floor(Math.random() * 100);

const generateIdea = async () => {
  const {data} = await axios.get(IDEA_GENERATOR);
  return data.replace(/\n/g, '');
}

const generateUser = async () => {
  const {data} = await axios.post(`${IDEA_API}/register`,
  {
    username: faker.internet.userName(),
    password: 'password'
  });

  return data.token;
}

const postNewIdea = async (token) => {
  const idea = await generateIdea();
  const {data} = await axios.post(`${IDEA_API}/api/ideas`, 
  {
    idea,
    description: faker.lorem.paragraph()
  },{
    headers: {authorization: `Bearer ${token}`}
  })
  console.log(data)
  return idea;
}

const gUserIdea = async ()=>{
  const randUserNum = randomInt();
  const randIdeaNum = randomInt();

  for(let i = 0; i < randUserNum; i++){
    const token = await generateUser();
    for(let j=0; j < randIdeaNum; j++) {
      const idea = await postNewIdea(token);

    }
  }

}


const region = async (region)=>{

  const {data} = await axios.post(`${IDEA_API}/api/regions`, 
  {
    ...region
  });
}

const regions = async ()=>{
  regionsJSON.data.map(reg => {
    region(reg)
  })
}


const box = async ()=>{
  await axios.post(`${IDEA_API}/api/box`, 
  {
    name: faker.lorem.sentence(3),
    views: randomInt()
  });

}
const boxes = async ()=>{
  const randBoxesNum = randomInt();

  for(let i = 0; i < randBoxesNum; i++){
    await box();
  }
}

const department = async ()=>{
  const department = ['Здравоохранение', 'ГМУ', 'Госсектор', 'Образование', 'Транспорт', 'Атомная отрасль' ];

  for(let i = 0; i < department.length; i++){
    await axios.post(`${IDEA_API}/api/department`, 
  {
    name: department[i],
  });
  }
}

const tags = async ()=>{
  const randBoxesNum = randomInt();

  for(let i = 0; i < randBoxesNum; i++){
    await axios.post(`${IDEA_API}/api/tag`, 
  {
    name: faker.lorem.words(1)
  });
  }
}

const types1 = async ()=>{
  const list = ['ПСР-проект','ПСР-образец','ППУ','ПСС','Лучшие практики','Выученные уроки'];
  for(let i = 0; i < list.length; i++){
    await axios.post(`${IDEA_API}/api/type`, 
  {
    name: list[i]
  });
  }
}


(async ()=>{
  types1();
})()

