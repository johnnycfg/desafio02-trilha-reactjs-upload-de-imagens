import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AxiosResponse } from 'axios';
import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { schemaValidation } from './FormAddImageValidation';

interface FormAddImageProps {
  closeModal: () => void;
}

interface FormAddImageInputProps {
  image: File;
  title: string;
  description: string;
}

interface MutationProps {
  url: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function uploadImage(data: MutationProps) {
    const response = api.post('api/images', { data }).then(res => {
      return res;
    });

    return response;
  }

  const mutation = useMutation((data: MutationProps) => uploadImage(data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm<FormAddImageInputProps>({
      resolver: yupResolver(schemaValidation),
    });

  const { errors } = formState;

  const onSubmit = async (data: FormAddImageInputProps): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
        });
      }

      await mutation.mutateAsync({
        url: imageUrl,
        title: data.title,
        description: data.description,
      });

      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
      });
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
      });
    } finally {
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          error={errors.image}
          {...register('image')}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register('title')}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register('description')}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
