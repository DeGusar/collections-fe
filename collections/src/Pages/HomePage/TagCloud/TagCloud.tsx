import { useContext } from 'react';
import { TagCloud } from 'react-tagcloud';
import { AppContext } from '../../../app/context/AppContext';
import { TagType, TagTypeProps } from '../../../types';
import { useStyles } from './styles';

const options = {
  luminosity: 'dark',
  hue: 'red, brown',
};

export const TagsCloud = ({ tags, handleClick }: TagTypeProps) => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={tags}
      className={classes.tagCloud}
      colorOptions={options}
      onClick={(tag: TagType) => handleClick(tag)}
    />
  );
};
