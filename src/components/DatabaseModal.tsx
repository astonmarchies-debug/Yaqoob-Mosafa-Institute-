import React, { useState } from 'react';
import { Dossier } from '../types/dossier';
import { storageService } from '../services/storage';
import { X, Download, Upload, RefreshCw, FileText, Check } from 'lucide-react';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossiers: Dossier[];
  onDatabaseUpdated: (updated: Dossier[]) => void;
}

export const DatabaseModal: React.FC<DatabaseModalProps> = ({
  isOpen,
  onClose,
  dossiers,
  onDatabaseUpdated,
}) => {
  if (!isOpen) return null;

  const [importJson, setImportJson] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleExport = () => {
    const jsonStr = storageService.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ymi_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSuccessMsg('JSON database backup exported successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleImport = () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!importJson.trim()) {
      setErrorMsg('Please paste valid JSON archive payload.');
      return;
    }

    try {
      const result = storageService.importDatabaseJSON(importJson);
      onDatabaseUpdated(result.dossiers);
      setSuccessMsg(`Successfully imported ${result.dossiers.length} records into database.`);
      setImportJson('');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to import archive database.');
    }
  };

  const handleReset = () => {
    if (confirm('Restore database to standard Yaqoob Mosafa Institute dossiers? Custom records will be purged.')) {
      const reset = storageService.resetToDefault();
      onDatabaseUpdated(reset);
      setSuccessMsg('Database reset to canonical institutional records.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="w-full max-w-xl bg-[#090f0c] border border-[#23382c] rounded-xl shadow-2xl overflow-hidden font-sans">
        
        <div className="px-6 py-4 bg-[#0c1612] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#c5a059]" />
            <h2 className="text-base font-display font-bold text-[#f5eedf]">
              Archive Database Governance (JSON Sync)
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#7e8f85] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Export & Reset Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <button
              onClick={handleExport}
              className="p-3.5 rounded-lg bg-[#0e1713] border border-[#23382c] hover:border-[#c5a059] text-[#f5eedf] hover:text-[#c5a059] transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Download className="w-4 h-4 text-[#c5a059]" />
              <span>Export Database JSON</span>
            </button>

            <button
              onClick={handleReset}
              className="p-3.5 rounded-lg bg-[#140a0a] border border-rose-950/80 hover:border-rose-700 text-rose-300 hover:text-rose-200 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Default Vault</span>
            </button>
          </div>

          {/* Import JSON Form */}
          <div className="space-y-2 pt-2 border-t border-[#18261e]">
            <label className="block text-xs font-mono uppercase text-[#8b9e93]">
              Import JSON Database Archive
            </label>
            <textarea
              rows={4}
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste valid JSON payload exported from another YMI node..."
              className="w-full bg-[#050907] border border-[#1b2b22] rounded-md p-3 text-xs font-mono text-[#a5e2ba] focus:outline-none focus:border-[#c5a059]"
            />
            <button
              onClick={handleImport}
              className="w-full py-2 bg-[#1b2f24] hover:bg-[#254232] text-[#c5a059] font-mono font-bold text-xs rounded border border-[#2b4d3a] transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Validate & Import Archive Payload</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-3 bg-[#0a110d] border-t border-[#1b2b22] flex items-center justify-between text-xs text-[#5e7568] font-mono">
          <span>Total Classified Records: {dossiers.length}</span>
          <button onClick={onClose} className="hover:text-white">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
