import { Characteristic } from "@/components/Charecteristic/Characteristic";
import { ContactTile } from "@/components/ContactTile/ContactTile";
import { Hero } from "@/components/Hero/Hero";
import { Container, Title, Text, Stack } from '@mantine/core';

export default function Home() {

  const title = 'A fully featured React components library';
  const subTitle = 'some some title to fill space just like Loere epsum'

  return (
    <main>
      <section>
        <Hero title={title} subtitle={subTitle}/>
      </section>
      <section>
        <Container size={700} py={32}>
          <Stack align="center" gap="xs">
            <Title order={2} ta="center">Welcome to Syndeo Construction</Title>
            <Text ta="center" size="lg">
              Syndeo Construction is a leading provider of innovative building solutions, specializing in commercial, residential, and industrial projects. With decades of experience, our team is dedicated to delivering quality craftsmanship, sustainable practices, and exceptional client service. From concept to completion, we build spaces that inspire and endure.
            </Text>
          </Stack>
        </Container>
      </section>
      <section>
        <Characteristic/>
      </section>
      <section>
        <ContactTile/>
      </section>
    </main>
  );
}
