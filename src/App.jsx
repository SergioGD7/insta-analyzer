import React, { useState, useRef } from 'react';
import { Users, UserMinus, UserPlus, ArrowRightLeft, AlertCircle, Check, Search, FileJson, Info, HelpCircle } from 'lucide-react';
import Header from './components/Header';
import HelpModal from './components/HelpModal';
import { parseList, extractUsersFromJson } from './utils/helpers';

const App = () => {
  const [username, setUsername] = useState('');
  const [followersText, setFollowersText] = useState('');
  const [followingText, setFollowingText] = useState('');
  const [result, setResult] = useState(null);
  const [viewMode, setViewMode] = useState('all');
  const [errorMsg, setErrorMsg] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  
  const followersFileRef = useRef(null);
  const followingFileRef = useRef(null);

  const handleFileUpload = (e, setTextFn, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMsg(null);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const users = extractUsersFromJson(json);
        
        if (users.length > 0) {
          setTextFn(users.join('\n'));
        } else {
          setErrorMsg(`⚠️ No encontré usuarios en el archivo. Asegúrate de que sea el correcto (${type === 'followers' ? 'followers_1.json' : 'following.json'}).`);
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("❌ Error al leer el archivo JSON. El formato no es válido.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAnalyze = () => {
    setErrorMsg(null);
    if (!followersText && !followingText) {
       setErrorMsg("Por favor, introduce datos en ambas listas para comparar.");
       return;
    }

    const followersList = parseList(followersText);
    const followingList = parseList(followingText);
    const followersSet = new Set(followersList);
    const followingSet = new Set(followingList);
    const allUsers = Array.from(new Set([...followersList, ...followingList]));

    const analyzedData = allUsers.map(user => {
      const isFollower = followersSet.has(user);
      const isFollowing = followingSet.has(user);
      
      let status = 'mutual';
      if (isFollower && !isFollowing) status = 'fans'; 
      if (!isFollower && isFollowing) status = 'dont_follow_back';

      return { username: user, isFollower, isFollowing, status };
    });

    analyzedData.sort((a, b) => a.username.localeCompare(b.username));
    setResult(analyzedData);
  };

  const loadDemoData = () => {
    setUsername('usuario_demo');
    setFollowersText(`usuario_ejemplo_1\nana_garcia\njuan_perez\nfan_leal_123`);
    setFollowingText(`usuario_ejemplo_1\nana_garcia\nfamoso_ignorado\nmarca_ropa`);
    setErrorMsg(null);
  };

  const getFilteredData = () => {
    if (!result) return [];
    if (viewMode === 'all') return result;
    if (viewMode === 'not_following_back') return result.filter(r => r.status === 'dont_follow_back');
    if (viewMode === 'im_not_following') return result.filter(r => r.status === 'fans');
    return result;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12 relative overflow-x-hidden">
      <Header onOpenHelp={() => setShowHelp(true)} />
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <main className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm flex items-start gap-3 animate-pulse">
            <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Search className="text-purple-600" size={20} />
                Introducir Datos
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Sube tus archivos JSON (followers_1.json y following.json).
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={loadDemoData}
                className="text-sm text-purple-600 hover:text-purple-800 underline decoration-dotted flex-1 sm:flex-none text-center"
              >
                Cargar demo
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Tu Usuario (Opcional)</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USER"
              className="w-full sm:w-1/3 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Followers Input */}
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap justify-between items-end mb-2 gap-2">
                <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 p-1 rounded-md"><Users size={14}/></span>
                  Seguidores (Te siguen)
                </label>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="file"
                    ref={followersFileRef}
                    onChange={(e) => handleFileUpload(e, setFollowersText, 'followers')}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => followersFileRef.current?.click()}
                    className="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 sm:py-1.5 rounded shadow-sm flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
                    title="Cargar archivo followers_1.json"
                  >
                    <FileJson size={14} /> Subir followers_1.json
                  </button>
                </div>
              </div>
              <textarea
                value={followersText}
                onChange={(e) => setFollowersText(e.target.value)}
                placeholder="Contenido de 'followers_1.json'..."
                className="w-full h-32 sm:h-48 p-3 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-slate-50 flex-grow"
              />
            </div>

            {/* Following Input */}
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap justify-between items-end mb-2 gap-2">
                <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 p-1 rounded-md"><Users size={14}/></span>
                  Seguidos (Tú sigues)
                </label>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="file"
                    ref={followingFileRef}
                    onChange={(e) => handleFileUpload(e, setFollowingText, 'following')}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => followingFileRef.current?.click()}
                    className="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 sm:py-1.5 rounded shadow-sm flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
                    title="Cargar archivo following.json"
                  >
                    <FileJson size={14} /> Subir following.json
                  </button>
                </div>
              </div>
              <textarea
                value={followingText}
                onChange={(e) => setFollowingText(e.target.value)}
                placeholder="Contenido de 'following.json'..."
                className="w-full h-32 sm:h-48 p-3 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none bg-slate-50 flex-grow"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAnalyze}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 transform hover:-translate-y-0.5"
            >
              <ArrowRightLeft size={18} />
              Comparar Listas Ahora
            </button>
          </div>
        </section>

        {result && (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Resultados para <span className="text-purple-600">@{username || 'Usuario'}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-sm">
                    <span className="text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 text-xs sm:text-sm">Total: <b>{result.length}</b></span>
                    <span className="text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 text-xs sm:text-sm">No te siguen: <b>{result.filter(r => r.status === 'dont_follow_back').length}</b></span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-0 bg-white rounded-lg border border-slate-200 p-1 shadow-sm w-full md:w-auto">
                  <button onClick={() => setViewMode('all')} className={`flex-1 sm:flex-none justify-center px-3 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-sm rounded-md transition-all font-medium ${viewMode === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>Todos</button>
                  <button onClick={() => setViewMode('not_following_back')} className={`flex-1 sm:flex-none justify-center px-3 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-sm rounded-md transition-all flex items-center gap-1 font-medium ${viewMode === 'not_following_back' ? 'bg-red-500 text-white' : 'text-slate-600 hover:bg-red-50'}`}><UserMinus size={14} className="hidden sm:inline" /> Traidores</button>
                  <button onClick={() => setViewMode('im_not_following')} className={`flex-1 sm:flex-none justify-center px-3 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-sm rounded-md transition-all flex items-center gap-1 font-medium ${viewMode === 'im_not_following' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-blue-50'}`}><UserPlus size={14} className="hidden sm:inline" /> Fans</button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[350px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                    <th className="p-2 sm:p-4 w-10 sm:w-16 text-center hidden sm:table-cell">#</th>
                    <th className="p-2 sm:p-4">Usuario</th>
                    <th className="p-2 sm:p-4 text-center text-[10px] sm:text-xs">Te sigue</th>
                    <th className="p-2 sm:p-4 text-center text-[10px] sm:text-xs">Lo sigues</th>
                    <th className="p-2 sm:p-4 text-[10px] sm:text-xs">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getFilteredData().map((item, index) => {
                    const isDifference = item.status !== 'mutual';
                    const rowClass = isDifference ? (item.status === 'dont_follow_back' ? 'bg-red-50/50 hover:bg-red-50' : 'bg-blue-50/50 hover:bg-blue-50') : 'hover:bg-slate-50';
                    const textClass = isDifference ? (item.status === 'dont_follow_back' ? 'text-red-700 font-bold' : 'text-blue-700 font-bold') : 'text-slate-700 font-medium';

                    return (
                      <tr key={item.username} className={`transition-colors ${rowClass}`}>
                        <td className="p-2 sm:p-4 text-center text-slate-400 text-xs hidden sm:table-cell">{index + 1}</td>
                        <td className={`p-2 sm:p-4 ${textClass} text-sm sm:text-base`}>
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[120px] sm:max-w-none">@{item.username}</span>
                            {isDifference && <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-current opacity-75 flex-shrink-0"></span>}
                          </div>
                        </td>
                        <td className="p-2 sm:p-4 text-center">
                          {item.isFollower ? <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 text-green-600 shadow-sm"><Check size={14} className="sm:w-4 sm:h-4" strokeWidth={3} /></span> : <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-500 shadow-sm"><UserMinus size={14} className="sm:w-4 sm:h-4" /></span>}
                        </td>
                        <td className="p-2 sm:p-4 text-center">
                          {item.isFollowing ? <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 text-green-600 shadow-sm"><Check size={14} className="sm:w-4 sm:h-4" strokeWidth={3} /></span> : <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-400 shadow-sm"><UserMinus size={14} className="sm:w-4 sm:h-4" /></span>}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                          {item.status === 'mutual' && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-green-100 text-green-700 font-bold border border-green-200">Amigos</span>}
                          {item.status === 'dont_follow_back' && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-red-100 text-red-700 font-bold border border-red-200 flex items-center w-fit gap-1"><AlertCircle size={10} className="sm:w-3 sm:h-3" /> <span className="hidden sm:inline">No devuelve follow</span><span className="sm:hidden">No sigue</span></span>}
                          {item.status === 'fans' && <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">Fan</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {getFilteredData().length === 0 && <div className="p-8 sm:p-12 text-center text-slate-400"><Search size={32} className="sm:w-10 sm:h-10 text-slate-200 mx-auto mb-3" /><p className="text-sm sm:text-base">No se encontraron resultados con este filtro.</p></div>}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;