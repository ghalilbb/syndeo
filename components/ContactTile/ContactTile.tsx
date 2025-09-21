
'use client'

import { IconAt, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import { getContactPageData } from '@/lib/sanity/utils';
import { ContactPageData } from '@/types/contact';
import classes from './ContactTile.module.css';

const socialIcons = [
  { Icon: IconBrandTwitter, key: 'twitter' },
  { Icon: IconBrandYoutube, key: 'youtube' },
  { Icon: IconBrandInstagram, key: 'instagram' }
];

interface ContactTileProps {
  data?: ContactPageData;
}

export function ContactTile({ data: propData }: ContactTileProps) {
  const [data, setData] = useState<ContactPageData | null>(propData || null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propData) {
      const fetchData = async () => {
        try {
          const contactData = await getContactPageData();
          setData(contactData);
        } catch (error) {
          console.error('Error fetching contact data:', error);
        }
      };
      fetchData();
    }
  }, [propData]);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Name is required' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
        const responseData = await response.json();
        setError(responseData.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const icons = socialIcons.map(({ Icon, key }, index) => {
    const url = data?.socialMedia?.[key as keyof typeof data.socialMedia];
    return (
      <ActionIcon 
        key={index} 
        size={28} 
        className={classes.social} 
        variant="transparent"
        component={url ? "a" : "div"}
        href={url || undefined}
        target={url ? "_blank" : undefined}
        rel={url ? "noopener noreferrer" : undefined}
      >
        <Icon size={22} stroke={1.5} />
      </ActionIcon>
    );
  });

  return (
    <div className={classes.form_wrapper}>
        <Container>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.form_title}>
            {data?.contactTile?.title || 'Contact us'}
          </Title>
          <Text className={classes.description} mt="sm" mb={30}>
            {data?.contactTile?.description || 'Leave your email and we will get back to you within 24 hours'}
          </Text>

          <ContactIconsList data={data} />

          <Group mt="xl">{icons}</Group>
        </div>

        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('name')}
          />
          <Textarea
            required
            label="Your message"
            placeholder="Please describe your inquiry..."
            minRows={4}
            mt="md"
            radius="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('message')}
          />

          {success && (
            <Text c="green" size="sm" mt="xs">
              ✓ {data?.contactForm?.successMessage || 'Message sent successfully! We\'ll get back to you soon.'}
            </Text>
          )}

          {error && (
            <Text c="red" size="sm" mt="xs">
              {error}
            </Text>
          )}

          <Group justify="flex-end" mt="md">
            <Button 
              type="submit"
              className={classes.control} 
              radius="md"
              loading={submitting}
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send message'}
            </Button>
          </Group>
        </form>
      </SimpleGrid>
      </Container>
    </div>
  );
}

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

function createContactIconsData(data?: ContactPageData | null) {
  if (!data?.contactInfo) {
    // Default contact info if no Sanity data
    return [
      { title: 'Email', description: 'hello@mantine.dev', icon: IconAt },
      { title: 'Phone', description: '+49 (800) 335 35 35', icon: IconPhone },
      { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
      { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
    ];
  }

  const contactData = [
    { title: 'Email', description: data.contactInfo.email, icon: IconAt },
    { title: 'Phone', description: data.contactInfo.phone, icon: IconPhone },
    { title: 'Address', description: data.contactInfo.address, icon: IconMapPin },
  ];

  if (data.contactInfo.workingHours) {
    contactData.push({
      title: 'Working hours',
      description: data.contactInfo.workingHours,
      icon: IconSun,
    });
  }

  return contactData;
}

export function ContactIconsList({ data }: { data?: ContactPageData | null }) {
  const contactIconsData = createContactIconsData(data);
  const items = contactIconsData.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}