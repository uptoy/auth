declare module 'express-session' {
  interface SessionData {
    user: string
  }
}

import { Router, Request, Response } from 'express'
import { db } from '../db' // Use db from your Knex configuration

export const todoRouter = Router()

// Fetch all todos
todoRouter.get('/', async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    // const todos = await db('todos').select();
    const todos = [
      {
        id: 1,
        task: 'Task 1'
      }
    ]
    res.json(todos)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' })
  }
})

// Create a new todo
todoRouter.post('/', async (req: Request, res: Response) => {
  const { task } = req.body

  if (!task) {
    return res.status(400).json({ message: 'Task is required' })
  }

  try {
    await db('todos').insert({ task })
    res.status(201).json({ message: 'Todo created' })
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' })
  }
})
