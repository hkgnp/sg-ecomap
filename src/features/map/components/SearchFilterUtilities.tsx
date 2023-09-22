import { Flex } from '@chakra-ui/react'
import { Input, Button } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { SearchFilterUtilsProps } from '../types'

//@ts-ignore
export const SearchFilterUtilities = ({
  filterResources,
}: SearchFilterUtilsProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleToggle = (type: string) => {
    switch (type) {
      case 'search':
        if (!searchOpen && filterOpen) {
          setFilterOpen(false)
          setSearchOpen(true)
        } else if (!searchOpen) {
          setSearchOpen(true)
        } else {
          setSearchOpen(false)
        }
        return
      case 'filter':
        if (!filterOpen && searchOpen) {
          setSearchOpen(false)
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
        onClick={() => handleToggle('search')}
        variant="solid"
        size="xs"
        fontSize="xs"
        rounded="2xl"
        zIndex={99999}
      >
        <PiMagnifyingGlassBold />
      </Button>
      <Input
        display={searchOpen ? 'block' : 'none'}
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
