'use client';

import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { getContactPageData } from '@/lib/sanity/utils';
import { ContactPageData, ContactInfo } from '@/types/contact';
import { Title, Text, Container, Grid, Paper, Stack, Group, ThemeIcon, Anchor, TextInput, Textarea, Button, SimpleGrid, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPhone, IconMail, IconMapPin, IconBuilding, IconBuildingBank, IconSend } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

function ContactForm({ formData }: { formData?: ContactPageData['contactForm'] }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Name is required' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      subject: (value) => value.trim().length < 2 ? 'Subject is required' : null,
      message: (value) => value.trim().length < 10 ? 'Message must be at least 10 characters' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper shadow="md" radius="lg" p="xl" withBorder>
      <div>
        <Title order={3}>{formData?.formTitle || 'Send us a Message'}</Title>
        <Text size="sm" c="dimmed" mt={4}>
          {formData?.formDescription || 'Fill out the form below and we\'ll get back to you as soon as possible.'}
        </Text>
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" mt="xl">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps('name')}
            />
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <TextInput
            required
            label="Subject"
            placeholder="How can we help?"
            {...form.getInputProps('subject')}
          />

          <Textarea
            required
            label="Message"
            placeholder="Please describe your inquiry..."
            minRows={4}
            {...form.getInputProps('message')}
          />

          <Button
            type="submit"
            leftSection={<IconSend size={14} />}
            loading={submitting}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>

          {success && (
            <Text c="green" size="sm" mt="xs">
              ✓ {formData?.successMessage || 'Message sent successfully! We\'ll get back to you soon.'}
            </Text>
          )}

          {error && (
            <Text c="red" size="sm" mt="xs">
              {error}
            </Text>
          )}
        </Stack>
      </form>
    </Paper>
  );
}

function ContactCard({ info }: { info: ContactInfo }) {
  const Icon = info.icon;
  const content = info.link ? (
    <Anchor href={info.link} c="dimmed" style={{ textDecoration: 'none' }}>
      {info.description}
    </Anchor>
  ) : (
    <Text c="dimmed">{info.description}</Text>
  );

  return (
    <Group wrap="nowrap" gap="md">
      <ThemeIcon size="lg" variant="light" color="blue">
        <Icon style={{ width: '20px', height: '20px' }} />
      </ThemeIcon>
      <div>
        <Text size="sm" fw={500}>{info.title}</Text>
        {content}
      </div>
    </Group>
  );
}

function GoogleMap({ mapSettings }: { mapSettings?: ContactPageData['mapSettings'] }) {
  const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5444834863435!2d4.8986228!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM_KApzIyJzEyLjgiTiA0wrA1Myc1NS4wIkU!5e0!3m2!1sen!2snl!4v1630000000000!5m2!1sen!2snl";

  return (
    <Box
      component="iframe"
      src={mapSettings?.embedUrl || defaultMapUrl}
      style={{
        border: 0,
        width: '100%',
        height: `${mapSettings?.mapHeight || 400}px`,
        borderRadius: '12px'
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

function createContactInfo(contactInfo?: ContactPageData['contactInfo']): ContactInfo[] {
  if (!contactInfo) {
    // Default contact info if no Sanity data
    return [
      {
        icon: IconPhone,
        title: 'Phone',
        description: '+31 (0)20 123 4567',
        link: 'tel:+31201234567'
      },
      {
        icon: IconMail,
        title: 'Email',
        description: 'info@syndeoinfra.nl',
        link: 'mailto:info@syndeoinfra.nl'
      },
      {
        icon: IconMapPin,
        title: 'Address',
        description: 'Businesspark 123, 1234 AB Amsterdam, Netherlands'
      },
      {
        icon: IconBuildingBank,
        title: 'Chamber of Commerce',
        description: 'KvK: 12345678'
      },
      {
        icon: IconBuilding,
        title: 'VAT Number',
        description: 'NL123456789B01'
      }
    ];
  }

  const items: ContactInfo[] = [
    {
      icon: IconPhone,
      title: 'Phone',
      description: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, '')}`
    },
    {
      icon: IconMail,
      title: 'Email',
      description: contactInfo.email,
      link: `mailto:${contactInfo.email}`
    },
    {
      icon: IconMapPin,
      title: 'Address',
      description: contactInfo.address
    }
  ];

  if (contactInfo.chamberOfCommerce) {
    items.push({
      icon: IconBuildingBank,
      title: 'Chamber of Commerce',
      description: `KvK: ${contactInfo.chamberOfCommerce}`
    });
  }

  if (contactInfo.vatNumber) {
    items.push({
      icon: IconBuilding,
      title: 'VAT Number',
      description: contactInfo.vatNumber
    });
  }

  return items;
}

export default function ContactPage() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData = await getContactPageData();
        setData(contactData);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container size="xl" py={40}>
        <Title ta="center">Loading...</Title>
      </Container>
    );
  }

  const contactInfo = createContactInfo(data?.contactInfo);

  return (
    <>
      <SectionTitle title={data?.title || 'Contact Us'} subtitle={data?.description} />

      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="md" radius="lg" p="xl" withBorder h="100%">
                <Stack gap="lg">
                  {contactInfo.map((info, index) => (
                    <ContactCard key={index} info={info} />
                  ))}
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box h="100%">
                <GoogleMap mapSettings={data?.mapSettings} />
              </Box>
            </Grid.Col>
          </Grid>

          <ContactForm formData={data?.contactForm} />
        </Stack>
      </Container>
    </>
  );
}
