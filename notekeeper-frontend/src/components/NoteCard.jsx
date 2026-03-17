import React, { useState } from 'react';
import { Edit2, Trash2, Pin, Check, X, Tag } from 'lucide-react';

export default function NoteCard({ note, index, onOverride }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editVal, setEditVal] = useState(note.content);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.owner);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSaveEdit = () => {
    if (onOverride) onOverride({ editedContent: editVal });
    setIsEditing(false);
  };

  const togglePin = () => onOverride && onOverride({ pinned: !note?.isPinned });
  const handleDelete = () => onOverride && onOverride({ deleted: true });

  const addTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const updatedTags = [...(note.tags || []), newTag.trim().toLowerCase()];
      if (onOverride) onOverride({ tags: [...new Set(updatedTags)] });
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = (note.tags || []).filter(t => t !== tagToRemove);
    if (onOverride) onOverride({ tags: updatedTags });
  };

  const ownerStr = note.owner ? note.owner.toString() : 'Unknown';
  const truncatedOwner = note.owner ? `${ownerStr.slice(0, 4)}…${ownerStr.slice(-4)}` : 'Unknown';

  return (
    <div 
      className={`relative flex flex-col p-4 bg-white rounded-xl border-[3px] shadow-[0_4px_0_0_var(--theme-outline)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_0_0_var(--theme-outline)] ${note?.isPinned ? 'border-[var(--theme-pink)]' : 'border-[#e8e4f9]'}`} 
      style={{ animation: `fadeIn 0.5s ease-out ${0.05 * (index ?? 0)}s both` }}
    >
      {/* Pinned Badge */}
      {note?.isPinned && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--theme-pink)] rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 rotate-12">
          <Pin size={16} className="text-white fill-current" />
        </div>
      )}

      {/* Dynamic Content Area */}
      {isEditing ? (
        <div className="flex-grow flex flex-col gap-2 mb-4">
          <textarea 
            className="w-full text-sm font-mono text-[var(--theme-text)] border-2 border-[#e8e4f9] rounded-md p-2 focus:outline-none focus:border-[var(--theme-pink)] resize-none"
            rows={4}
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setIsEditing(false); setEditVal(note.content); }} className="p-1 text-[var(--theme-header)] hover:text-red-400"><X size={16}/></button>
            <button onClick={handleSaveEdit} className="p-1 text-[var(--theme-pink)] hover:scale-110"><Check size={16}/></button>
          </div>
        </div>
      ) : (
        <p className="text-[var(--theme-text)] font-mono flex-grow break-words text-sm mb-4 leading-relaxed">
          {note.content}
        </p>
      )}

      {/* Tags Display */}
      {note?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map(t => (
            <span key={t} className="group relative text-[10px] font-mono px-2 py-0.5 bg-[#fcf8ff] border border-[#e8e4f9] text-[var(--theme-header)] rounded-full cursor-pointer hover:bg-red-50 hover:text-red-400" onClick={() => removeTag(t)} title={`Remove #${t}`}>
               #{t} <span className="absolute -top-1 -right-1 hidden group-hover:block bg-white rounded-full leading-none text-red-500 font-bold px-1">×</span>
            </span>
          ))}
        </div>
      )}

      {/* New Tag Input */}
      {showTagInput && (
        <input 
          type="text" 
          value={newTag} 
          onChange={(e) => setNewTag(e.target.value)} 
          onKeyDown={addTag} 
          placeholder="tag name + enter" 
          className="text-[10px] font-mono w-full px-2 py-1 border-2 border-[var(--theme-pink)] text-[var(--theme-text)] rounded-md outline-none mb-3"
          autoFocus 
          onBlur={() => setShowTagInput(false)}
        />
      )}
      
      {/* Interactive Footer */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-[#e8e4f9] mt-auto gap-2">
        <button 
          className="flex items-center gap-1.5 px-3 py-1 bg-[#fcf8ff] rounded-md text-[10px] font-mono tracking-widest font-bold text-[var(--theme-header)] border border-[#d9cff6] hover:bg-[#e8e4f9] hover:text-[var(--theme-text)] transition-colors cursor-pointer"
          onClick={handleCopy} 
          title={`Copy: ${ownerStr}`}
        >
          {copied ? <span className="text-[var(--theme-pink)]">COPIED!</span> : `>${truncatedOwner}`}
        </button>
        
        <div className="flex items-center gap-1">
           {!isEditing && <button onClick={() => setShowTagInput(!showTagInput)} className="p-1.5 text-[var(--theme-header)] hover:text-[var(--theme-pink)] hover:bg-[#fcf8ff] transition-colors rounded" title="Add Tag"><Tag size={13} /></button>}
           {!isEditing && <button onClick={() => setIsEditing(true)} className="p-1.5 text-[var(--theme-header)] hover:text-[var(--theme-pink)] hover:bg-[#fcf8ff] transition-colors rounded" title="Edit Note"><Edit2 size={13} /></button>}
           <button onClick={togglePin} className={`p-1.5 transition-colors rounded hover:bg-[#fcf8ff] ${note?.isPinned ? 'text-[var(--theme-pink)] opacity-100' : 'text-[var(--theme-header)] opacity-70 hover:opacity-100'}`} title={note?.isPinned ? "Unpin" : "Pin Note"}><Pin size={13} className={note?.isPinned ? "fill-current" : ""} /></button>
           <button onClick={handleDelete} className="p-1.5 text-[var(--theme-text)] hover:text-red-500 hover:bg-red-50 transition-colors rounded" title="Delete Note"><Trash2 size={13} /></button>
         </div>
      </div>
    </div>
  );
}
