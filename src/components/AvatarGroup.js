import * as React from 'react';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const SPACINGS = {
  small: -16,
  medium: null,
};

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
  },
  /* Styles applied to the avatar elements. */
  avatar: {
    border: `2px solid ${theme.palette.background.default}`,
    marginLeft: -8,
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const AvatarGroup = React.forwardRef(function AvatarGroup(props, ref) {
  const {
    children: childrenProp,
    classes,
    className,
    max = 5,
    spacing = 'medium',
    ...other
  } = props;
  const clampedMax = max < 2 ? 2 : max;

  const children = React.Children.toArray(childrenProp).filter((child) => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: The AvatarGroup component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    return React.isValidElement(child);
  });

  const extraAvatars = children.length > clampedMax ? children.length - clampedMax + 1 : 0;

  const marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing;

  return (
    <div className={clsx(classes.root, className)} ref={ref} {...other}>
      {children.slice(0, children.length - extraAvatars).map((child, index) => {
        return React.cloneElement(child, {
          className: clsx(child.props.className, classes.avatar),
          style: {
            zIndex: children.length - index,
            marginLeft: index === 0 ? undefined : marginLeft,
            ...child.props.style,
          },
        });
      })}
      {extraAvatars ? (
        <Tooltip
          title={props.extraavatarstooltiptitle}
        >
        <Avatar
          className={classes.avatar}
          style={{
            zIndex: 0,
            marginLeft,
            borderRadius: 10, 
            width: 120, 
            height: 150
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+{extraAvatars}
        </Avatar>
        </Tooltip>
      ) : null}
    </div>
  );
});



export default withStyles(styles, { name: 'MuiAvatarGroup' })(AvatarGroup);