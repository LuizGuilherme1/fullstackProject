import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const navigate = useNavigate()

  function logout() {

    localStorage.removeItem('token')

    navigate('/login')
  }

  return (
    <div className="container">

      <div className="card">

        <h1>Dashboard</h1>
        <p>
          Login realizado com sucesso.
        </p>

        <button onClick={() => navigate('/tasks')}>
          Ir para tarefas
        </button>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  )
}