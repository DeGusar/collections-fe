import { Box, Button, Divider, Paper, TextareaAutosize, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CommentPropsType } from '../../../../../types';
import date from 'date-and-time';
import { dateFormats } from '../../../../../shared/constants/dataFormats';
import { AppContext } from '../../../../../app/context/AppContext';
import { useParams } from 'react-router-dom';
import { updateComments } from '../../../../../shared/api/itemsApi';

export const Comments = ({ comments, handleClick, isScroll }: CommentPropsType) => {
  const { state } = useContext(AppContext);
  const { idItem } = useParams<{ idItem: string }>();
  const intl = useIntl();
  const refToScroll = useRef<HTMLButtonElement>(null);
  const [textArea, setTextArea] = useState('');
  const scrollToComments = () => {
    if (refToScroll.current) {
      refToScroll.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  };
  useEffect(() => {
    isScroll && setTimeout(scrollToComments, 200);
  }, [isScroll]);
  return (
    <Box sx={{ padding: '0 0 100px 0' }}>
      <Paper elevation={8} sx={{ padding: '20px', width: '100%', marginTop: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          <FormattedMessage id="view-item-comments" />
        </Typography>
        <Box>
          <Divider />
          {comments.map((comment, i) => {
            return (
              <>
                <Divider key={`${comment.value} ${i}`} />
                <Box key={i} sx={{ padding: '20px 0', width: '100%', display: 'flex' }}>
                  <Box>
                    <img
                      key={`${i}${comment.value}`}
                      src="https://res.cloudinary.com/rss-collection/image/upload/v1652133370/dde3f8022939d803251bff923bf8360c_bjcpyo.jpg"
                      alt="user avatar"
                    />
                  </Box>
                  <Box key={`${i} ${comment.author}`} sx={{ marginLeft: '20px' }}>
                    <Typography
                      variant="body1"
                      key={`${comment.author}${i}`}
                      sx={{ width: '100%', wordWrap: 'break-word', lineHeight: '0.6' }}
                    >
                      {comment.author}
                    </Typography>
                    <Typography
                      key={`${comment.author} ${i}`}
                      variant="caption"
                      sx={{ width: '100%', wordWrap: 'break-word' }}
                    >
                      {date.format(new Date(comment.postedAt), `${dateFormats.TIME}`)}
                    </Typography>
                    <Typography
                      key={`${comment.value}${i}`}
                      sx={{ width: '100%', wordWrap: 'break-word', marginTop: '10px' }}
                    >
                      {comment.value}
                    </Typography>
                  </Box>
                </Box>
              </>
            );
          })}
          <Divider />
          <Box sx={{ marginTop: '30px' }}>
            <Typography>
              <FormattedMessage id="view-item-comments-create-post" />
            </Typography>
            <TextareaAutosize
              minRows={6}
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              style={{ width: '100%', resize: 'none' }}
              placeholder={intl.formatMessage({ id: 'view-item-comments-placeholder' })}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
              <Button
                ref={refToScroll}
                color="secondary"
                onClick={async () => {
                  await updateComments(idItem as string, {
                    value: textArea,
                    author: state.userName as string,
                    postedAt: new Date(),
                  });
                  setTextArea('');
                  handleClick();
                }}
              >
                <FormattedMessage id="view-item-comments-submit" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
