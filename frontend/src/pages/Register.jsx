import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister(e) {

    e.preventDefault()

    try {
      await api.post('/auth/register', {
        name,
        email,
        password
      })

      setMessage('Usuário cadastrado com sucesso')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (err) {

      setMessage('Erro ao cadastrar usuário')
    }
  }

  return (
    <div className="container">

      <form className="card" onSubmit={handleRegister}>

        <h1>Cadastro</h1>

        {message && <p>{message}</p>}

        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>

        <Link to="/login">
          Voltar Login
        </Link>
      </form>

    </div>
  )
}