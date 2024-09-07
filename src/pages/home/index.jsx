import { useEffect,useState,useRef} from 'react'
import './styles.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'
function Home() {


  // let users=[]

  const [users,setUsers]=useState([])
  const inputName=useRef()
  const inputage=useRef()
  const inputemail=useRef()
  
  async function getUsers() {
    const usersFromapi= await api.get('/users')
     setUsers(usersFromapi.data)
    //  console.log(users)
  }
async function createuser(){
   await api.post('/users',{
    name:inputName.current.value,
    age:inputage.current.value,
    email:inputemail.current.value
   })
   getUsers()
}
async function deleteUsers(id) {
  await api.delete(`/users/${id}`)
  //  console.log(users)
  getUsers()
}


useEffect(()=>{
  getUsers();
},[])

  return (
  <div className="container">
    <form>
      <h1> Cadastro de Usuarios</h1>
      <input name='nome'  type="text" placeholder='digite o seu nome' ref={inputName} />
      <input name='idade' type="number"placeholder='Sua idade' ref={inputage} />
      <input name='email' type="email" placeholder='Email'  ref={inputemail} />
      <button type='button' onClick={createuser}>Cadastrar</button>
      {console.log(createuser)}
    </form>
      
    {users.map(user=>(
    <div key={user.id} className='card'>
    <p>Nome:  <span>{user.name}</span></p>
    <p>Idade: <span>{user.age}</span> </p>
    <p>Email: <span>{user.email}</span> </p>

    <div>
      <button onClick={()=>deleteUsers(user.id)}>
        <img src={Trash} />
      </button>
    </div>
  </div>

 
    ))}
  
    </div>  
  )
}

export default Home
