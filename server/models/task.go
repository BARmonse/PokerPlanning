package models

type Task struct {

	Description string `json:"description"`
	Points []int32 `json:"points"`
	Estimation int32 `json:"estimation"`
}


func newTask(description string) *Task{
	return &Task{
		Description: description,
		Points: make([]int32, 0),
		Estimation: 0,
	}
}