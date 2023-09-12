import React from 'react'
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  type NumberInputProps,
} from '@chakra-ui/react'

/**
 * Wrapper around Chakra's NumberInput that only allows numbers to be inputted.
 */
export const NumberInput = ({ onChange, ...rest }: NumberInputProps) => {
  return (
    <ChakraNumberInput
      onChange={(valueAsString, valueAsNumber) => {
        if (/^-?[0-9]*\.?[0-9]*$/.test(valueAsString)) {
          onChange?.(valueAsString, valueAsNumber)
        }
      }}
      {...rest}
    >
      <NumberInputField />
    </ChakraNumberInput>
  )
}
