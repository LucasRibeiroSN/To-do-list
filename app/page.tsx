"use client"; // Diretiva para indicar que este é um Componente de Cliente

import { useState, useEffect } from 'react';
import styles from './/page.module.css';

// Definindo o tipo de uma Tarefa para usar com TypeScript
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomePage() {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado para armazenar o texto da nova tarefa
  const [inputText, setInputText] = useState('');

  // useEffect para carregar as tarefas do localStorage quando o componente montar
  useEffect(() => {
    // localStorage só existe no navegador, por isso verificamos
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // useEffect para salvar as tarefas no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]); // O [tasks] faz com que isso rode sempre que `tasks` for alterado

  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (inputText.trim() === '') return; // Não adiciona se estiver vazio

    const newTask: Task = {
      id: Date.now(), // Gera um ID único baseado no tempo atual
      text: inputText,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Adiciona a nova tarefa à lista existente
    setInputText(''); // Limpa o campo de input
  };

  // Função para marcar uma tarefa como concluída/não concluída
  const handleToggleTask = (id: number) => {
    setTasks(
        tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
  };

  // Função para deletar uma tarefa
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Gerenciador de Tarefas</h1>
          <div className={styles.inputSection}>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="O que você precisa fazer?"
                className={styles.taskInput}
            />
            <button onClick={handleAddTask} className={styles.addButton}>
              Adicionar
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <h2>Minhas Tarefas</h2>
          <ul className={styles.taskList}>
            {tasks.map(task => (
                <li
                    key={task.id}
                    className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                >
              <span onClick={() => handleToggleTask(task.id)} className={styles.taskText}>
                {task.text}
              </span>
                  <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>
                    Excluir
                  </button>
                </li>
            ))}
          </ul>
        </main>
      </div>
  );
}