import React, { useState } from 'react';

const MAX_CHARS = 280;

export default function AddNoteForm({ isConnected, onSubmit }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const charCount = content.length;
  const charClass = charCount >= MAX_CHARS ? 'at-limit' : charCount >= MAX_CHARS * 0.85 ? 'near-limit' : '';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim() || !isConnected || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await onSubmit(content.trim());
      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to submit note');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="w-full min-h-[140px] p-4 bg-white border-2 border-[#d9cff6] rounded-xl text-[#8E86C6] font-mono font-bold placeholder:text-[#d9cff6] outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] focus:border-[#a29bfe] transition-colors resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
          placeholder={isConnected ? '> log your dream here...' : '> connect wallet to boot...'}
          disabled={!isConnected || isSubmitting}
          id="note-input"
        />

        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] font-mono font-bold px-3 py-1.5 bg-white border-2 rounded-md ${charCount >= MAX_CHARS ? 'border-red-400 text-red-500' : charCount >= MAX_CHARS * 0.85 ? 'border-amber-400 text-amber-500' : 'border-[#d9cff6] text-[#b4a0e5]'}`}>
            [ {charCount} / {MAX_CHARS} ]
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#ffb8d1] text-white font-mono font-bold tracking-widest uppercase rounded-lg border-2 border-white shadow-[0_3px_0_0_#f9a8d4] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-[0_3px_0_0_#f9a8d4]"
            disabled={!isConnected || !content.trim() || isSubmitting}
            id="submit-note"
          >
            {isSubmitting ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                SAVING...
              </>
            ) : (
              <>💾 PIN THOUGHT</>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-2 p-3 bg-red-100/80 border-2 border-red-300 rounded-xl text-sm font-bold text-red-700 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="mt-2 p-3 bg-green-100/80 border-2 border-green-300 rounded-xl text-sm font-bold text-green-700 flex items-center gap-2">
            <span>✨</span> Thought saved to the sky!
          </div>
        )}
      </form>
    </div>
  );
}
