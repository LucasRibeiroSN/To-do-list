import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './/globals.css';


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

export const metadata: Metadata = {
    title: 'To-do list',
    description: 'Um simples gerenciador de tarefas',
};

export default function RootLayout ({
    children,
}: { children: React.ReactNode}) {
    return (
        <html lang="pt-BR">
        {/*
        A classe da fonte é aplicada diretamente no body.
        Isso faz com que todos os elementos filhos herdem essa fonte.
      */}
        <body className={poppins.className}>
        {/*
          É aqui que o conteúdo da nossa `page.tsx` será renderizado.
          A prop `children` é o conteúdo da página atual.
        */}
        {children}
        </body>
        </html>
    );
}