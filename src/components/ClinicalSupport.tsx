import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Loader2,
  Stethoscope,
  RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isFromUser: boolean;
  timestamp: Date;
}

const ClinicalSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isFromUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(inputMessage),
        isFromUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockResponse = (question: string): string => {
    const responses = [
      "Com base nas diretrizes do Ministério da Saúde, posso te ajudar com essa questão sobre vacinação. A vacina que você mencionou é recomendada para...",
      "Segundo o Programa Nacional de Imunizações (PNI), essa situação requer atenção especial. O protocolo indica que...",
      "Para essa faixa etária específica, as recomendações técnicas sugerem que a vacinação deve ser realizada considerando...",
      "De acordo com as evidências científicas mais recentes, essa vacina apresenta eficácia comprovada quando administrada..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Suporte Clínico IA</h1>
              <p className="text-sm text-gray-600">Assistente especializado em vacinação</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Nova conversa</span>
            </button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="h-full flex items-center justify-center px-6">
            <div className="text-center max-w-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Qual a sua dúvida clínica sobre vacinação?
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sou um assistente especializado em imunização. Posso te ajudar com protocolos, 
                contraindicações, calendário vacinal, reações adversas e muito mais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                     onClick={() => setInputMessage("Quais são as contraindicações da vacina da gripe?")}>
                  <h3 className="font-medium text-gray-900 mb-2">Contraindicações</h3>
                  <p className="text-sm text-gray-600">Quando não aplicar determinada vacina</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                     onClick={() => setInputMessage("Qual o intervalo entre doses da vacina HPV?")}>
                  <h3 className="font-medium text-gray-900 mb-2">Esquemas Vacinais</h3>
                  <p className="text-sm text-gray-600">Intervalos e doses recomendadas</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                     onClick={() => setInputMessage("Como proceder em caso de reação adversa à vacina?")}>
                  <h3 className="font-medium text-gray-900 mb-2">Reações Adversas</h3>
                  <p className="text-sm text-gray-600">Identificação e manejo de eventos</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                     onClick={() => setInputMessage("Qual vacina aplicar em gestantes?")}>
                  <h3 className="font-medium text-gray-900 mb-2">Grupos Especiais</h3>
                  <p className="text-sm text-gray-600">Gestantes, imunossuprimidos, idosos</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-3xl ${message.isFromUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isFromUser 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-blue-500 to-teal-500'
                    }`}>
                      {message.isFromUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.isFromUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-500">Analisando sua pergunta...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua dúvida sobre vacinação..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[48px]"
                rows={1}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Este assistente fornece informações baseadas em diretrizes oficiais. 
            Sempre consulte protocolos atualizados para decisões clínicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalSupport;