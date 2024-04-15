
// console.log('soy el primer console.log')

// setTimeout(() => {
//   console.log('soy el settimeout')
// },5000);

// console.log('el ultimo console.log')

// const btn = document.querySelector('#btn');


// btn.addEventListener('click', () => {
//   btn.innerHTML = '<p class="fade">Enviando.... ⌚</p>';

//   setTimeout(() => {
//     btn.innerHTML = '<p class="fade">Enviado con exito 👌🏻</p>'
//     btn.classList.add('okey')
//   }, 6000);
// })


//SETINVERVAL = una funcion nativa, que repite el codigo durante el tiempo que le indiquemos
// setInterval(() => {

//   console.log(
//     'hola soy un console.log cada 3 segundos'
//   )
// }, 3000)

// const count = document.querySelector('#count');
// let contando = 0;

// const intervalo = setInterval(() => {
//   contando++;
//   count.innerHTML = contando;
//   const box = document.querySelector('.box');

//   if(contando === 3){
//     clearInterval(intervalo)
//     box.style.backgroundColor = 'rgb(244, 133, 133)';
//     count.innerHTML = 'La bomba exploto 💥'
//   }
// },1000)


// const valor = true;

// const eventoFuturo = (res) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (res == true) {
//         resolve('Promesa resuelta');
//       } else {
//         reject('Promesa rechazada');
//       }
//     }, 3000)
//   })
// }


// simulacion login
const usuario = [{ username: 'fer', password: 'admin', token: 'aksjldhj31231lkjaskdh12319|0||93' }];

const form = document.querySelector('#form');
const btnForm = document.querySelector('#btn-form');
const title = document.querySelector('#title');


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // console.log(`user: ${user} - pass: ${password}`)

  login(user, password)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
})


const login = (username, password) => {
  return new Promise((resolve, reject) => {
    btnForm.innerHTML = `
    <div class="spinner-border text-secondary role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    `;


    setTimeout(() => {
      let administrador = usuario.find(usuario => usuario.username === username && usuario.password === password);

      if (administrador) {
        console.log(`Bienvenido:`, administrador)
        localStorage.setItem('user', JSON.stringify(administrador.token))
        resolve(administrador)
        welcome()
      } else {
        reject('Usuario no encontrado2.')
        btnForm.innerHTML = '<p >¿Que paso mi loco?</p>';

      }
    }, 3000)

  })
}

const welcome = () => {
  form.remove();
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  user ? title.innerHTML = `Hola ${usuario[0].username}` : title.innerHTML = ''
}


const db = [
  { id: 'asdasd1223', nombre: 'Javascript', comision: '534586', activo: true },
  { id: 'asasd23', nombre: 'React', comision: '65386', activo: false },
  { id: 'a86hg3', nombre: 'Angular', comision: '957464', activo: false },
  { id: 'bnny567', nombre: 'Python', comision: '234566', activo: true },
]


const container = document.querySelector('#container');

const llamadoDB = () => {
  return new Promise((resolve, reject) => {
    resolve(db)
    console.log(db)
  })
}

const mostrarDB = (db) => {
  const cursos = db;
  console.log(cursos)
  cursos.map((curso => {
    container.innerHTML +=
      `
     <div class="box-card" key=${curso.id}>
        <h2 class="box-title">${curso.nombre}</h2>
        <p>Comsión: ${curso.comsion}</p>
        <p>Finalizado: ${curso.activo ? '<span class="green"></span>' : '<span class="red"></span>'} </p>
      </div>
    `
  }))
}


const loadPage = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    form.remove();
    welcome();

    llamadoDB()
      .then((res) => {
        mostrarDB(res)
      })
      .catch(err => console.log(err))

  } else {
    console.log('bienvenido')
  }
}

loadPage();