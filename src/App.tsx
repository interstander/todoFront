import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import { fetchTodos, addTodo, toggleTodo } from './store/todoSlice'
import { useAppDispatch } from './hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      dispatch(addTodo(inputText));
      setInputText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12" style={{ maxWidth: 700 }}>
          <h1 className="text-center display-3 fw-bold mb-5">할 일 목록</h1>
          <div className="input-group mb-4 shadow-sm">
            <input
              type="text"
              className="form-control form-control-lg"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="할 일을 입력하세요"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <button className="btn btn-primary btn-lg" onClick={handleAddTodo}>
              추가
            </button>
          </div>
          {loading && <div className="text-center text-muted py-3">로딩 중...</div>}
          {error && <div className="text-center text-danger py-3">{error}</div>}
          <div className="list-group">
            {todos.length === 0 && !loading ? (
              <div className="text-center text-muted py-5">할 일을 추가해보세요!</div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 shadow-sm rounded-4 px-4 py-3 ${todo.completed ? 'list-group-item-success' : ''}`}
                  style={{ fontSize: '1.2rem' }}
                >
                  <div className="d-flex flex-column">
                    <span
                      onClick={() => handleToggleTodo(todo.id)}
                      style={{
                        cursor: 'pointer',
                        textDecoration: todo.completed ? 'line-through' : 'none'
                      }}
                    >
                      {todo.title}
                    </span>
                    <small className="text-muted mt-1">
                      생성: {todo.created_at}
                      {todo.completed && todo.completed_at && (
                        <> / 완료: {todo.completed_at}</>
                      )}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
