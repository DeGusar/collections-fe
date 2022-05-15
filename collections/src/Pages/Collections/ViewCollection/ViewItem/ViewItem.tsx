/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import date from 'date-and-time';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { getItemByIdItem, likesUpdate } from '../../../../shared/api/itemsApi';
import { CommentType, ItemsDataType, userType } from '../../../../types';
import { dateFormats } from '../../../../shared/constants/dataFormats';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Comments } from './Comments/Comments';
import localStorageKeys from '../../../../shared/constants/localStorageKeys';
import { AppContext } from '../../../../app/context/AppContext';
import { socket } from '../../../../App';

export const ViewItem = () => {
  const { state } = useContext(AppContext);
  const refToItem = useRef<HTMLDivElement>(null);
  const { idItem } = useParams();
  const userId = localStorage.getItem(localStorageKeys.USER_ID) as string;
  const [likes, setLikes] = useState([] as string[]);
  const [isScroll, setIsScroll] = useState(false);
  const [itemData, setItemData] = useState([] as ItemsDataType);
  const [imgUrl, setImgUrl] = useState('');
  const [tags, setTags] = useState([] as string[]);
  const [comments, setComments] = useState([] as CommentType[]);

  function connect(user: userType) {
    socket.onopen = () => {
      socket.send(JSON.stringify(user));
    };
    socket.onmessage = (even) => {
      const message = JSON.parse(even.data);
      const { event } = message[0] || message;
      switch (event) {
        case 'message':
          if (idItem === message.idItem && userId !== message.userId) {
            handleClickComment();
          }
          break;
      }
    };
  }

  useEffect(() => {
    connect({ event: 'connection', userId, idItem });
  }, [idItem]);

  const executeScroll = () => {
    if (refToItem.current) {
      refToItem.current.scrollIntoView({ block: 'center' });
    }
  };
  const getLikes = async () => {
    const { data } = await getItemByIdItem(idItem as string);
    setLikes(data.likes);
  };
  const getComments = async () => {
    const { data } = await getItemByIdItem(idItem as string);
    setComments(data.comments);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getItemByIdItem(idItem as string);
      setTags(data.tags);
      setItemData(data);
      setComments(data.comments);
      setLikes(data.likes);
    };
    getData();
    return setComments([]);
  }, [idItem]);

  useEffect(() => {
    const getImage = async (tags: string[]) => {
      try {
        const { data } = await axios.get(
          `https://api.unsplash.com/photos/random?query=${tags}&client_id=_Im-M8qZUbqaAv5OeazW9wZ-K_phlWaLcOV77Lqt2VA`
        );
        setImgUrl(data.urls.regular);
      } catch (e) {}
    };
    tags.length > 0 && getImage(tags);
    setTimeout(executeScroll, 100);
    return setImgUrl('');
  }, [tags]);

  const handleClickComment = async () => {
    await getComments();
    setIsScroll(true);
    setTimeout(() => setIsScroll(false), 100);
  };

  return (
    <Container sx={{ my: '20px' }} maxWidth="lg">
      <Card
        ref={refToItem}
        elevation={8}
        sx={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}
      >
        {imgUrl && (
          <CardMedia
            component="img"
            sx={{ height: 'auto', maxHeight: '300px', width: '40%' }}
            image={imgUrl}
            alt="Item image"
          />
        )}
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            padding: '5px 0 0 20px !important',
            flexDirection: 'column',
            justifyContent: 'start',
            rowGap: '10px',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ marginTop: '15px' }}>
            <Typography sx={{ lineHeight: '0.6' }} variant="h5">
              {itemData.nameItem}
            </Typography>
            <Typography variant="caption">
              {date.format(new Date(itemData.createdAt as Date), dateFormats.DATE)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              rowGap: '15px',
              justifyContent: 'start',
            }}
            color="text.secondary"
          >
            {itemData.additional?.map((field, i) => {
              if (field.value !== '' && field.type === ('string' || 'text')) {
                return (
                  <Typography
                    noWrap={false}
                    sx={{ width: '100%', wordWrap: 'break-word' }}
                    variant="body2"
                    color="text.secondary"
                    key={i}
                  >
                    {field.value}
                  </Typography>
                );
              } else if (field.value !== '' && field.type === 'date') {
                return (
                  <Typography key={i} sx={{ width: '100%' }} variant="body1" color="text.secondary">
                    {field.name}: {date.format(new Date(field.value as Date), dateFormats.DATE)}
                  </Typography>
                );
              }
            })}
          </Box>
          <Box sx={{ display: 'flex', columnGap: '10px' }}>
            {itemData.additional?.map((field, i) => {
              if (field.type === 'boolean') {
                return (
                  <Chip color={field.value ? 'success' : 'error'} key={i} label={field.name} />
                );
              }
            })}
          </Box>
          <CardActions
            sx={{
              padding: '5px',
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'end',
              alignSelf: 'end',
              height: '100%',
            }}
          >
            <Box sx={{ height: '100%' }}></Box>
            {state.isAuthorised && (
              <IconButton
                onClick={() => {
                  setIsScroll(true);
                  setTimeout(() => setIsScroll(false), 500);
                }}
              >
                <AddCommentIcon />
              </IconButton>
            )}
            <IconButton
              sx={{ marginLeft: '0' }}
              color={likes.includes(userId as string) ? 'error' : 'default'}
              onClick={async () => {
                if (state.isAuthorised) {
                  await likesUpdate(idItem as string, userId as string);
                  await getLikes();
                } else return;
              }}
            >
              <FavoriteIcon />
              {likes.length > 0 && (
                <Typography sx={{ marginLeft: '5px' }}>{likes.length}</Typography>
              )}
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
      {state.isAuthorised && (
        <Comments
          isScroll={isScroll}
          comments={comments}
          handleClick={() => {
            socket.send(
              JSON.stringify({
                event: 'message',
                idItem,
                userId,
              })
            );
            handleClickComment();
          }}
        ></Comments>
      )}
    </Container>
  );
};
