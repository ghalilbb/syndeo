'use client';

import { useState } from 'react';
import { Title, Text, Paper, Stack, TextInput, Textarea, Button, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';

interface ContactFormProps {
  formData: {
    formTitle: string;
    formDescription: string;
    successMessage: string;
  };
}

export default function ContactForm({ formData }: ContactFormProps) {
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
        <Title order={3}>{formData.formTitle}</Title>
        <Text size="sm" c="dimmed" mt={4}>
          {formData.formDescription}
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
              ✓ {formData.successMessage}
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
