import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
        const newTask = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false
        }
        setTasks(prevState => [...prevState, newTask]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const tasksCurrently = tasks.map(task => {
        if (task.id === id) {
            task.done = !task.done;
        }
        return task;
    });

    setTasks(tasksCurrently);
  }

  function handleRemoveTask(id: number) {
    const tasksWithoutRemoved = tasks.filter(task => task.id !== id);
    setTasks(tasksWithoutRemoved);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}