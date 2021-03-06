/* eslint-disable react/no-children-prop */
import React, { useContext } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import routes from '../../../shared/constants/routes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteCollectionById } from '../../../shared/api/collectionsApi';
import { AppContext } from '../../../app/context/AppContext';
import { CardPropsType } from '../../../types';

export const CardCollection = ({
  nameCollection,
  imageSrc,
  description,
  createdAt,
  userId,
  _id,
  sendRequest,
}: CardPropsType) => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deleteCollection = async () => {
    try {
      await deleteCollectionById(_id);
      sendRequest();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card elevation={8}>
        <CardHeader
          action={
            <>
              <Tooltip title="Collection actions">
                <IconButton onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  sx={{ width: '200px' }}
                  onClick={() => {
                    navigate(`${routes.COLLECTIONS_ROOT}/${userId}/${_id}`);
                  }}
                  disableRipple
                >
                  <OpenInNewIcon sx={{ fontSize: 18, marginRight: '10px' }} />
                  <FormattedMessage id="card-collection-open" />
                </MenuItem>
                {state.isAuthorised && (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate(`${routes.COLLECTIONS_ROOT}/${userId}/edit/${_id}`);
                      }}
                      disableRipple
                    >
                      <EditIcon sx={{ fontSize: 18, marginRight: '10px' }} />
                      <FormattedMessage id="card-collection-edit" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setIsOpenDialog(true);
                      }}
                      disableRipple
                    >
                      <DeleteIcon sx={{ fontSize: 18, marginRight: '10px' }} />
                      <FormattedMessage id="card-collection-delete" />
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          }
          title={nameCollection}
          subheader={createdAt}
        />
        <CardActionArea component={NavLink} to={`${routes.COLLECTIONS_ROOT}/${userId}/${_id}`}>
          <CardMedia component="img" height="auto" image={imageSrc} alt="card image" />
          <CardContent sx={{ padding: '0' }}>
            {description && (
              <Typography sx={{ padding: '10px', fontSize: '16px' }} variant="body1">
                <ReactMarkdown children={description} />
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <FormattedMessage id="card-collction-dialog-title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="card-collction-dialog-content" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setIsOpenDialog(false)}>
            <FormattedMessage id="card-collection-cancel" />
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              deleteCollection();
              setIsOpenDialog(false);
              setAnchorEl(null);
            }}
            autoFocus
          >
            <FormattedMessage id="card-collection-delete" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
