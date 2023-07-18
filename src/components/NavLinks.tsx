import React from 'react';
import { createStyles, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.white,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: '#2c2f3a',
    }),
  },
}));

const NavLinks = ({ postAction }: { postAction?: () => void }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const nav = (to: string) => () => {
    if (postAction) postAction();
    navigate(to);
  };

  return (
    <>
      <div className={classes.link} onClick={nav('/')}>
        Home
      </div>
      <div className={classes.link} onClick={nav('/about')}>
        About
      </div>
    </>
  );
};

export default NavLinks;
