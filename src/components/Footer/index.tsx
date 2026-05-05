import { FooterContainer, FooterContent, FooterLink, FooterText } from './styles'

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>Built by Rafael Zendron</FooterText>
        <FooterText>·</FooterText>
        <FooterLink
          href="https://github.com/rafaumeu/dt-money"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </FooterLink>
        <FooterText>·</FooterText>
        <FooterLink
          href="https://portfoliodev-blush-pi.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </FooterLink>
      </FooterContent>
    </FooterContainer>
  )
}
