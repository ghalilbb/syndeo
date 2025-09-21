'use client';

import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Title, Text, Container, Paper, Image, List, ThemeIcon, Stack, Group, rem } from '@mantine/core';
import { IconNetwork, IconFileImport, IconPlug, IconBuildingBridge, IconTool, IconCheck } from '@tabler/icons-react';
import { getServicesPageData, urlFor } from '@/lib/sanity/utils';
import { useEffect, useState } from 'react';
import { ContactTile } from '@/components/ContactTile/ContactTile';

interface ServiceSectionProps {
  title: string;
  description: string;
  applications: string[];
  icon: typeof IconNetwork;
  images: any[];
  imagePosition: 'left' | 'right';
}

// Icon mapping function
function getIconComponent(iconType: string) {
  const iconMap = {
    network: IconNetwork,
    fiber: IconFileImport,
    plug: IconPlug,
    bridge: IconBuildingBridge,
    tool: IconTool,
  };
  return iconMap[iconType as keyof typeof iconMap] || IconNetwork;
}

function ServiceSection({ title, description, applications, icon: Icon, images, imagePosition }: ServiceSectionProps) {
  const IconComponent = Icon;
  const content = (
    <Stack style={{ flex: 1 }} py="xl" px="md">
      <Group>
        <ThemeIcon size="xl" variant="light" color="blue">
          <IconComponent style={{ width: rem(24), height: rem(24) }} />
        </ThemeIcon>
        <Title order={2} size="h3">{title}</Title>
      </Group>

      <Text size="md" mt="md">
        {description}
      </Text>

      <Title order={3} size="h4" mt="xl" mb="xs">Key Applications:</Title>
      <List
        spacing="sm"
        size="md"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCheck style={{ width: rem(14), height: rem(14) }} />
          </ThemeIcon>
        }
      >
        {applications.map((app: string, index: number) => (
          <List.Item key={index}>{app}</List.Item>
        ))}
      </List>
    </Stack>
  );

  const imageSection = (
    <Group align="flex-start" style={{ flex: 1, position: 'relative', minHeight: 400, padding: '20px' }}>
      {images && images.length > 0 && (
        <>
          <Image
            src={images[0] ? urlFor(images[0]).width(400).height(300).url() : `https://picsum.photos/seed/${title.toLowerCase()}-1/400/300`}
            alt={`${title} 1`}
            radius="md"
            style={{
              width: '60%',
              position: 'absolute',
              top: '0%',
              left: imagePosition === 'left' ? '0%' : '40%',
              zIndex: 3,
            }}
          />
          {images[1] && (
            <Image
              src={urlFor(images[1]).width(400).height(300).url()}
              alt={`${title} 2`}
              radius="md"
              style={{
                width: '50%',
                position: 'absolute',
                top: '30%',
                left: imagePosition === 'left' ? '25%' : '15%',
                zIndex: 2,
              }}
            />
          )}
          {images[2] && (
            <Image
              src={urlFor(images[2]).width(400).height(300).url()}
              alt={`${title} 3`}
              radius="md"
              style={{
                width: '45%',
                position: 'absolute',
                top: '15%',
                left: imagePosition === 'left' ? '50%' : '0%',
                zIndex: 1,
              }}
            />
          )}
        </>
      )}
      {(!images || images.length === 0) && (
        <>
          <Image
            src={`https://picsum.photos/seed/${title.toLowerCase()}-1/400/300`}
            alt={`${title} 1`}
            radius="md"
            style={{
              width: '60%',
              position: 'absolute',
              top: '0%',
              left: imagePosition === 'left' ? '0%' : '40%',
              zIndex: 3,
            }}
          />
          <Image
            src={`https://picsum.photos/seed/${title.toLowerCase()}-2/400/300`}
            alt={`${title} 2`}
            radius="md"
            style={{
              width: '50%',
              position: 'absolute',
              top: '30%',
              left: imagePosition === 'left' ? '25%' : '15%',
              zIndex: 2,
            }}
          />
          <Image
            src={`https://picsum.photos/seed/${title.toLowerCase()}-3/400/300`}
            alt={`${title} 3`}
            radius="md"
            style={{
              width: '45%',
              position: 'absolute',
              top: '15%',
              left: imagePosition === 'left' ? '50%' : '0%',
              zIndex: 1,
            }}
          />
        </>
      )}
    </Group>
  );

  return (
    <Paper shadow="sm" radius="lg" withBorder>
      <Group wrap="nowrap" gap={0}>
        {imagePosition === 'left' ? <>{imageSection}{content}</> : <>{content}{imageSection}</>}
      </Group>
    </Paper>
  );
}

export default function ServicesPage() {

  const [data, setData] = useState();


  // Fallback data if Sanity content is not available
  const fallbackData = {
    title: 'Our Services',
    subtitle: 'Comprehensive telecommunications and infrastructure solutions for modern businesses',
    services: [
      {
        title: 'Network Infrastructure',
        description: 'Design and implementation of robust, scalable network infrastructure solutions tailored to modern business needs.',
        applications: [
          'Enterprise network design and deployment',
          'Wireless network solutions',
          'Network security implementation',
          'Performance optimization'
        ],
        icon: 'network',
        images: [],
        imagePosition: 'right' as const
      },
      {
        title: 'Fiber Optics',
        description: 'State-of-the-art fiber optic solutions for high-speed, reliable data transmission across any distance.',
        applications: [
          'Fiber optic cable installation',
          'FTTH (Fiber to the Home) deployment',
          'Optical network testing',
          'Fiber splicing and termination'
        ],
        icon: 'fiber',
        images: [],
        imagePosition: 'left' as const
      },
      {
        title: 'Data Cabling',
        description: 'Comprehensive structured cabling solutions for efficient and organized data network infrastructure.',
        applications: [
          'Structured cabling design',
          'Cat5e/Cat6/Cat6A installation',
          'Cable management systems',
          'Network rack organization'
        ],
        icon: 'plug',
        images: [],
        imagePosition: 'right' as const
      },
      {
        title: 'Civil Engineering',
        description: 'Expert civil engineering services for telecommunications and network infrastructure projects.',
        applications: [
          'Underground cable routing',
          'Duct bank installation',
          'Site surveys and planning',
          'Permit acquisition management'
        ],
        icon: 'bridge',
        images: [],
        imagePosition: 'left' as const
      },
      {
        title: 'Maintenance & Emergency Service',
        description: '24/7 maintenance and emergency support services to ensure continuous network operation.',
        applications: [
          'Preventive maintenance',
          'Emergency repair services',
          'Network monitoring',
          'Performance optimization'
        ],
        icon: 'tool',
        images: [],
        imagePosition: 'right' as const
      }
    ]
  };

  useEffect(() => {

    const fetchData = async () => {
      const servicesData = await getServicesPageData();

      setData(servicesData || fallbackData);

    };

    fetchData();

  }, []);

  if (!data)
    return '';


  return (
    <>
      <SectionTitle title={data.title} subtitle={data.subtitle} />
      <Container size="xl" py="xl">
        <Stack gap="xl">

          <Stack gap="xl">
            {data.services.map((service: any, index: number) => (
              <ServiceSection
                key={index}
                title={service.title}
                description={service.description}
                applications={service.applications}
                icon={getIconComponent(service.icon)}
                images={service.images}
                imagePosition={service.imagePosition}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
      <section>
        <ContactTile />
      </section>
    </>
  );
}
