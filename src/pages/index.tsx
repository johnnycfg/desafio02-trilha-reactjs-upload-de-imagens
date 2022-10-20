import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImageListProps {
  after: number | null;
  data: {
    description: string;
    id: string;
    title: string;
    ts: number;
    url: string;
  }[];
}

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function fetchInfinityImages({ pageParam = null }) {
    const res = await api.get('/api/images', {
      params: { after: pageParam },
    });
    return res.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ImageListProps>('images', fetchInfinityImages, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.after) return lastPage.after;
      return null;
    },
  });

  const formattedData = useMemo(() => {
    const allImages = data?.pages.map(image => {
      return image.data;
    });

    if (allImages && allImages.length > 0) {
      return allImages.flat().map(image => {
        return {
          title: image.title,
          description: image.description,
          url: image.url,
          ts: image.ts,
          id: image.id,
        };
      });
    }

    return [];
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            mt={10}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
