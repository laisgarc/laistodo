import {
  Text,
  TextInput,
  Button,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import tw from "./lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import { Trash2 } from "lucide-react-native";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  useDeviceContext(tw); // <- 👋
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");

  // Adicionar ao asyncStorage para persistência dos dados
  const addTodo = (): void => {
    if (todoText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      contentContainerStyle={tw`flex flex-col flex-1 items-center justify-center bg-white gap-4`}
    >
      <Text>My To-Do List</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 mb-2 w-[300px] `}
        placeholderTextColor={tw.color("neutral-800")}
        placeholder="Enter a new todo..."
        value={todoText}
        onChangeText={setTodoText}
        onSubmitEditing={addTodo}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <Text style={tw`text-lg font-bold mt-4`}>Tasks:</Text>
      {todos.length === 0 ? (
        <View style={tw`flex items-center justify-center h-[400px]`}>
          <Text style={tw`text-gray-500`}>No tasks to display.</Text>
        </View>
      ) : (
        //TODO: change to flatlist
        <ScrollView
          id="todos-scrollview"
          style={tw`max-h-[400px] grow-0 px-4 h-[400px]`}
          contentContainerStyle={tw`gap-2 w-full`}
        >
          {todos.map((todo) => (
            <View key={todo.id} style={tw`flex-row items-center gap-2`}>
              <Text
                onPress={() => toggleTodo(todo.id)}
                selectable={false}
                key={todo.id}
                style={tw.style(
                  `text-lg  border border-gray-300 rounded p-2 bg-white w-[200px]`,
                  todo.completed ? `line-through text-gray-500` : `text-black`,
                )}
              >
                {todo.text}
              </Text>
              {/* TODO: adicionar modal de confirmação para deletar */}
              <Pressable
                onPress={() => deleteTodo(todo.id)}
                style={tw`p-2 bg-red-400 rounded`}
              >
                <Trash2 size={18} color="white" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}

      <View>
        <Text style={tw`text-sm text-gray-500 mt-4`}>
          Total: {todos.length} {todos.length === 1 ? "task" : "tasks"}
        </Text>
        <Text style={tw`text-sm text-gray-500 mt-4`}>
          Completed: {todos.filter((t) => t.completed).length}{" "}
          {todos.filter((t) => t.completed).length === 1 ? "task" : "tasks"}
        </Text>
      </View>
    </ScrollView>
  );
}
