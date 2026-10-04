import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { color, fontStack, monoStack } from "../theme";

/**
 * La table de travail, en courrier : papier blanc, un filet d'1px, rien qui
 * brille. Le bouton sauge est le seul aplat coloré de la page.
 */
export function EmailLayout(props: {
  preview: string;
  children: ReactNode;
  footnote?: string;
}) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{props.preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "32px 16px",
          backgroundColor: color.chrome,
          fontFamily: fontStack,
          color: color.ink,
        }}
      >
        <Container
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            backgroundColor: color.paper,
            border: `1px solid ${color.hairline}`,
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <Text
            style={{
              margin: "0 0 24px",
              fontFamily: monoStack,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: color.graphite,
            }}
          >
            Aliko
          </Text>

          {props.children}

          <Hr
            style={{
              margin: "32px 0 16px",
              border: "none",
              borderTop: `1px solid ${color.hairline}`,
            }}
          />

          <Section>
            {props.footnote && (
              <Text
                style={{
                  margin: "0 0 8px",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  color: color.graphite,
                }}
              >
                {props.footnote}
              </Text>
            )}
            <Text
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.55,
                color: color.graphite,
              }}
            >
              Vous recevez ce message parce qu’une action a été demandée avec
              cette adresse sur{" "}
              <Link
                href="https://aliko.app"
                style={{ color: color.sauge, textDecoration: "underline" }}
              >
                Aliko
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailHeading(props: { children: ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 12px",
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        color: color.ink,
      }}
    >
      {props.children}
    </Text>
  );
}

export function EmailText(props: { children: ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 16px",
        fontSize: "14px",
        lineHeight: 1.55,
        color: color.ink,
      }}
    >
      {props.children}
    </Text>
  );
}

/** Le seul bouton plein de l'e-mail : il n'y en a jamais deux. */
export function EmailButton(props: { href: string; children: ReactNode }) {
  return (
    <Section style={{ margin: "24px 0" }}>
      <Link
        href={props.href}
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: color.sauge,
          color: color.onSauge,
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1.2,
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        {props.children}
      </Link>
    </Section>
  );
}

/**
 * Le lien en toutes lettres : certains clients avalent les boutons, et une
 * adresse recopiable est la seule porte de secours.
 */
export function EmailFallbackLink(props: { href: string }) {
  return (
    <Text
      style={{
        margin: "0 0 4px",
        fontSize: "13px",
        lineHeight: 1.55,
        color: color.graphite,
        wordBreak: "break-all",
      }}
    >
      Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :{" "}
      <Link
        href={props.href}
        style={{ color: color.sauge, textDecoration: "underline" }}
      >
        {props.href}
      </Link>
    </Text>
  );
}
