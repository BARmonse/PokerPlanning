package utils

import (
	"crypto/rand"
	"math/big"
	"strings"
)

const (
	alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
)

func GenerateIdentifier(length int) string {
	var builder strings.Builder
	charSetLength := big.NewInt(int64(len(alphanumericChars)))

	for i := 0; i < length; i++ {
		randomIndex, _ := rand.Int(rand.Reader, charSetLength)
		char := alphanumericChars[randomIndex.Int64()]
		builder.WriteByte(byte(char))
	}

	return builder.String()
}