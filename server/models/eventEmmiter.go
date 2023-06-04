package models

import "sync"

type EventEmitter struct {
	subscribers map[string][]func(interface{})
	mutex       sync.Mutex
}

func NewEventEmitter() *EventEmitter {
	return &EventEmitter{
		subscribers: make(map[string][]func(interface{})),
	}
}

func (e *EventEmitter) On(event string, handler func(interface{})) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	if _, ok := e.subscribers[event]; !ok {
		e.subscribers[event] = []func(interface{}){}
	}

	e.subscribers[event] = append(e.subscribers[event], handler)
}

func (e *EventEmitter) Emit(event string, payload interface{}) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	if handlers, ok := e.subscribers[event]; ok {
		for _, handler := range handlers {
			handler(payload)
		}
	}
}