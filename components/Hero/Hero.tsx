import { Button, Container, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero({title, subtitle}: {title: string, subtitle?: string}) {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            {
                title ? <Title className={classes.title}>
                    A fully featured
                    React components library
                </Title> : ''
            }
            {
                subtitle ? 
                <Text className={classes.description} mt={30}>
                    Build fully functional accessible web applications with ease – Mantine includes more
                    than 100 customizable components and hooks to cover you in any situation
                </Text> : ''
            }
            
          </div>
        </div>
      </Container>
    </div>
  );
}