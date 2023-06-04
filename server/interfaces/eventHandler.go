package interfaces

import "encoding/json"

type EventHandler interface {

	HandleEvent(eventPayload json.RawMessage)
}