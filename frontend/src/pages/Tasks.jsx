import { useNavigate } from 'react-router-dom'

export default function Tasks() {

  const navigate = useNavigate()

  return (
    <div className="container">

      <div className="card">

        <h1>Tarefas</h1>

        <p>
          Área protegida.
        </p>

        <button onClick={() => navigate('/dashboard')}>
          Voltar
        </button>
      </div>

    </div>
  )
}