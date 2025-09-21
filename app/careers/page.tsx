'use client';

import { Title, Text, Container, Card, Group, Badge, Button, Stack, Grid, TextInput, Textarea, Select, Paper, ThemeIcon, Accordion, List, FileInput, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { IconBriefcase, IconMail, IconSend, IconTool, IconChartBar, IconCode, IconBuildingSkyscraper } from '@tabler/icons-react';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { getCareersPageData } from '@/lib/sanity/utils';
import { useEffect, useState } from 'react';

interface JobPosition {
  title: string;
  type: string;
  experience: string;
  location: string;
  department?: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  benefits?: string[];
  icon: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };
  featured?: boolean;
  urgent?: boolean;
  applicationDeadline?: string;
  order?: number;
}

// Icon mapping function
function getIconComponent(iconType: string) {
  const iconMap = {
    tool: IconTool,
    chart: IconChartBar,
    code: IconCode,
    building: IconBuildingSkyscraper,
    briefcase: IconBriefcase,
  };
  return iconMap[iconType as keyof typeof iconMap] || IconBriefcase;
}

interface JobPosition {
  title: string;
  type: string;
  experience: string;
  location: string;
  department?: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  benefits?: string[];
  icon: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
  };
  featured?: boolean;
  urgent?: boolean;
  applicationDeadline?: string;
  order?: number;
}

function JobCard({ position }: { position: JobPosition }) {
  const Icon = getIconComponent(position.icon);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="md">
        <ThemeIcon size="xl" color="blue" variant="light">
          <Icon style={{ width: rem(24), height: rem(24) }} />
        </ThemeIcon>
        <div>
          <Title order={3} size="h4">{position.title}</Title>
          <Group gap="xs" mt={4}>
            <Badge color="blue">{position.type}</Badge>
            <Badge color="teal">{position.experience}</Badge>
            <Badge color="grape">{position.location}</Badge>
            {position.urgent && <Badge color="red">Urgent</Badge>}
            {position.featured && <Badge color="yellow">Featured</Badge>}
          </Group>
        </div>
      </Group>

      <Text size="sm" mb="md">{position.description}</Text>

      <Accordion variant="separated">
        <Accordion.Item value="requirements">
          <Accordion.Control>Requirements</Accordion.Control>
          <Accordion.Panel>
            <List size="sm">
              {position.requirements.map((req: string, index: number) => (
                <List.Item key={index}>{req}</List.Item>
              ))}
            </List>
          </Accordion.Panel>
        </Accordion.Item>
        {position.responsibilities && position.responsibilities.length > 0 && (
          <Accordion.Item value="responsibilities">
            <Accordion.Control>Key Responsibilities</Accordion.Control>
            <Accordion.Panel>
              <List size="sm">
                {position.responsibilities.map((resp: string, index: number) => (
                  <List.Item key={index}>{resp}</List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {position.benefits && position.benefits.length > 0 && (
          <Accordion.Item value="benefits">
            <Accordion.Control>Benefits & Perks</Accordion.Control>
            <Accordion.Panel>
              <List size="sm">
                {position.benefits.map((benefit: string, index: number) => (
                  <List.Item key={index}>{benefit}</List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>

      {position.salary && (
        <Text size="sm" mt="md" c="dimmed">
          Salary: {position.salary.currency || 'EUR'} {position.salary.min ? `${position.salary.min.toLocaleString()}` : ''}{position.salary.max && position.salary.min ? ` - ${position.salary.max.toLocaleString()}` : ''} {position.salary.period ? `per ${position.salary.period}` : ''}
        </Text>
      )}

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        rightSection={<IconSend size={14} />}
        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Apply Now
      </Button>
    </Card>
  );
}

function ApplicationForm({ formConfig, positions }: { formConfig?: any; positions: JobPosition[] }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null as File | null,
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Name is required' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => value.trim().length < 5 ? 'Valid phone number is required' : null,
      position: (value) => !value ? 'Please select a position' : null,
      resume: (value: File | null) => {
        if (!value) return 'Resume is required';
        const maxSize = (formConfig?.maxFileSize || 5) * 1024 * 1024;
        if (value.size > maxSize) return `File size must be less than ${formConfig?.maxFileSize || 5}MB`;
        return null;
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    if (!form.isValid()) {
      setSubmitting(false);
      return;
    }
    const values = form.values;
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('position', values.position);
    formData.append('experience', values.experience);
    formData.append('message', values.message);
    if (values.resume) {
      formData.append('resume', values.resume);
    }
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit application');
      }
    } catch (err) {
      setError('Failed to submit application');
    }
    setSubmitting(false);
  };

  const availablePositions = positions.map((p: JobPosition) => ({
    value: p.title,
    label: p.title,
  }));

  const acceptedFileTypes = formConfig?.acceptedFileTypes?.join(',') || '.pdf,.doc,.docx';

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder id="application-form">
      <Title order={3} mb="md">{formConfig?.title || 'Apply Now'}</Title>
      {formConfig?.description && (
        <Text size="sm" c="dimmed" mb="md">{formConfig.description}</Text>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              required
              label="Full Name"
              placeholder="Your name"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              required
              label="Phone"
              placeholder="Your phone number"
              {...form.getInputProps('phone')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              required
              label="Position"
              placeholder="Select position"
              data={availablePositions}
              searchable
              maxDropdownHeight={400}
              nothingFoundMessage="No positions match your search"
              {...form.getInputProps('position')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Years of Experience"
              placeholder="e.g., 5 years"
              {...form.getInputProps('experience')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <FileInput
              required
              label="Resume/CV"
              placeholder={`Upload your resume (${acceptedFileTypes}, max ${formConfig?.maxFileSize || 5}MB)`}
              accept={acceptedFileTypes}
              leftSection={<IconUpload size={14} />}
              {...form.getInputProps('resume')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Cover Letter"
              placeholder="Tell us about yourself and why you're interested in this position"
              minRows={4}
              {...form.getInputProps('message')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              type="submit"
              fullWidth
              leftSection={<IconSend size={14} />}
              loading={submitting}
              disabled={submitting}
            >
              {formConfig?.submitButtonText || 'Submit Application'}
            </Button>
          </Grid.Col>
        </Grid>
        {success && (
          <Text mt="md" c="green">Application submitted successfully!</Text>
        )}
        {error && (
          <Text mt="md" c="red">{error}</Text>
        )}
      </form>
    </Paper>
  );
}

interface CareersData {
  title: string;
  subtitle: string;
  jobPositions: JobPosition[];
  applicationForm?: any;
}

export default function CareersPage() {
  const [data, setData] = useState<CareersData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data if Sanity content is not available
  const fallbackData = {
    title: 'Join Our Team',
    subtitle: 'Be part of a dynamic team building the future of telecommunications infrastructure. We offer competitive benefits, professional growth, and exciting projects.',
    jobPositions: [
      {
        title: 'Fiber Optic Technician',
        type: 'Full-time',
        experience: '2-5 years',
        location: 'Netherlands',
        description: 'Join our team of skilled technicians responsible for installing and maintaining fiber optic networks. Work with cutting-edge technology and contribute to building the infrastructure of tomorrow.',
        requirements: [
          'Experience with fiber optic installation and maintenance',
          'Knowledge of fiber testing and troubleshooting',
          'Valid driver\'s license',
          'Ability to work independently and in teams',
          'Safety-conscious mindset'
        ],
        icon: 'tool'
      },
      {
        title: 'Project Supervisor',
        type: 'Full-time',
        experience: '5+ years',
        location: 'Netherlands',
        description: 'Lead and oversee telecommunications infrastructure projects from inception to completion. Manage teams, coordinate with stakeholders, and ensure project success.',
        requirements: [
          'Proven experience in project supervision',
          'Strong leadership and communication skills',
          'Technical knowledge of telecommunications infrastructure',
          'Project management certification is a plus',
          'Experience with project planning tools'
        ],
        icon: 'chart'
      },
      {
        title: 'Network Infrastructure Engineer',
        type: 'Full-time',
        experience: '3-7 years',
        location: 'Netherlands',
        description: 'Design and implement complex network infrastructure solutions for our clients. Work on cutting-edge projects and help shape the future of connectivity.',
        requirements: [
          'Bachelor\'s degree in relevant field',
          'Experience with network design and implementation',
          'Knowledge of current industry standards and technologies',
          'Strong problem-solving skills',
          'Certification in relevant technologies (Cisco, etc.)'
        ],
        icon: 'code'
      }
    ],
    applicationForm: {
      title: 'Apply Now',
      submitButtonText: 'Submit Application',
      maxFileSize: 5,
      acceptedFileTypes: ['.pdf', '.doc', '.docx']
    }
  };

  useEffect(() => {
    getCareersPageData()
      .then((careersData) => {
        setData(careersData || fallbackData);
      })
      .catch(() => {
        setData(fallbackData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
          <SectionTitle title="Loading..." subtitle="Please wait while we load the careers information." />
    );
  }

  if (!data) {
    return (
        <Stack gap="xl">
          <SectionTitle title="Error" subtitle="Unable to load careers information. Please try again later." />
        </Stack>
    );
  }

  return (
      <Stack gap="xl">
        <SectionTitle title={data.title} subtitle={data.subtitle} />
    <Container size="xl" py="xl">

        <Grid>
          {data.jobPositions.map((position: JobPosition, index: number) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <JobCard position={position} />
            </Grid.Col>
          ))}
        </Grid>

        <ApplicationForm 
          formConfig={data.applicationForm} 
          positions={data.jobPositions} 
        />
    </Container>

      </Stack>
  );
}
