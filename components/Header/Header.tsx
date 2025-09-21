'use client'

import { useState } from 'react';
import { Burger, Center, Container, Group, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

const links = [
  { label: "Services", link: "/services" },
  { label: "Projects / References", link: "/projects" },
  { label: "Careers", link: "/careers" },
  { label: "About Us", link: "/about" },
  { label: "Contact", link: "/contact" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    // const menuItems = link.links?.map((item) => (
    //   <Menu.Item key={item.link}>{item.label}</Menu.Item>
    // ));

    // if (menuItems) {
    //   return (
    //     <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
    //       <Menu.Target>
    //         <a
    //           href={link.link}
    //           className={classes.link}
    //           onClick={(event) => event.preventDefault()}
    //         >
    //           <Center>
    //             <span className={classes.linkLabel}>{link.label}</span>
    //             <IconChevronDown size={14} stroke={1.5} />
    //           </Center>
    //         </a>
    //       </Menu.Target>
    //       <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    //     </Menu>
    //   );
    // }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Link
        href="/"
      >
        <Title style={{'paddingTop': '16px'}}><Image src={'/logo.jpg'} height={85} width={250} alt='Syndeo logo'></Image></Title>
      </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  );
}