'use client';

import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Title, Text, Container, Grid, Paper, Badge, Group, Stack, Tabs, Image, SimpleGrid, List, ThemeIcon } from '@mantine/core';
import { IconBuildingSkyscraper, IconNetwork, IconFileImport, IconDeviceLaptop, IconCheck, IconTool } from '@tabler/icons-react';
import { getProjectsPageData, urlFor } from '@/lib/sanity/utils';
import { useEffect, useState } from 'react';

interface Project {
  title: string;
  client: string;
  category: string;
  description: string;
  results: string[];
  technologies: string[];
  images: any[];
  featured?: boolean;
  completionDate?: string;
  projectDuration?: string;
  teamSize?: number;
}

// Icon mapping function
function getIconComponent(iconType: string) {
  const iconMap = {
    network: IconNetwork,
    fiber: IconFileImport,
    laptop: IconDeviceLaptop,
    building: IconBuildingSkyscraper,
    tool: IconTool,
  };
  return iconMap[iconType as keyof typeof iconMap] || IconNetwork;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Paper shadow="md" radius="md" p="xl" withBorder>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
        <Stack>
          <div>
            <Group justify="space-between" mb="xs">
              <Title order={3}>{project.title}</Title>
              <Badge size="lg" variant="light">{project.category}</Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">Client: {project.client}</Text>
            <Text mb="xl">{project.description}</Text>
          </div>

          <div>
            <Title order={4} mb="sm">Key Results:</Title>
            <List
              spacing="xs"
              size="sm"
              icon={
                <ThemeIcon color="teal" size={20} radius="xl">
                  <IconCheck style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
              }
            >
              {project.results.map((result: string, index: number) => (
                <List.Item key={index}>{result}</List.Item>
              ))}
            </List>
          </div>

          <div>
            <Title order={4} mb="sm">Technologies Used:</Title>
            <Group gap="xs">
              {project.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="outline">{tech}</Badge>
              ))}
            </Group>
          </div>
        </Stack>

        <Stack>
          {project.images && project.images.length > 0 ? (
            project.images.slice(0, 3).map((image: any, index: number) => (
              <Image
                key={index}
                src={urlFor(image).width(400).height(200).url()}
                alt={`${project.title} ${index + 1}`}
                radius="md"
                style={{ maxHeight: 200 }}
              />
            ))
          ) : (
            // Fallback images
            Array.from({ length: 3 }, (_, index) => (
              <Image
                key={index}
                src={`https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s+/g, '-')}-${index + 1}/400/200`}
                alt={`${project.title} ${index + 1}`}
                radius="md"
                style={{ maxHeight: 200 }}
              />
            ))
          )}
        </Stack>
      </SimpleGrid>
    </Paper>
  );
}

export default function ProjectsPage() {

  const [data, setData] = useState();


  // Fallback data if Sanity content is not available
  const fallbackData = {
    title: 'Our Projects & References',
    subtitle: 'Showcasing our commitment to excellence through successfully delivered projects and satisfied clients across various sectors.',
    projects: [
      {
        title: 'Corporate HQ Network Infrastructure',
        client: 'Global Tech Solutions',
        category: 'Network Infrastructure',
        description: 'Complete network infrastructure deployment for a 20-story corporate headquarters, including data centers, office spaces, and collaborative areas.',
        results: [
          'Successfully connected 2000+ workstations',
          'Reduced network latency by 40%',
          'Implemented redundant systems with 99.99% uptime',
          'Achieved ISO 27001 compliance'
        ],
        technologies: ['Cisco Enterprise', 'Fiber Optics', 'CAT6A', 'Smart Building Integration'],
        images: []
      },
      {
        title: 'City-Wide Fiber Network',
        client: 'Metropolitan Council',
        category: 'Fiber Optics',
        description: 'Implementation of a comprehensive fiber optic network connecting government buildings, schools, and public facilities across the metropolitan area.',
        results: [
          'Connected 50+ government buildings',
          'Established 100GB backbone network',
          'Reduced operational costs by 35%',
          'Created public Wi-Fi zones in key areas'
        ],
        technologies: ['Fiber Optics', 'GPON', 'Metropolitan Area Network', 'Smart City Integration'],
        images: []
      },
      {
        title: 'Data Center Migration',
        client: 'Financial Services Corp',
        category: 'Data Infrastructure',
        description: 'Complete data center migration and upgrade for a major financial institution, including new structured cabling and advanced cooling systems.',
        results: [
          'Zero downtime during migration',
          'Enhanced security protocols',
          'Improved energy efficiency by 45%',
          'Increased data processing capacity by 200%'
        ],
        technologies: ['Structured Cabling', 'Power Distribution', 'Cooling Systems', 'Security Systems'],
        images: []
      }
    ],
    categories: [
      { name: 'All Projects', slug: 'all', icon: 'building' },
      { name: 'Network Infrastructure', slug: 'network', icon: 'network' },
      { name: 'Fiber Optics', slug: 'fiber', icon: 'fiber' },
      { name: 'Data Infrastructure', slug: 'data', icon: 'laptop' }
    ]
  };

  useEffect(() => {

    const fetchData = async () => {
      const projectsData = await getProjectsPageData();

      setData(projectsData || fallbackData);

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

          <Tabs defaultValue="all" variant="pills">
            <Tabs.List justify="center">
              <Tabs.Tab value="all">All Projects</Tabs.Tab>
              <Tabs.Tab value="network" leftSection={<IconNetwork size={16} />}>Network Infrastructure</Tabs.Tab>
              <Tabs.Tab value="fiber" leftSection={<IconFileImport size={16} />}>Fiber Optics</Tabs.Tab>
              <Tabs.Tab value="data" leftSection={<IconDeviceLaptop size={16} />}>Data Infrastructure</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="all" pt="xl">
              <Stack gap="xl">
                {data.projects.map((project: Project, index: number) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </Stack>
            </Tabs.Panel>

            {['network', 'fiber', 'data'].map((category) => (
              <Tabs.Panel key={category} value={category} pt="xl">
                <Stack gap="xl">
                  {data.projects
                    .filter((p: Project) => p.category.toLowerCase().includes(category))
                    .map((project: Project, index: number) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </Stack>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Stack>
      </Container>
    </>
  );
}
