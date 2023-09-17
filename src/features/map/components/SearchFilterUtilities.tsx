import { Flex } from '@chakra-ui/react'
import { Input, Button } from '@opengovsg/design-system-react'
import { useState } from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

//@ts-ignore
export const SearchFilterUtilities = ({ filterResources }: any) => {
  const [inputOpen, setInputOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

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
        onClick={() => (inputOpen ? setInputOpen(false) : setInputOpen(true))}
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
        onClick={() =>
          filterOpen ? setFilterOpen(false) : setFilterOpen(true)
        }
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
