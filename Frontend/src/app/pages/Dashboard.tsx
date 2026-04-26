import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ask } from '../services/api';
import { useAuth } from '../../App';

import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';

import {
  Brain,
  Upload,
  FileText,
  CheckCircle,
  Send,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Loader2,
  X,
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ✅ TYPES FIXED
interface DocFile {
  id: string;
  name: string;
  status: 'processing' | 'ready' | 'error';
  uploadedAt: string;
  size: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { logout, userEmail } = useAuth();

  const [documents, setDocuments] = useState<DocFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your AI document assistant. Upload a document and ask me anything about it. I can help you analyze content, extract key information, and answer questions using RAG technology.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [latestSources, setLatestSources] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(Array.from(e.dataTransfer.files));
  };

  // 🔥 REAL BACKEND UPLOAD
  const handleFileUpload = async (files: File[]) => {
    for (const file of files) {
      const newDoc: DocFile = {
        id: Date.now().toString(),
        name: file.name,
        status: 'processing',
        uploadedAt: 'Just now',
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      };

      setDocuments((prev) => [newDoc, ...prev]);

      try {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${BASE_URL}/upload`, formData);

        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
          )
        );
      } catch (err) {
        console.error(err);
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === newDoc.id ? { ...doc, status: 'error' } : doc
          )
        );
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFileUpload(Array.from(e.target.files));
  };

  // 🔥 REAL ASK API
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoadingAnswer) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoadingAnswer(true);
    setLatestSources([]);

    try {
      const res = await ask(userMessage.content);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.answer,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLatestSources(res.sources || []);
    } catch (err) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          err instanceof Error ? err.message : 'Error fetching answer',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Document Analyst</span>
        </div>

        <Button onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-2/5 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Your Documents</h2>
            <p className="text-sm text-gray-600">
              Upload and manage your documents
            </p>
          </div>

          {/* Upload */}
          <div className="p-6 border-b">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-dashed rounded-xl p-8 text-center"
            >
              <Upload className="mx-auto mb-3 text-blue-600" />
              <p className="mb-3">Drop files or click</p>

              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileInputChange}
              />

              <Button
                onClick={() =>
                  document.getElementById('file-upload')?.click()
                }
              >
                Select File
              </Button>
            </div>
          </div>

          {/* Documents */}
          <ScrollArea className="flex-1 p-4 space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <span>{doc.name}</span>
                  <X onClick={() => removeDocument(doc.id)} />
                </div>

                <div className="mt-2">
                  {doc.status === 'processing' && (
                    <Badge className="bg-yellow-100 text-yellow-700">
                      Processing
                    </Badge>
                  )}
                  {doc.status === 'ready' && (
                    <Badge className="bg-green-100 text-green-700">
                      Ready
                    </Badge>
                  )}
                  {doc.status === 'error' && (
                    <Badge className="bg-red-100 text-red-700">
                      Error
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            {messages.map((m) => (
              <div key={m.id} className="mb-4">
                <b>{m.role}:</b> {m.content}
              </div>
            ))}
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                {isLoadingAnswer ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}
              </Button>
            </div>

            {latestSources.length > 0 && (
              <div className="mt-2 text-sm">
                <b>Sources:</b>
                <ul>
                  {latestSources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}