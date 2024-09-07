// recoil/atoms.ts
import { atom } from 'recoil';

interface Todo {
  id: number;
  task: string;
}

// グローバルに管理するtodoState
export const todoState = atom<Todo[]>({
  key: 'todoState',
  default: []
});


// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useSetRecoilState } from 'recoil';

interface Todo {
  id: number;
  task: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5001/api/todos');
  const data: Todo[] = await res.json();

  return { props: { initialData: data } };
}

const Home = ({ initialData }: { initialData: Todo[] }) => {
  const setTodos = useSetRecoilState(todoState);

  // React Queryを使用してデータをフェッチ
  const { data: todos, error } = useQuery<Todo[]>('fetchTodos', async () => {
    const res = await fetch('http://localhost:5001/api/todos');
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  }, {
    initialData,
    onSuccess: (data) => {
      setTodos(data); // フェッチ成功時にRecoilの状態を更新
    }
  });

  if (error) return <div>Error loading todos</div>;

  return (
    <div>
      <TodoList />
    </div>
  );
}

export default Home;


// components/TodoList.tsx
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

const TodoList = () => {
  const todos = useRecoilValue(todoState);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};
