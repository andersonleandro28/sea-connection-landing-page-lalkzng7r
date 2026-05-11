import { useState, useEffect } from 'react'

type Listener = () => void

class RegistrationStore {
  isOpen = false
  listeners = new Set<Listener>()

  open = () => {
    this.isOpen = true
    this.notify()
  }

  close = () => {
    this.isOpen = false
    this.notify()
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  notify = () => {
    this.listeners.forEach((listener) => listener())
  }
}

const store = new RegistrationStore()

export default function useRegistrationStore() {
  const [isOpen, setIsOpen] = useState(store.isOpen)

  useEffect(() => {
    return store.subscribe(() => setIsOpen(store.isOpen))
  }, [])

  return {
    isOpen,
    open: store.open,
    close: store.close,
  }
}
