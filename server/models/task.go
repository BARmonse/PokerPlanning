package models

type Task struct {

	Description string
	Points []int32
	Estimation int32
}


func newTask(description string) *Task{
	return &Task{
		Description: description,
		Points: make([]int32, 0),
		Estimation: 0,
	}
}