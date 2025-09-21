'use client'

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Typography, Grid, Stack, Text, Divider, Container } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <div className={classes.footer}>
      <Container size="xl">
        <Grid py="xl">
          {/* Company Info & Contact */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text size="lg" fw={600}>Syndeo Construction</Text>
              <Text size="sm" c="dimmed">
                Building the future of telecommunications infrastructure with innovative solutions and expert craftsmanship.
              </Text>
              <Stack gap="xs">
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Anchor href="tel:+31201234567" c="dimmed" size="sm">+31 (0)20 123 4567</Anchor>
                </Group>
                <Group gap="xs">
                  <IconMail size={16} />
                  <Anchor href="mailto:info@syndeoinfra.nl" c="dimmed" size="sm">info@syndeoinfra.nl</Anchor>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text c="dimmed" size="sm">Businesspark 123, 1234 AB Amsterdam</Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack gap="md">
              <Text size="md" fw={600}>Quick Links</Text>
              <Stack gap="xs">
                {quickLinks.map((link) => (
                  <Anchor key={link.href} href={link.href} c="dimmed" size="sm">
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Legal */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack gap="md">
              <Text size="md" fw={600}>Legal</Text>
              <Stack gap="xs">
                {legalLinks.map((link) => (
                  <Anchor key={link.href} href={link.href} c="dimmed" size="sm">
                    {link.label}
                  </Anchor>
                ))}
                <Text size="xs" c="dimmed" mt="sm">
                  KvK: 12345678<br />
                  VAT: NL123456789B01
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Social Media */}
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Stack gap="md">
              <Text size="md" fw={600}>Follow Us</Text>
              <Group gap="xs">
                <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#" aria-label="Twitter">
                  <IconBrandTwitter size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#" aria-label="YouTube">
                  <IconBrandYoutube size={18} stroke={1.5} />
                </ActionIcon>
                <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#" aria-label="Instagram">
                  <IconBrandInstagram size={18} stroke={1.5} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider />
        
        <Group justify="space-between" py="md" wrap="wrap">
          <Text size="sm" c="dimmed">
            © 2025 Syndeo Construction. All rights reserved.
          </Text>
          <Group gap="md" wrap="wrap">
            <Text size="xs" c="dimmed">
              GDPR Compliant | Data Protection Certified
            </Text>
          </Group>
        </Group>
      </Container>
    </div>
  );
}