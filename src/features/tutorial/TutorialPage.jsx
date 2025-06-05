import React from 'react';

export default function TutorialPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Como Exportar o Arquivo .INP do EPANET</h1>

      <p className="mb-6 text-gray-700">
        Este tutorial ensina como exportar o arquivo de entrada `.inp` no EPANET, necessário para o funcionamento do RUGOSCAN.
      </p>

      {/* Vídeo incorporado */}
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <iframe
          className="w-full h-full rounded-md"
          src="https://www.youtube.com/embed/o7pknqfN4vo" // Você pode trocar por um vídeo próprio
          title="Como exportar arquivo INP no EPANET"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Passo a passo */}
      <h2 className="text-2xl font-semibold mb-2">Tutorial Escrito</h2>
      <ol className="list-decimal pl-6 space-y-3 text-gray-800">
        <li>Abra o seu projeto no EPANET.</li>
        <li>Verifique se todos os nós, tubos e configurações estão completos.</li>
        <li>Clique em <strong>File</strong> (Arquivo) &gt; <strong>Save As...</strong>.</li>
        <li>Escolha o tipo de arquivo como <code>.inp</code>.</li>
        <li>Dê um nome ao arquivo e salve em um local de fácil acesso.</li>
        <li>Pronto! Agora você pode importar esse arquivo no RUGOSCAN.</li>
      </ol>

      <h2 className="text-xl mt-6 mb-2 font-semibold">Dicas</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Evite nomes com espaços ou acentos no nome do arquivo.</li>
        <li>Certifique-se de que os dados hidráulicos estejam preenchidos corretamente.</li>
        <li>Se aparecer erro ao carregar o arquivo, revise a seção `[PIPES]` do arquivo `.inp`.</li>
      </ul>
    </div>
  );
}
