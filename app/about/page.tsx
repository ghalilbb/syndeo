'use client';

import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Title, Text, Container, Card, Group, List, ThemeIcon, Divider, Badge, Stack, Image } from '@mantine/core';
import { IconCertificate, IconShieldCheck, IconUsersGroup, IconLeaf } from '@tabler/icons-react';
import { getAboutPageData, urlFor } from '@/lib/sanity/utils';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  
  // Fallback data if Sanity content is not available
  const fallbackData = {
    title: 'About Us',
    companyBackground: {
      title: 'Company Background',
      description: 'Syndeo Construction has been a trusted name in the industry for over 25 years, delivering high-quality projects across commercial, residential, and industrial sectors. Our commitment to excellence and innovation drives every aspect of our work.',
      image: null
    },
    mission: {
      title: 'Mission',
      description: 'To build sustainable, inspiring spaces that exceed client expectations and contribute positively to communities.',
      image: null
    },
    vision: {
      title: 'Vision',
      description: 'To be the leading construction partner recognized for quality, integrity, and innovation in every project we undertake.',
      image: null
    },
    certifications: {
      title: 'Certifications',
      description: '',
      image: null,
      certificationsList: [
        'ISO 9001: Quality Management',
        'ISO 14001: Environmental Management',
        'CO2 Performance Ladder'
      ]
    },
    safetyStandards: {
      title: 'Safety Standards',
      description: 'We adhere to strict safety protocols and industry standards to ensure the well-being of our team and stakeholders on every site.',
      image: null
    },
    experience: {
      title: 'Experience',
      description: 'Over 25 years of expertise in delivering complex construction projects, with a portfolio spanning commercial, residential, and industrial developments.',
      image: null
    },
    partnerships: {
      title: 'Partnerships & Quality Marks',
      description: 'We collaborate with leading industry partners and hold recognized quality marks, including:',
      image: null,
      qualityMarks: [
        { name: 'ISO 9001', color: 'blue' },
        { name: 'ISO 14001', color: 'green' },
        { name: 'CO2 Performance Ladder', color: 'gray' }
      ]
    }
  };

  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const aboutData = await getAboutPageData();
      setData(aboutData || fallbackData)
    }

    getData();
  }, []);

  const title = 'About us';

  if (!data) 
    return '';

  return (
    <>
      <div>
        <SectionTitle title={title} />
      </div>
      <Container size="xl" py={40}>
        <Stack gap="xl">
          {/* Company Background */}
          <Card shadow="md" radius="md" p="lg">
            <Group justify="space-between" align="center" wrap="nowrap">
              <Stack>
                <Title order={2} size="h3" mb="xs">{data.companyBackground.title}</Title>
                <Text>{data.companyBackground.description}</Text>
              </Stack>
              <Image 
                src={data.companyBackground.image ? urlFor(data.companyBackground.image).width(150).height(90).url() : "https://picsum.photos/seed/company/150/90"} 
                alt="Company background" 
                radius="md" 
                w={150} 
                h={90} 
                fit="cover" 
              />
            </Group>
          </Card>

          {/* Mission & Vision */}
          <Group grow>
            <Card shadow="sm" radius="md" p="md">
              <Title order={3} size="h4" mb="xs">{data.mission.title}</Title>
              <Image 
                src={data.mission.image ? urlFor(data.mission.image).width(600).height(180).url() : "https://picsum.photos/seed/mission/600/180"} 
                alt="Mission" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <Text>{data.mission.description}</Text>
            </Card>
            <Card shadow="sm" radius="md" p="md">
              <Title order={3} size="h4" mb="xs">{data.vision.title}</Title>
              <Image 
                src={data.vision.image ? urlFor(data.vision.image).width(600).height(180).url() : "https://picsum.photos/seed/vision/600/180"} 
                alt="Vision" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <Text>{data.vision.description}</Text>
            </Card>
          </Group>

          <Divider label="Our Credentials" labelPosition="center" my="lg" />

          {/* Certifications & Safety */}
          <Group grow>
            <Card shadow="sm" radius="md" p="md">
              <Group align="center" mb="xs">
                <ThemeIcon color="blue" variant="light" size="lg"><IconCertificate size={20} /></ThemeIcon>
                <Title order={4} size="h5">{data.certifications.title}</Title>
              </Group>
              <Image 
                src={data.certifications.image ? urlFor(data.certifications.image).width(600).height(180).url() : "https://picsum.photos/seed/certifications/600/180"} 
                alt="Certifications" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <List spacing="xs" size="sm">
                {data.certifications.certificationsList?.map((cert: string, index: number) => (
                  <List.Item key={index} icon={<ThemeIcon color="blue" size={16} radius="xl"><IconCertificate size={14} /></ThemeIcon>}>
                    {cert}
                  </List.Item>
                ))}
              </List>
            </Card>
            <Card shadow="sm" radius="md" p="md">
              <Group align="center" mb="xs">
                <ThemeIcon color="green" variant="light" size="lg"><IconShieldCheck size={20} /></ThemeIcon>
                <Title order={4} size="h5">{data.safetyStandards.title}</Title>
              </Group>
              <Image 
                src={data.safetyStandards.image ? urlFor(data.safetyStandards.image).width(600).height(180).url() : "https://picsum.photos/seed/safety/600/180"} 
                alt="Safety Standards" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <Text>{data.safetyStandards.description}</Text>
            </Card>
          </Group>

          <Divider label="Experience & Partnerships" labelPosition="center" my="lg" />

          {/* Experience & Partnerships */}
          <Group grow>
          {data.experience ?

            <Card shadow="sm" radius="md" p="md">
              <Group align="center" mb="xs">
                <ThemeIcon color="orange" variant="light" size="lg"><IconUsersGroup size={20} /></ThemeIcon>
                <Title order={4} size="h5">{data.experience.title}</Title>
              </Group>
              <Image 
                src={data.experience.image ? urlFor(data.experience.image).width(600).height(180).url() : "https://picsum.photos/seed/experience/600/180"} 
                alt="Experience" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <Text>{data.experience.description}</Text>
            </Card>
            : ''
          }
            {data.partnerships ?
            <Card shadow="sm" radius="md" p="md">
              <Group align="center" mb="xs">
                <ThemeIcon color="teal" variant="light" size="lg"><IconLeaf size={20} /></ThemeIcon>
                <Title order={4} size="h5">{data.partnerships.title}</Title>
              </Group>
              <Image 
                src={data.partnerships.image ? urlFor(data.partnerships.image).width(600).height(180).url() : "https://picsum.photos/seed/partnership/600/180"} 
                alt="Partnerships & Quality Marks" 
                radius="md" 
                w="100%" 
                fit="cover" 
                mb="xs" 
              />
              <Text>{data.partnerships.description}</Text>
              <Group mt="xs">
                {data.partnerships.qualityMarks?.map((mark: any, index: number) => (
                  <Badge key={index} color={mark.color || 'blue'} variant="light">{mark.name}</Badge>
                ))}
              </Group>
            </Card>
            : ''
            }
          </Group>
        </Stack>
      </Container>
    </>
  );
}
