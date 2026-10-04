/**
 * Les écrans d'accès dessinent eux-mêmes leur pleine page : le panneau de
 * marque change de bord d'un écran à l'autre, il ne peut pas vivre ici.
 */
export default function AuthLayout(props: { children: React.ReactNode }) {
  return props.children;
}
