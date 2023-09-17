import { useDisclosure, Flex, ScaleFade } from '@chakra-ui/react'
import { Input, Button } from '@opengovsg/design-system-react'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

export const SearchFilterUtilities = () => {
  const { isOpen: inputIsOpen, onToggle: onInputToggle } = useDisclosure()

  return (
    <Flex
      direction="row"
      gap="1"
      position="absolute"
      top="2"
      left="2"
      maxWidth="100vw"
    >
      <ScaleFade initialScale={0.9} in={inputIsOpen}>
        <Input
          display={inputIsOpen ? 'block' : 'none'}
          placeholder="Start searching"
          size="xs"
          width="210px"
          rounded="2xl"
          borderColor="teal"
          zIndex={99999}
        />
      </ScaleFade>
      <Button
        onClick={onInputToggle}
        variant="solid"
        size="xs"
        fontSize="xs"
        rounded="2xl"
        zIndex={99999}
      >
        <PiMagnifyingGlassBold />
      </Button>
    </Flex>
  )
}
