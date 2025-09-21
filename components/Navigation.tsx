import { NavLink, Stack } from '@mantine/core';

export function Navigation() {
  return (
    <Stack px="md" py="lg" style={{ minWidth: 220, borderRight: '1px solid #eee', height: '100%' }}>
      <NavLink label="Home" href="/" />
      <NavLink label="About Us" href="/about" />
      <NavLink label="Services" href="/services" />
      <NavLink label="Projects / References" href="/projects" />
      <NavLink label="Careers" href="/careers" />
      <NavLink label="Contact" href="/contact" />
    </Stack>
  );
}
