import React from 'react';
import { X, FileJson, Check, AlertTriangle, ArrowRight } from 'lucide-react';

const HelpModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Cabecera del Modal */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileJson className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
            Guía Completa de Exportación
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* Contenido Scrollable */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 flex gap-3 items-start">
            <InfoIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p><strong>¿Por qué hacer esto?</strong> Por privacidad, Instagram no permite descargar tu lista de amigos desde aplicaciones externas. Debes pedirle a Instagram tus propios datos oficiales. Es más seguro y fiable.</p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Pasos para solicitar los datos:</h3>
            
            <ol className="relative border-l-2 border-slate-200 ml-3 space-y-8">
              {/* Paso 1 */}
              <li className="ml-6">
                <span className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></span>
                <h4 className="font-bold text-slate-900 text-base">Accede a "Tu actividad"</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Abre la app de Instagram, ve a tu perfil, toca el menú (tres rayas ≡) y selecciona <span className="font-semibold text-slate-800">Tu actividad</span>.
                </p>
              </li>
              
              {/* Paso 2 */}
              <li className="ml-6">
                <span className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></span>
                <h4 className="font-bold text-slate-900 text-base">Inicia la descarga</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Baja hasta el final de la lista y toca en <span className="font-semibold text-slate-800">Descargar tu información</span>.
                </p>
              </li>

              {/* Paso 3 */}
              <li className="ml-6">
                <span className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></span>
                <h4 className="font-bold text-slate-900 text-base">Selecciona los datos específicos</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <ArrowRight size={14} /> Toca en "Descargar o transferir información".
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight size={14} /> Selecciona <span className="font-bold">"Parte de tu información"</span>.
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight size={14} /> Busca la categoría <span className="font-bold">"Seguidores y seguidos"</span>, márcala y dale a Siguiente.
                  </div>
                </div>
              </li>

              {/* Paso 4 - EL MÁS IMPORTANTE */}
              <li className="ml-6">
                <span className="absolute -left-3 top-0 flex items-center justify-center w-6 h-6 bg-purple-600 rounded-full ring-4 ring-white">
                  <AlertTriangle size={14} className="text-white" />
                </span>
                <h4 className="font-bold text-purple-700 text-base">Configuración CRÍTICA (Formato JSON)</h4>
                <p className="text-slate-600 text-sm mt-1 mb-2">
                  En la pantalla final, configura estas opciones exactamente así:
                </p>
                <ul className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-sm space-y-2">
                  <li className="flex justify-between items-center border-b border-purple-200 pb-1">
                    <span className="text-purple-800">Destino:</span>
                    <span className="font-bold text-slate-800">Descargar en dispositivo</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-purple-200 pb-1">
                    <span className="text-purple-800">Intervalo de fechas:</span>
                    <span className="font-bold text-slate-800">Desde el principio</span>
                  </li>
                  <li className="flex justify-between items-center bg-white p-2 rounded border-l-4 border-purple-600 shadow-sm">
                    <span className="text-purple-800 font-bold">Formato:</span>
                    <span className="font-black text-purple-700 text-lg">JSON</span>
                    <span className="text-xs text-slate-400">(NO selecciones HTML)</span>
                  </li>
                </ul>
                <p className="text-slate-500 text-xs mt-2 italic">
                  *Si descargas en HTML, la web no podrá leer el archivo.
                </p>
              </li>

              {/* Paso 5 */}
              <li className="ml-6">
                <span className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-green-200 ring-4 ring-white"></span>
                <h4 className="font-bold text-slate-900 text-base">Descarga y Descomprime</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Instagram te avisará por correo (suele tardar 5-10 min). Descarga el archivo ZIP y <strong>descomprímelo</strong> (extraer todo).
                </p>
              </li>

              {/* Paso 6 */}
              <li className="ml-6">
                <span className="absolute -left-[9px] top-0 flex items-center justify-center w-4 h-4 rounded-full bg-green-500 ring-4 ring-white">
                  <Check size={10} className="text-white" />
                </span>
                <h4 className="font-bold text-slate-900 text-base">Archivos necesarios</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Dentro de la carpeta descomprimida (a veces en subcarpetas como <code>connections</code>), busca estos dos archivos y súbelos a esta web:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-slate-100 rounded-md text-xs font-mono font-bold text-slate-700 border border-slate-300">
                    followers_1.json
                  </span>
                  <span className="px-3 py-1 bg-slate-100 rounded-md text-xs font-mono font-bold text-slate-700 border border-slate-300">
                    following.json
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 text-right sticky bottom-0 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-slate-200"
          >
            Entendido, ¡vamos allá!
          </button>
        </div>
      </div>
    </div>
  );
};

// Pequeño componente auxiliar para el icono de info
const InfoIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default HelpModal;