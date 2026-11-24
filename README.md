# Lampo em React

Recriação da landing page Lampo a partir do vídeo de referência. O projeto usa React e Vite. Os recortes das imagens estão em `public/assets`.

## Executar

```bash
npm ci
npm run dev
```

Use Node.js 20.19+ ou 22.12+. Para gerar a versão estática, rode `npm run build`. A pasta `dist` contém o resultado.

## Ajustar a rolagem

As fases da animação e os pontos de navegação estão em `src.jsx`. As medidas da cena usam múltiplos da altura visível da janela. A perspectiva, a tipografia e os ajustes para telas estreitas estão em `style.css`.

O botão de diagnóstico abre uma mensagem de e-mail para o contato mostrado no vídeo. O endereço pode ser alterado na constante `email` em `src.jsx`.
