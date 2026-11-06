import { useEffect, useRef, useState } from "react";
import { Activity, AudioLines, Bot, Check, ChevronDown, Command, Cpu, FolderOpen, Gauge, Headphones, MessageCircle, Mic, Monitor, MoreHorizontal, Plus, Send, Settings2, ShieldCheck, Sparkles, Square, Sun, Volume2, Waves, X } from "lucide-react";
import { getNativeStatus, type NativeStatus } from "./lib/native";

type Message = { id: number; role: "assistant" | "user"; text: string };
type Section = "overview" | "chat" | "tasks" | "settings";

const initialMessages: Message[] = [
  { id: 1, role: "assistant", text: "Hello! I'm Shahid Assistant. Your desktop workspace is ready. Connect an AI provider in Settings to enable live AI responses." }
];

function App() {
  const [section, setSection] = useState<Section>("overview");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState<NativeStatus>({ app: "Shahid Assistant", platform: "Checking…", version: "0.1.0" });
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState("Not connected");
  const [tasks, setTasks] = useState(["Connect an AI provider", "Review privacy permissions", "Configure voice input"]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { getNativeStatus().then(setStatus).catch(() => setStatus({ app: "Shahid Assistant", platform: "Web preview", version: "0.1.0" })); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function sendMessage() {
    const value = draft.trim();
    if (!value) return;
    setMessages(current => [...current, { id: Date.now(), role: "user", text: value },
      { id: Date.now() + 1, role: "assistant", text: "I'm running in local preview mode. Connect an AI provider in Settings to enable model-powered replies. Your message stays in this session." }]);
    setDraft("");
    setSection("chat");
  }

  const nav = [
    { id: "overview" as const, label: "Overview", icon: Gauge },
    { id: "chat" as const, label: "AI Conversation", icon: MessageCircle },
    { id: "tasks" as const, label: "Background tasks", icon: Activity }
  ];

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Waves size={22}/></div><div><strong>SHAHID</strong><span>ASSISTANT</span></div></div>
      <div className="workspace-label">WORKSPACE <button className="icon-button"><MoreHorizontal size={17}/></button></div>
      <nav>{nav.map(item => <button key={item.id} className={`nav-item ${section === item.id ? "active" : ""}`} onClick={() => setSection(item.id)}><item.icon size={18}/>{item.label}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="secure-note"><ShieldCheck size={17}/><div><b>Privacy first</b><span>Local controls enabled</span></div></div>
        <button className="nav-item" onClick={() => { setSection("settings"); setShowSettings(true); }}><Settings2 size={18}/> Settings</button>
        <div className="profile"><div className="avatar">S</div><div><b>Shahid Assistant</b><span>{status.platform}</span></div><ChevronDown size={15}/></div>
      </div>
    </aside>

    <section className="main-panel">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><b>{section === "overview" ? "Overview" : section === "chat" ? "AI Conversation" : section === "tasks" ? "Background tasks" : "Settings"}</b></div><div className="top-actions"><span className="status-pill"><i/> SYSTEM ONLINE</span><button className="icon-button" title="Settings" onClick={() => { setSection("settings"); setShowSettings(true); }}><Settings2 size={18}/></button></div></header>

      {section === "overview" && <div className="content overview">
        <div className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR PERSONAL AI WORKSPACE</div><h1>Good to see you,<br/><em>Shahid.</em></h1><p>Your desktop companion is ready. Bring your ideas, tasks and tools together in one calm workspace.</p><button className="primary-button" onClick={() => setSection("chat")}>Start a conversation <MessageCircle size={16}/></button></div><div className="orb-wrap"><div className="orb-ring ring-one"/><div className="orb-ring ring-two"/><div className="orb"><Waves size={48}/></div><div className="orb-caption"><span/> ASSISTANT CORE</div></div></div>
        <div className="section-heading"><div><span className="eyebrow">AT A GLANCE</span><h2>Your workspace</h2></div><span className="muted">Live local status</span></div>
        <div className="stats-grid"><div className="stat-card"><div className="stat-icon violet"><Cpu size={19}/></div><span>Runtime</span><strong>{status.platform}</strong><small>Desktop bridge status</small></div><div className="stat-card"><div className="stat-icon blue"><Bot size={19}/></div><span>AI provider</span><strong>{provider}</strong><small>Configure in settings</small></div><div className="stat-card"><div className="stat-icon gold"><Activity size={19}/></div><span>Pending tasks</span><strong>{tasks.length}</strong><small>Personal task checklist</small></div></div>
        <div className="lower-grid"><div className="panel-card"><div className="panel-title"><div><span className="eyebrow">QUICK ACCESS</span><h3>What would you like to do?</h3></div><Sparkles size={18}/></div><div className="quick-grid"><button onClick={() => setSection("chat")}><MessageCircle/><b>Ask assistant</b><span>Start a new chat</span></button><button onClick={() => setSection("tasks")}><Activity/><b>View tasks</b><span>Manage your checklist</span></button><button onClick={() => setSection("settings")}><Settings2/><b>Set up AI</b><span>Connect a provider</span></button></div></div><div className="panel-card system-card"><div className="panel-title"><div><span className="eyebrow">SYSTEM</span><h3>Protection status</h3></div><ShieldCheck size={19}/></div><div className="system-row"><span>App permissions</span><b className="good">Not granted</b></div><div className="system-row"><span>AI credentials</span><b className="pending">Not configured</b></div><div className="system-row"><span>Platform</span><b>{status.platform}</b></div><p className="fine-print">No desktop automation is active in this initial build.</p></div></div>
      </div>}

      {section === "chat" && <div className="content chat-page"><div className="chat-heading"><div><span className="eyebrow">PRIVATE SESSION</span><h1>AI Conversation</h1><p>Talk through ideas, ask questions and get things done.</p></div><button className="soft-button" onClick={() => setMessages(initialMessages)}><Plus size={16}/> New chat</button></div><div className="chat-window">{messages.map(m => <div className={`message ${m.role}`} key={m.id}><div className="message-avatar">{m.role === "assistant" ? <Waves size={17}/> : "S"}</div><div><span className="message-name">{m.role === "assistant" ? "SHAHID ASSISTANT" : "YOU"}</span><p>{m.text}</p></div></div>)}<div ref={endRef}/></div><div className="composer"><textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Message Shahid Assistant…" rows={2}/><div className="composer-actions"><span><ShieldCheck size={14}/> Session-only preview</span><div><button className={`icon-button mic-button ${listening ? "recording" : ""}`} onClick={() => setListening(v => !v)} title="Voice input UI preview">{listening ? <Square size={16}/> : <Mic size={17}/>}</button><button className="send-button" onClick={sendMessage}><Send size={16}/></button></div></div></div></div>}

      {section === "tasks" && <div className="content tasks-page"><span className="eyebrow">PERSONAL WORKFLOW</span><h1>Background tasks</h1><p className="muted">A local checklist for the next setup steps. Scheduled monitoring is not enabled yet.</p><div className="task-list">{tasks.map((task, i) => <label className="task-row" key={task}><input type="checkbox" onChange={() => setTasks(items => items.filter((_, index) => index !== i))}/><span>{task}</span><small>SETUP</small></label>)}</div><button className="soft-button" onClick={() => setTasks(items => [...items, "New task"])}><Plus size={16}/> Add task</button></div>}

      {section === "settings" && <div className="content settings-page"><span className="eyebrow">PREFERENCES & CONNECTIONS</span><h1>Settings</h1><p className="muted">Configure your assistant. API keys will be stored locally by the desktop app in a later security milestone.</p><div className="settings-card"><div><h3>AI provider</h3><p>Choose the provider you plan to connect.</p></div><select value={provider} onChange={e => setProvider(e.target.value)}><option>Not connected</option><option>OpenAI</option><option>Google Gemini</option><option>Anthropic</option><option>Ollama (local)</option><option>OpenAI-compatible endpoint</option></select></div><div className="settings-card"><div><h3>Voice assistant</h3><p>Voice capture and speech output are not connected in this build.</p></div><span className="pending">Coming next</span></div><div className="settings-card"><div><h3>Windows permissions</h3><p>Desktop control requires explicit permission gates and audit logs.</p></div><span className="pending">Disabled</span></div><div className="settings-card"><div><h3>Application version</h3><p>{status.app} · {status.version}</p></div><span className="good">Foundation</span></div></div>}
      <footer className="footer"><span>SHAHID ASSISTANT <i>·</i> FOUNDATION BUILD 0.1.0</span><span><ShieldCheck size={13}/> Your workspace, your control</span></footer>
    </section>
    {showSettings && <button className="close-settings" onClick={() => setShowSettings(false)} aria-label="Close settings hint"><X size={16}/></button>}
  </main>;
}

export default App;