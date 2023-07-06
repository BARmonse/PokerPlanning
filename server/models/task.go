package models

import "server/utils"
type Task struct {

	Identifier string `json:"identifier"`
	Description string `json:"description"`
	Points []int32 `json:"points"`
	Estimation int32 `json:"estimation"`
}


func newTask(description string) *Task{
	return &Task{
		Identifier: utils.GenerateIdentifier(16),
		Description: description,
		Points: make([]int32, 0),
		Estimation: 0,
	}
}