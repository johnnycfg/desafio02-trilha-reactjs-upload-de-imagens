import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageURL, setSelectedImageURL] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const openViewImageModal = useCallback(
    (url: string) => {
      setSelectedImageURL(url);
      onOpen();
    },
    [selectedImageURL]
  );

  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <Box key={card.id}>
            <Card key={card.id} data={card} viewImage={openViewImageModal} />
          </Box>
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      {isOpen && selectedImageURL !== '' && (
        <ModalViewImage
          isOpen={isOpen}
          onClose={onClose}
          imgUrl={selectedImageURL}
        />
      )}
    </>
  );
}
