import Link from 'next/link'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { ROUTES } from '@/src/routes'

export default function Home() {
  return (
    <Box maxW="4xl" mx="auto" px={6} py={10}>
      <Heading>Loto Facil - Front-end</Heading>
      <Text mt={3} color="gray.600">
        Estrutura profissional com paginas, componentes, hooks e services.
      </Text>
      <Button asChild mt={6} colorPalette="blue">
        <Link href={ROUTES.FILTROS}>Ir para pagina de filtros</Link>
      </Button>
    </Box>
  )
}
