import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

export const EmailTemplate = ({
  preview,
  title,
  detail,
  supportEmail = 'support@orion.com',
  appUrl = 'https://localhost:3000/home',
}: {
  preview: string;
  title: string;
  detail: string;
  supportEmail?: string;
  appUrl?: string;
}) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Container
        style={{
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #eee',
          boxShadow: '0 5px 10px rgba(20,50,70,.2)',
          marginTop: '30px',
          padding: '0px 0 50px',
        }}
      >
        {/* Header */}
        <Container
          style={{
            backgroundColor: '#f97316',
            padding: '24px 16px',
            textAlign: 'center',
          }}
        >
          <Heading
            style={{
              margin: 0,
              fontSize: '32px',
              color: '#ffffff',
              lineHeight: '1.2',
            }}
          >
            Orion
          </Heading>
        </Container>

        {/* title */}
        <Text
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#333333',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          {title}
        </Text>

        {/* detail */}
        <Text
          style={{
            padding: '0 16px 24px',
            fontSize: '12px',
            color: '#555555',
          }}
        >
         {detail}
        </Text>

        {/* <Row style={{ padding: '16px 34px 24px' }}>
          <Column
            style={{
              width: '50%',
              color: '#777777',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {sessionImage && (
              <Img
                src={sessionImage}
                alt={sessionName}
                width="100"
                height="90"
                style={{
                  borderRadius: '4px',
                  marginRight: '12px',
                  display: 'block',
                }}
              />
            )}
          </Column>
          <Column
            style={{
              width: '50%',
              color: '#777777',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            <Text
              style={{
                fontSize: '13px',
                color: '#333333',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {sessionName}
            </Text>
            <Text
              style={{
                fontSize: '13px',
                color: '#333333',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Amount: {price}฿
            </Text>
            <Text
              style={{
                fontSize: '13px',
                color: '#333333',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Purchased At: {purchaseDate}
            </Text>
          </Column>
        </Row> */}
        {/* Button */}
        <Container style={{ padding: '10px 16px 32px', textAlign: 'center' }}>
          <Button
            href={appUrl}
            style={{
              backgroundColor: '#f97316',
              color: '#ffffff',
              fontSize: '16px',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Visit Orion
          </Button>
        </Container>

        {/* Footer */}
        <Text
          style={{
            fontSize: '12px',
            color: '#888888',
            textAlign: 'center',
            padding: '0 16px 24px',
          }}
        >
          If you have any questions, feel free to reach out to our support team at{' '}
          <Link
            href={`mailto:${supportEmail}`}
            style={{ color: '#f97316', textDecoration: 'none' }}
          >
            {supportEmail}
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
);
