declare module '@radix-ui/react-icons' {
    import * as React from 'react';
    export interface IconProps extends React.SVGAttributes<SVGElement> {
        children?: never;
        color?: string;
        size?: string | number;
    }
    
    export type Icon = React.FC<IconProps>;
    
    // Declare todos os ícones que você está usando
    export const Cross1Icon: Icon;
    export const CheckIcon: Icon;
    // Adicione outros ícones conforme necessário
}
