import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e) {

    e.preventDefault()

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      localStorage.setItem('token', response.data.token)

      navigate('/dashboard')

    } catch (err) {

      setError('Email ou senha inválidos')
    }
  }

  return (
    <div className="container">

      <form className="card" onSubmit={handleLogin}>
        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

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

        <button type="submit">Entrar</button>

        <Link to="/register">
          Criar conta
        </Link>

      </form>
    </div>
  )
}