import { Container, Text, Title } from '@mantine/core';
import classes from './SectionTitle.module.css';

export function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.content}>
          <Title className={classes.title}>
            {title}
          </Title>
          {
            subtitle ?
              <Text className={classes.description} mt={30}>
                {subtitle}
              </Text> : ''
          }

        </div>
      </Container>
    </div>
  );
}