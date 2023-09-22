import { Flex } from '@chakra-ui/react'
import { Input, Button } from '@opengovsg/design-system-react'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { SearchFilterUtilsProps } from '../types'

//@ts-ignore
export const SearchFilterUtilities = ({
  filterResources,
}: SearchFilterUtilsProps) => {
  const [inputOpen, setInputOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleToggle = (type: string) => {
    switch (type) {
      case 'input':
        if (!inputOpen && filterOpen) {
          setFilterOpen(false)
          setInputOpen(true)
        } else if (!inputOpen) {
          console.log('hello')
          setInputOpen(true)
        } else {
          console.log('hello2')
          setInputOpen(false)
        }
        return
      case 'filter':
        if (!filterOpen && inputOpen) {
          setInputOpen(false)
          setFilterOpen(true)
        } else if (!filterOpen) {
          setFilterOpen(true)
        } else {
          setFilterOpen(false)
        }
        return
      default:
        return
    }
  }

  return (
    <Flex
      direction="row"
      gap="1"
      position="absolute"
      top="2"
      left="2"
      maxWidth="100vw"
    >
      <Button
        onClick={() => handleToggle('input')}
        variant="solid"
        size="xs"
        fontSize="xs"
        rounded="2xl"
        zIndex={99999}
      >
        <PiMagnifyingGlassBold />
      </Button>
      <Input
        display={inputOpen ? 'block' : 'none'}
        onChange={(e) => filterResources(e.target.value)}
        placeholder="Start searching"
        size="xs"
        width="210px"
        rounded="2xl"
        borderColor="teal"
        zIndex={99999}
      />

      <Button
        onClick={() => handleToggle('filter')}
        variant="solid"
        size="xs"
        fontSize="xs"
        rounded="2xl"
        zIndex={99999}
      >
        F
      </Button>
      <Input
        display={filterOpen ? 'block' : 'none'}
        placeholder="Filter"
        size="xs"
        width="100px"
        rounded="2xl"
        borderColor="teal"
        zIndex={99999}
      />
    </Flex>
  )
}
